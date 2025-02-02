import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { deleteEntry, getAllEntry } from '../../../api/entry';
import { useContentStore } from '../../../store/content_store';
import { useCurrentView } from '../../../store/current_view';




const ContentList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const setIsUpdating = useContentStore((state) => state.setIsUpdating);
  const setContentUpdating = useContentStore((state) => state.setContentUpdating);
  const setCurrentView = useCurrentView((state) => state.setCurrentView);

  const setContents = useContentStore((state) => state.setContentStore);
  const contents = useContentStore((state) => state.contents);

  useEffect(() => {
    try {
      async function api() {
        const response = await getAllEntry();
        setContents(response.data);
      }
      api();
    } catch (error) {
      console.log(error);
      toast.error('Error al cargar las categorías');
    }
  }, []);

  const categories = ['all', ...new Set(contents.map((content: any) => content.categoryName))];

  const filteredContents = selectedCategory === 'all'
    ? contents
    : contents.filter((content: any) => content.categoryName === selectedCategory);

  const handleUpdate = (content: any) => {
    setContentUpdating(content);
    setIsUpdating(true);
    setCurrentView('contentForm');
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteEntry(id);
      if (response.status === 204) {
        setContents(contents.filter((content: any) => content._id !== id));
        toast.success('Contenido eliminado correctamente');
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error('Error al eliminar el contenido');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Contenido</h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="categoryFilter" className="text-sm font-medium text-gray-700">
            Filtrar:
          </label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category._id} value={category}>
                {category === 'all' ? 'Todas las categorías' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredContents.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay contenido disponible para esta categoría</p>
        ) : (
          filteredContents.map((content) => (
            <div
              key={content._id}
              className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <h3 className="text-lg font-semibold">{content.title}</h3>
              <p className="text-sm text-blue-600 mt-1">Categoría: {content.categoryName}</p>
              <p className="text-gray-600 mt-1">{content.status}</p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleUpdate(content)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(content._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContentList;