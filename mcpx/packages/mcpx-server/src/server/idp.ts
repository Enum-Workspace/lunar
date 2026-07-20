// LOCAL FORK PATCH (IdP management UI): control-plane REST endpoints for
// per-tenant Keycloak user & group management (the "Identity" page). Same
// trust model as the other control-plane routers: operator-local :9000.
import {
  createIdpGroupRequestSchema,
  createIdpUserRequestSchema,
  IdpGroup,
  IdpStatus,
  IdpUser,
  resetIdpPasswordRequestSchema,
  setIdpUserGroupRequestSchema,
  updateIdpUserRequestSchema,
} from "@mcpx/shared-model";
import { loggableError } from "@mcpx/toolkit-core/logging";
import express, { Router } from "express";
import { Logger } from "winston";
import z from "zod/v4";
import { env } from "../env.js";
import {
  AlreadyExistsError,
  IdpUnavailableError,
  NotFoundError,
} from "../errors.js";
import { Services } from "../services/services.js";

const DISABLED_MESSAGE = "IdP management is not enabled on this instance";

export function buildIdpRouter(
  authGuard: express.RequestHandler,
  services: Services,
  logger: Logger,
): Router {
  const router = Router();

  if (!env.ENABLE_CONTROL_PLANE_REST) {
    logger.debug("Control Plane REST API is disabled. Skipping IdP routes.");
    return router;
  }

  function handleError(res: express.Response, e: unknown, action: string): void {
    if (e instanceof NotFoundError) {
      res.status(404).json({ message: e.message, error: loggableError(e) });
      return;
    }
    if (e instanceof AlreadyExistsError) {
      res.status(409).json({ message: e.message, error: loggableError(e) });
      return;
    }
    if (e instanceof IdpUnavailableError) {
      res.status(503).json({ message: e.message, error: loggableError(e) });
      return;
    }
    logger.error(`Error ${action}`, { error: loggableError(e) });
    res.status(500).json({ message: "Internal server error" });
  }

  function requireEnabled(res: express.Response): boolean {
    if (!services.keycloakAdmin.isEnabled()) {
      res.status(503).json({ message: DISABLED_MESSAGE });
      return false;
    }
    return true;
  }

  router.get("/status", authGuard, async (_req, res) => {
    const status = await services.keycloakAdmin.getStatus();
    res.status(200).json(status satisfies IdpStatus);
  });

  router.get("/users", authGuard, async (_req, res) => {
    if (!requireEnabled(res)) return;
    try {
      const users = await services.keycloakAdmin.listUsers();
      res.status(200).json(users satisfies IdpUser[]);
    } catch (e) {
      handleError(res, e, "listing IdP users");
    }
  });

  router.post("/users", authGuard, async (req, res) => {
    if (!requireEnabled(res)) return;
    const parsed = createIdpUserRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid request schema",
        error: z.treeifyError(parsed.error),
      });
      return;
    }
    try {
      const user = await services.keycloakAdmin.createUser(parsed.data);
      res.status(201).json(user satisfies IdpUser);
    } catch (e) {
      handleError(res, e, "creating IdP user");
    }
  });

  router.patch("/users/:id", authGuard, async (req, res) => {
    if (!requireEnabled(res)) return;
    const id = req.params["id"];
    if (!id) {
      res.status(400).json({ message: "User id is required" });
      return;
    }
    const parsed = updateIdpUserRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid request schema",
        error: z.treeifyError(parsed.error),
      });
      return;
    }
    try {
      const user = await services.keycloakAdmin.setEnabled(
        id,
        parsed.data.enabled,
      );
      res.status(200).json(user satisfies IdpUser);
    } catch (e) {
      handleError(res, e, "updating IdP user");
    }
  });

  router.put("/users/:id/group", authGuard, async (req, res) => {
    if (!requireEnabled(res)) return;
    const id = req.params["id"];
    if (!id) {
      res.status(400).json({ message: "User id is required" });
      return;
    }
    const parsed = setIdpUserGroupRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid request schema",
        error: z.treeifyError(parsed.error),
      });
      return;
    }
    try {
      const user = await services.keycloakAdmin.setUserGroup(
        id,
        parsed.data.group,
      );
      res.status(200).json(user satisfies IdpUser);
    } catch (e) {
      handleError(res, e, "changing IdP user group");
    }
  });

  router.put("/users/:id/password", authGuard, async (req, res) => {
    if (!requireEnabled(res)) return;
    const id = req.params["id"];
    if (!id) {
      res.status(400).json({ message: "User id is required" });
      return;
    }
    const parsed = resetIdpPasswordRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid request schema",
        error: z.treeifyError(parsed.error),
      });
      return;
    }
    try {
      await services.keycloakAdmin.resetPassword(id, parsed.data);
      res.status(200).json({ message: "Password reset" });
    } catch (e) {
      handleError(res, e, "resetting IdP user password");
    }
  });

  router.delete("/users/:id", authGuard, async (req, res) => {
    if (!requireEnabled(res)) return;
    const id = req.params["id"];
    if (!id) {
      res.status(400).json({ message: "User id is required" });
      return;
    }
    try {
      await services.keycloakAdmin.deleteUser(id);
      res.status(200).json({ message: "User deleted" });
    } catch (e) {
      handleError(res, e, "deleting IdP user");
    }
  });

  router.get("/groups", authGuard, async (_req, res) => {
    if (!requireEnabled(res)) return;
    try {
      const groups = await services.keycloakAdmin.listGroups();
      res.status(200).json(groups satisfies IdpGroup[]);
    } catch (e) {
      handleError(res, e, "listing IdP groups");
    }
  });

  router.post("/groups", authGuard, async (req, res) => {
    if (!requireEnabled(res)) return;
    const parsed = createIdpGroupRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid request schema",
        error: z.treeifyError(parsed.error),
      });
      return;
    }
    try {
      const group = await services.keycloakAdmin.createGroup(parsed.data.name);
      res.status(201).json(group satisfies IdpGroup);
    } catch (e) {
      handleError(res, e, "creating IdP group");
    }
  });

  return router;
}
