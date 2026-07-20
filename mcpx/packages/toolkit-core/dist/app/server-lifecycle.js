export async function closeServer(server) {
    if (!server.listening) {
        return;
    }
    await new Promise((resolve, reject) => {
        server.close((error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}
//# sourceMappingURL=server-lifecycle.js.map