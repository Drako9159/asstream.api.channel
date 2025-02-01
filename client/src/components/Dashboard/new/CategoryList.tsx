import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { deleteCategory, getAllCategory } from '../../../api/category';

interface Category {
  _id: string;
  name: string;
  entries: string[];
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    { _id: "adf", name: 'Tecnología', entries: ["s", "d"] },
    { _id: "add", name: 'Deportes', entries: ["s", "e"] },
    { _id: "asd", name: 'Cultura', entries: ["s", "d"] },
  ]);

  useEffect(() => {
    async function api() {
      try {
        const resposne = await getAllCategory();
        setCategories(resposne.data);
      } catch (error) {
        console.log(error);
        toast.error('Error al cargar las categorías');
      }
    }
    api();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteCategory(id);
      if (response.status == 204) {
        setCategories(categories.filter(category => category._id !== id));
        toast.success('Categoria eliminada correctamente');
        return;
      }
    }
    catch (error) {
      console.log(error);
      toast.error('Error al eliminar la categoría');
    };
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Categorías</h2>
      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold">{category.name} &nbsp;
              ({category.entries.length})
            </h3>
            <p className="text-gray-600 mt-1">Contenidos</p>
            {category.entries.map((entry: any) => (
              <p key={entry._id} className="text-gray-600 mt-1">
                {entry}
              </p>
            ))}
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => toast.error('Función no implementada')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(category._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList
