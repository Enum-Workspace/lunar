// Unified websocket messages for direct UI to MCPX server communication
// Connection error messages (used in socket.io middleware rejection)
export const WS_CONNECTION_ERROR = {
    HUB_NOT_CONNECTED: "Hub not connected",
};
// Messages from UI to MCPX server. Read- and push-only: writes go over REST.
export var UI_ServerBoundMessage;
(function (UI_ServerBoundMessage) {
    UI_ServerBoundMessage["GetAppConfig"] = "getAppConfig";
    UI_ServerBoundMessage["GetSystemState"] = "getSystemState";
})(UI_ServerBoundMessage || (UI_ServerBoundMessage = {}));
// Messages from MCPX server to UI
export var UI_ClientBoundMessage;
(function (UI_ClientBoundMessage) {
    UI_ClientBoundMessage["AppConfig"] = "appConfig";
    UI_ClientBoundMessage["GetAppConfigFailed"] = "getAppConfigFailed";
    UI_ClientBoundMessage["SystemState"] = "systemState";
    UI_ClientBoundMessage["GetSystemStateFailed"] = "getSystemStateFailed";
    UI_ClientBoundMessage["IdentityChanged"] = "identityChanged";
})(UI_ClientBoundMessage || (UI_ClientBoundMessage = {}));
