import { Router } from "express";
import { validateUserAdmin } from "../../../middlewares/validateUserAdmin";
import { deleteEntry, pushEntry, updateEntry } from "../../controllers/entry.controller";


/*
import {
  saveOnePost,
  deleteOnePost,
  updateOnePost,
} from "../../controllers/post.controller";
*/

const router: Router = Router();

router.post("/", validateUserAdmin, pushEntry)


router.delete("/:id", validateUserAdmin, deleteEntry);

router.put("/", validateUserAdmin, updateEntry);

/*
router.put("/:id", validateUserAdmin, updateOnePost);
*/
export default router;
