export declare const WS_CONNECTION_ERROR: {
    readonly HUB_NOT_CONNECTED: "Hub not connected";
};
export declare enum UI_ServerBoundMessage {
    GetAppConfig = "getAppConfig",
    GetSystemState = "getSystemState"
}
export declare enum UI_ClientBoundMessage {
    AppConfig = "appConfig",
    GetAppConfigFailed = "getAppConfigFailed",
    SystemState = "systemState",
    GetSystemStateFailed = "getSystemStateFailed",
    IdentityChanged = "identityChanged"
}
