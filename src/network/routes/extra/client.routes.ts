import { Router, Request, Response, NextFunction } from "express";
import path from "node:path";
const router: Router = Router();

router.get("*", (req: Request, res: Response, next: NextFunction) => {
  const indexFile = path.join(process.cwd() + "/client/dist/", "index.html");
  return res.sendFile(indexFile);
});

export default router;
