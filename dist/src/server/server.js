"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_path_1 = __importDefault(require("node:path"));
const config_2 = require("db/config");
class Server {
    constructor() {
        this.path = {
            error404: "*",
            client: "/",
            auth: "/api/auth",
            post: "/api/posts",
            user: "/api/users",
        };
        this.corsOptions = {
            origin: ["http://localhost:5173", "http://localhost:3000"],
            exposedHeaders: ["authorization", "token"],
            credentials: true,
        };
        this.app = (0, express_1.default)();
        this.port = config_1.default.port;
        this.middlewares();
        this.routes();
        this.dbConnect();
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_2.connectDB)();
        });
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)(this.corsOptions));
        this.app.use(express_1.default.static(node_path_1.default.join(process.cwd(), "./client/dist")));
    }
    routes() {
        //this.app.use(this.path.auth, routerAuth);
        //this.app.use(this.path.user, routerPublicUser);
        //this.app.use(this.path.user, routerAdminUser);
        //this.app.use(this.path.post, routerPublicPost);
        //this.app.use(this.path.post, routerAdminPost);
        //this.app.use(this.path.client, routerClient);
        //this.app.use(this.path.error404, routerError404);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`[server] run on port ${this.port}`);
        });
    }
}
