import config from "../config";
import express, { Application } from "express";
import cors from "cors";
import path from "node:path";
import { connectDB } from "../db/config";
import cookieParser from "cookie-parser";

import routerAuth from "../network/routes/public/auth.routes";
import routerCategory from "../network/routes/admin/category.routes";
import routerEntry from "../network/routes/admin/entry.routes";
import routerApiTheMovieDb from "../network/routes/admin/apiTheMovieDb.routes"
import routerApiChannel from "../network/routes/public/jsonApi.routes"

import routerClient from "../network/routes/extra/client.routes"

class Server {
  private app: Application;
  private port: string;
  private path = {
    error404: "*",

    client: "/",

    auth: "/api/auth",
    category: "/api/category",
    entry: "/api/entry",
    apiTheMovieDb: "/api/api_the_movie_db",
    channelRoku: "/api/channel"
    //user: "/api/users",
  };
  private corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:3000", "https://asstream-api-channel.fly.dev", "*"],
    exposedHeaders: ["authorization", "token"],
    credentials: true,
  };

  constructor() {
    this.app = express();
    this.port = config.port as string;

    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  async dbConnect() {
    await connectDB();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors(this.corsOptions));
    this.app.use(express.static(path.join(process.cwd(), "./client/dist")));
  }

  routes() {
    this.app.use(this.path.auth, routerAuth);
    this.app.use(this.path.category, routerCategory);
    this.app.use(this.path.entry, routerEntry);
    this.app.use(this.path.apiTheMovieDb, routerApiTheMovieDb)

    this.app.use(this.path.channelRoku, routerApiChannel)

    //this.app.use(this.path.user, routerAdminUser);
    //this.app.use(this.path.post, routerPublicPost);
    //this.app.use(this.path.post, routerAdminPost);
    this.app.use(this.path.client, routerClient);
    //this.app.use(this.path.error404, routerError404);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`[server] run on port ${this.port}`);
    });
  }
}

export default Server;
