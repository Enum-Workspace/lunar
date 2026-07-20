// A utility function to transform an the `e` in a general `catch(e)`
// clause into an Error.
export function makeError(error) {
    if (!(error instanceof Error)) {
        return new Error(`Unknown error (${JSON.stringify(error)})`);
    }
    return error;
}
//# sourceMappingURL=errors.js.map