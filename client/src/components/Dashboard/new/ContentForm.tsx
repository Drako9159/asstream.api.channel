import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getAllCategory } from '../../../api/category';
import { pushEntry, pushLive, searchRequest } from '../../../api/search';
import { useCurrentView } from '../../../store/current_view';
import { useContentStore } from '../../../store/content_store';
import { updateEntry } from '../../../api/entry';
//import debounce from 'lodash/debounce';

interface SearchResult {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;

}

const ContentForm: React.FC = () => {
  const setCurrentView = useCurrentView((state) => state.setCurrentView);

  const [isLive, setIsLive] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState('');
  const [banner, setBanner] = useState('');
  const [source, setSource] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quality, setQuality] = useState('HD');
  const [loading, setLoading] = useState(false);
  const [selectedContent, setSelectedContent] = useState<SearchResult | null>(null);
  // const [liveFeedsId, setLiveFeedsId] = useState('');
  // const categories = ['Tecnología', 'Deportes', 'Cultura'];
  const [categories, setCategories] = useState<[]>([]);

  const qualityOptions = ['SD', 'HD', 'FHD'];
  // const resultsPerPage = 5;

  // Simulated search function - replace with actual API call
  const searchContent = async (query: string, page: number) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Mock results - replace with actual API call
      // setSearchResults(mockResults);
      const response = await searchRequest(query, "es", `${page}`);
      setSearchResults(response.data.results);
    } catch (error) {
      toast.error('Error al buscar contenido');
    } finally {
      setLoading(false);
    }
  };
  /*
    const debouncedSearch = debounce((query: string, page: number) => {
      if (query.trim()) {
        searchContent(query, page);
      } else {
        setSearchResults([]);
      }
    }, 300);*/

  const isUpdating = useContentStore((state) => state.isUpdating);
  const contentUpdating = useContentStore((state) => state.contentUpdating);

  const setIsUpdating = useContentStore((state) => state.setIsUpdating);

  useEffect(() => {
    if (isUpdating) {
      // setName(categoryUpdating.name);
      setCategory(contentUpdating.categoryId);
      setTitle(contentUpdating.title);
      setDescription(contentUpdating.shortDescription);
      setPoster(contentUpdating.thumbnail);
      setBanner(contentUpdating.backdrop);
      setSource(contentUpdating.content.videos.url);
      setQuality(contentUpdating.content.videos.quality);
      setSearchResults(contentUpdating.content.videos.url ? [{ id: 0, title: contentUpdating.title, overview: contentUpdating.shortDescription, poster_path: contentUpdating.thumbnail, backdrop_path: contentUpdating.backdrop }] : []);
      setSearchQuery(contentUpdating.title);
      // setIsLive(contentUpdating.categoryId === liveFeedsId);
      setIsActive(contentUpdating.status === "active");
      // setLiveFeedsId(contentUpdating.categoryId);
      setIsLive(contentUpdating.categoryName === "liveFeeds" || contentUpdating.categoryName === "tvSpecials");
      
    }
  }, [isUpdating]);


  useEffect(() => {
    if (!isLive) {
      //debouncedSearch(searchQuery, currentPage);
      searchContent(searchQuery, currentPage);
    }
    async function getAllCategories() {
      const response = await getAllCategory();
      setCategories(response.data);
      // response.data.forEach((cat: any) => { if (cat._id === contentUpdating.categoryId && cat.name === "liveFeeds" || cat.name === "tvSpecials") { setIsLive(true) } });
      
    }
    getAllCategories();
    return () => {
      //debouncedSearch.cancel();
    };
  }, [searchQuery, currentPage, isLive]);


  async function handleUpdate(object: any) {
    const response = await updateEntry(object);
    if (response.status === 200) {
      setIsUpdating(false);
      toast.success('Contenido actualizado correctamente');
      setCurrentView('contentList');
      resetForm();
    }
  }

  async function onSubmitLive() {
    if (!category || !title || !description || !poster || !banner || !source) {
      toast.error('Por favor complete todos los campos');
      return;
    }
    const liveContent = {
      poster_path: poster,
      backdrop_path: banner,
      title,
      description,
      source,
      quality,
      categoryId: category,
    }
    if (isUpdating) {
      const liveContent = {
        ...contentUpdating,
        thumbnail: poster,
        backdrop: banner,
        title,
        description,
        source,
        quality,
        categoryIdForm: category,
        isActive: isActive ? "active" : "inactive",
      }
      handleUpdate(liveContent);
      return;
    }
    const response = await pushLive(liveContent);
    if (response.status === 201) {
      setCurrentView('contentList');
      resetForm();
    } else {
      toast.error('Error al crear contenido');
    }
  }

  async function onSubmitContent() {
    if (!selectedContent || !category || !quality || !source) {
      toast.error('Por favor complete todos los campos');
      return;
    }
    const imageUri = "https://image.tmdb.org/t/p/w500";
    const entryContent = {
      ...selectedContent,
      source,
      poster_path: imageUri + selectedContent.poster_path,
      backdrop_path: imageUri + selectedContent.backdrop_path,
      description: selectedContent.overview,
      quality,
      categoryId: category,
    }
    if (isUpdating) {
      const entryContent = {
        ...contentUpdating,
        ...selectedContent,
        thumbnail: imageUri + selectedContent.poster_path,
        backdrop: imageUri + selectedContent.backdrop_path,
        description: selectedContent.overview,
        source,
        quality,
        categoryIdForm: category,
        isActive: isActive ? "active" : "inactive",
      }
      handleUpdate(entryContent);
      return;
    }
    const response = await pushEntry(entryContent);
    if (response.status === 201) {
      toast.success('Contenido creado correctamente');
      setCurrentView('contentList');
      resetForm();
    } else {
      toast.error('Error al crear contenido');
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLive) {
      onSubmitLive()
    } else {
      onSubmitContent()
    }

  };

  const resetForm = () => {
    setIsLive(false);
    setCategory('');
    setTitle('');
    setDescription('');
    setPoster('');
    setBanner('');
    setSource('');
    setSearchQuery('');
    setSelectedContent(null);
    setQuality('HD');
    setCurrentPage(1);
  };

  const handleContentSelect = (content: SearchResult) => {
    setSelectedContent(content);
    setSearchQuery(content.title);
    // Test this option for best quality
    setSearchResults(selectedContent ? [content] : []);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{isUpdating ? "Actualizar Contenido" : "Crear Contenido"}</h2>

      <div className="mb-6 flex gap-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isLive}
            onChange={(e) => setIsLive(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 cursor-pointer shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <span className="text-sm font-medium text-gray-700 cursor-pointer">Contenido en vivo</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 cursor-pointer shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <span className="text-sm font-medium text-gray-700 cursor-pointer">Activo</span>
        </label>

      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 cursor-pointer rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((cat: any) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {isLive ? (
          // Formulario para contenido en vivo
          <>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Título del contenido"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Descripción del contenido"
              />
            </div>

            <div>
              <label htmlFor="poster" className="block text-sm font-medium text-gray-700 mb-2">
                Poster URL
              </label>
              <input
                id="poster"
                type="url"
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="URL del poster"
              />
            </div>

            <div>
              <label htmlFor="banner" className="block text-sm font-medium text-gray-700 mb-2">
                Banner URL
              </label>
              <input
                id="banner"
                type="url"
                value={banner}
                onChange={(e) => setBanner(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="URL del banner"
              />
            </div>
          </>
        ) : (
          // Formulario para contenido no en vivo
          <>
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Buscar contenido
              </label>
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Escriba para buscar..."
              />
            </div>

            {loading && (
              <div className="text-center py-4">
                <p className="text-gray-500">Buscando...</p>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="border rounded-md overflow-hidden">
                {searchResults.map((result: any) => (
                  <div
                    key={result.id}
                    onClick={() => handleContentSelect(result)}
                    className="flex items-start space-x-4 p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                      alt={result.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{result.title}</h3>
                      <p className="text-sm text-gray-500">{result.overview}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedContent && (
              <div>
                <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-2">
                  Calidad
                </label>
                <select
                  id="quality"
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {qualityOptions.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}

        <div>
          <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-2">
            Source URL
          </label>
          <input
            id="source"
            type="url"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="URL del source"
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
              setCurrentView('contentList');
            }}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

export default ContentForm;