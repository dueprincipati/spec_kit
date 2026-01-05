import { useAuthStore } from '../../store/authStore';
import { LogOut } from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">Task Tracker</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-gray-600">
                Ciao, {user.name || user.email}
              </span>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition"
            >
              <LogOut className="w-4 h-4" />
              Esci
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
