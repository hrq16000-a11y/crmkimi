import { LayoutDashboard, Users, Shield, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ViewMode } from '@/types';

interface SidebarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { id: 'dashboard' as ViewMode, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users' as ViewMode, label: 'Usuários', icon: Users },
  { id: 'levels' as ViewMode, label: 'Níveis', icon: Shield },
  { id: 'account-types' as ViewMode, label: 'Tipos de Conta', icon: CreditCard },
];

export function Sidebar({ currentView, onViewChange, isOpen, onToggle }: SidebarProps) {
  return (
    <div
      className={cn(
        'fixed left-0 top-0 h-full bg-slate-900 text-white transition-all duration-300 z-50',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-slate-700">
        <div className={cn('flex items-center gap-3', !isOpen && 'justify-center w-full')}> 
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold">CRM</span>
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <h1 className="font-bold text-lg whitespace-nowrap">User Manager</h1>
              <p className="text-xs text-slate-400 whitespace-nowrap">v1.0.0</p>
            </div>
          )}
        </div>
        <button
          onClick={onToggle}
          className={cn(
            'p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors',
            !isOpen && 'absolute -right-3 top-6 bg-slate-700 border border-slate-600'
          )}
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      <nav className="p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group',
                isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-900/30' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white',
                !isOpen && 'justify-center'
              )}
            >
              <Icon 
                size={22} 
                className={cn(
                  'flex-shrink-0 transition-transform group-hover:scale-110',
                  isActive && 'animate-pulse'
                )} 
              />
              {isOpen && (
                <span className="font-medium whitespace-nowrap">{item.label}</span>
              )}
              {isActive && isOpen && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      <div className={cn(
        'absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700',
        !isOpen && 'px-2'
      )}>
        <div className={cn(
          'flex items-center gap-3',
          !isOpen && 'justify-center'
        )}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
            <span className="font-bold text-sm">AD</span>
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <p className="font-medium text-sm whitespace-nowrap">Admin User</p>
              <p className="text-xs text-slate-400 whitespace-nowrap">admin@crm.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
