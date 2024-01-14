import { Router } from "express";
import { validateUserAdmin } from "../../../middlewares/validateUserAdmin";
import { search } from "../../../network/controllers/apiTheMovieDb.controller";

//import { deleteEntry, pushEntry, updateEntry } from "../../controllers/entry.controller";

/*
import {
  saveOnePost,
  deleteOnePost,
  updateOnePost,
} from "../../controllers/post.controller";
*/

const router: Router = Router();

router.post("/", search);

/*
router.delete("/:id", validateUserAdmin, deleteEntry);

router.put("/", validateUserAdmin, updateEntry);
s

router.put("/:id", validateUserAdmin, updateOnePost);
*/
export default router;
