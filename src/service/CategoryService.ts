import CategoryModel from "../domain/model/CategoryModel";

class CategoryService {
  async createCategory(name: string) {
    const savedCategory = await new CategoryModel({
      name: name,
    });
    const result = await savedCategory.save();
    return result;
  }
}

export default CategoryService;
