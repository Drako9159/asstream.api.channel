import { Router } from "express";
import { validateUserAdmin } from "../../../middlewares/validateUserAdmin";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
  getCategoryById
} from "../../controllers/category.controller";

/*
import {
  saveOnePost,
  deleteOnePost,
  updateOnePost,
} from "../../controllers/post.controller";
*/

const router: Router = Router();

router.post("/", validateUserAdmin, createCategory);

router.delete("/:id", validateUserAdmin, deleteCategory);

router.put("/", validateUserAdmin, updateCategory);

router.get("/", validateUserAdmin,  getAllCategories)

router.get("/:id", validateUserAdmin,  getCategoryById)
/*
router.put("/:id", validateUserAdmin, updateOnePost);
*/
export default router;
