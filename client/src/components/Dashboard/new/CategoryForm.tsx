import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { createCategory, updateCategory } from '../../../api/category';
import { useCurrentView } from '../../../store/current_view';
import { useCategoryStore } from '../../../store/category_store';

const CategoryForm: React.FC = () => {
  const [name, setName] = useState('');
  const setCurrentView = useCurrentView((state) => state.setCurrentView);

  const isUpdating = useCategoryStore((state) => state.isUpdating);
  const categoryUpdating = useCategoryStore((state) => state.categoryUpdating);
  const setIsUpdating = useCategoryStore((state) => state.setIsUpdating);

  useEffect(() => {
    if (isUpdating) {
      setName(categoryUpdating.name);
    }
  }, [isUpdating]);

  async function handleUpdate() {
    try {
      const response = await updateCategory(categoryUpdating._id, name);
      if (response.status === 200) {
        setIsUpdating(false);
        toast.success('Categoría actualizada correctamente');
        setCurrentView('categoryList');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error al actualizar la categoría');
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isUpdating) {
        handleUpdate();
        return;
      }
      const response = await createCategory(name);
      if (response.status === 201) {
        toast.success('Categoría creada correctamente');
        setCurrentView('categoryList');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error al crear la categoría');
    }

  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{isUpdating ? "Actualiza Categoría" : "Crear Categoría"}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nombre de la categoría"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
        >
          {isUpdating ? "Actualizar" : "Crear"}
        </button>
        {isUpdating && (
          <button
            type="button"
            onClick={() => {
              setIsUpdating(false);
              setCurrentView('categoryList');
            }}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
          >
            Cancelar
          </button>)
        }
      </form>
    </div>
  );
};

export default CategoryForm