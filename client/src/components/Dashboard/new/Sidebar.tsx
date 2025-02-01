interface SidebarProps {
    setCurrentView: (view: string) => void;
    currentView: string;
}

export default function Sidebar({ setCurrentView, currentView }: SidebarProps) {
    const menuItems = [
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
                                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2
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
