import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { IdpStatus, IdpUser } from "@mcpx/shared-model";
import { useIdpGroups, useIdpStatus, useIdpUsers } from "@/data/idp";
import Identity from "./Identity";

vi.mock("@/data/idp", () => ({
  useIdpStatus: vi.fn(),
  useIdpUsers: vi.fn(),
  useIdpGroups: vi.fn(),
  useCreateIdpUser: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useUpdateIdpUser: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useSetIdpUserGroup: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useResetIdpPassword: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useDeleteIdpUser: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useCreateIdpGroup: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useCreatePermissionConsumer: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useUpdatePermissionConsumer: () => ({ mutateAsync: vi.fn(), isPending: false }),
}));

vi.mock("@/store/socket", () => ({
  useSocketStore: (selector: (s: unknown) => unknown) =>
    selector({ appConfig: null }),
}));

const mockStatus = vi.mocked(useIdpStatus);
const mockUsers = vi.mocked(useIdpUsers);
const mockGroups = vi.mocked(useIdpGroups);

function renderPage(): void {
  const client = new QueryClient();
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
  render(<Identity />, { wrapper: Wrapper });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function asQuery(data: unknown, extra: Record<string, unknown> = {}): any {
  return { data, isLoading: false, isError: false, ...extra };
}

beforeEach(() => {
  mockUsers.mockReturnValue(asQuery([]));
  mockGroups.mockReturnValue(asQuery([]));
});

describe("Identity page", () => {
  it("shows the setup card when the IdP is not enabled", () => {
    mockStatus.mockReturnValue(
      asQuery({ enabled: false, mode: "apikey" } satisfies IdpStatus),
    );
    renderPage();
    expect(
      screen.getByText(/identity management is not enabled/i),
    ).toBeInTheDocument();
  });

  it("renders user rows when enabled with data", () => {
    mockStatus.mockReturnValue(
      asQuery({
        enabled: true,
        mode: "oidc",
        reachable: true,
        realm: "tenant-b",
        issuer: "http://idp/realms/tenant-b",
      } satisfies IdpStatus),
    );
    const users: IdpUser[] = [
      {
        id: "u1",
        username: "fatima",
        email: "f@t.a",
        enabled: true,
        groups: ["accountant"],
      },
    ];
    mockUsers.mockReturnValue(asQuery(users));
    renderPage();
    expect(screen.getByText("fatima")).toBeInTheDocument();
    expect(screen.getByText("Reachable")).toBeInTheDocument();
  });
});
