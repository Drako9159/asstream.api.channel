import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { createCategory } from '../../../api/category';

const CategoryForm: React.FC = () => {
  const [name, setName] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createCategory(name);
      if (response.status === 201) {
        toast.success('Categoría creada correctamente');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error al crear la categoría');
    }

  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Categoría</h2>
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
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Crear Categoría
        </button>
      </form>
    </div>
  );
};

export default CategoryForm