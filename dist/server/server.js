"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
// import { IUser } from '../types'
const port = 5000;
class App {
    constructor(port) {
        this.port = port;
        const app = (0, express_1.default)();
        app.use(express_1.default.static(path_1.default.join(__dirname, '../client')));
        this.server = new http_1.default.Server(app);
        const io = new socket_io_1.default.Server(this.server, {});
        io.on('connection', (socket) => {
            const socketId = socket.id;
            const connectedUser = {
                socketId: socketId,
                name: 'Mehmethan',
                age: 50,
            };
            // this.users.push(connectedUser)
            console.log('a user connected', connectedUser);
            // console.log('users length', this.users.length)
            socket.emit('message', connectedUser);
            socket.on('disconnect', function () {
                console.log('disconnected', socketId);
            });
        });
    }
    Start() {
        this.server.listen(this.port);
        console.log(`Server listening on port ${this.port}`);
    }
}
new App(port).Start();
//# sourceMappingURL=server.js.map