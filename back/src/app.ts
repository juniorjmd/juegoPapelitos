import { Server } from "./presentation/server.js"; 

await main();

async function main() {
    const server = new Server();
    await server.start();
}
