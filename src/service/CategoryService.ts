import CategoryModel from "../domain/model/CategoryModel";

class CategoryService {
  async createCategory(name: string) {
    const savedCategory = new CategoryModel({
      name: name,
    });
    const result = await savedCategory.save();
    return result;
  }

  async getCategories() {
    const categories = await CategoryModel.find();
    return categories;
  }

  async getCategoryById(id: string) {
    const category = await CategoryModel.findById({ _id: id });
    return category;
  }

  async updateCategory(id: string, name: string) {
    const category = await CategoryModel
      .findByIdAndUpdate({_id: id}, { name: name }, { new: true });
    return category;
  }

  async deleteCategory(id: string) {
    const category = await CategoryModel.findByIdAndDelete({ _id: id });
    return category;
  }

  async getCategoriesByEntries() {
    const categories = await CategoryModel.aggregate([
      {
        $lookup: {
          from: "entries",
          localField: "_id",
          foreignField: "category",
          as: "entries",
        },
      },
      {
        $project: {
          name: 1,
          entries: 1,
        },
      },
    ]);
    return categories;
  }

  async getCategoriesPopulate() {
    const categories = await CategoryModel.find().populate("entries");
    return categories;
  }
}

export default CategoryService;
