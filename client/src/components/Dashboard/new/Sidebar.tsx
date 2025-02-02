import { useCurrentView } from "../../../store/current_view";


type CurrentView = "categoryList" | "categoryForm" | "contentList" | "contentForm";

interface MenuItem {
    id: CurrentView;
    label: string;
    icon: string;
}

export default function Sidebar() {

    const setCurrentView = useCurrentView((state) => state.setCurrentView);
    const currentView = useCurrentView((state) => state.currentView);

    const menuItems: MenuItem[] = [
        { id: 'categoryList', label: 'Listar Categorías', icon: '📋' },
        { id: 'categoryForm', label: 'Crear Categoría', icon: '➕' },
        { id: 'contentList', label: 'Listar Contenido', icon: '📑' },
        { id: 'contentForm', label: 'Crear Contenido', icon: '✏️' },
    ];

    return (
        <aside className="w-64 bg-white shadow-md">
            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Dashboard</h2>
                <nav>
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => setCurrentView(item.id)}
                                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2 cursor-pointer
                    ${currentView === item.id
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
