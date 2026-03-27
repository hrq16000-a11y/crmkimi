import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Dashboard } from '@/sections/Dashboard';
import { UsersManagement } from '@/sections/UsersManagement';
import { LevelsManagement } from '@/sections/LevelsManagement';
import { AccountTypesManagement } from '@/sections/AccountTypesManagement';
import { useCRM } from '@/hooks/useCRM';
import type { ViewMode } from '@/types';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const {
    users,
    levels,
    accountTypes,
    addUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    addLevel,
    updateLevel,
    deleteLevel,
    addAccountType,
    updateAccountType,
    deleteAccountType,
    getLevelById,
    getAccountTypeById
  } = useCRM();

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard users={users} levels={levels} accountTypes={accountTypes} />;
      case 'users':
        return (
          <UsersManagement
            users={users}
            levels={levels}
            accountTypes={accountTypes}
            onAddUser={addUser}
            onUpdateUser={updateUser}
            onDeleteUser={deleteUser}
            onToggleStatus={toggleUserStatus}
            getLevelById={getLevelById}
            getAccountTypeById={getAccountTypeById}
          />
        );
      case 'levels':
        return (
          <LevelsManagement
            levels={levels}
            onAddLevel={addLevel}
            onUpdateLevel={updateLevel}
            onDeleteLevel={deleteLevel}
          />
        );
      case 'account-types':
        return (
          <AccountTypesManagement
            accountTypes={accountTypes}
            onAddAccountType={addAccountType}
            onUpdateAccountType={updateAccountType}
            onDeleteAccountType={deleteAccountType}
          />
        );
      default:
        return <Dashboard users={users} levels={levels} accountTypes={accountTypes} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Header 
          title={
            currentView === 'dashboard' ? 'Dashboard' :
            currentView === 'users' ? 'Gestão de Usuários' :
            currentView === 'levels' ? 'Níveis de Acesso' :
            'Tipos de Conta'
          }
        />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
