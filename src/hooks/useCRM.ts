import { useState, useCallback } from 'react';
import type { User, UserLevel, AccountType } from '@/types';
import { users as initialUsers, userLevels as initialLevels, accountTypes as initialAccountTypes } from '@/data/mockData';

export function useCRM() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [levels, setLevels] = useState<UserLevel[]>(initialLevels);
  const [accountTypes, setAccountTypes] = useState<AccountType[]>(initialAccountTypes);

  // User operations
  const addUser = useCallback((user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  }, []);

  const updateUser = useCallback((id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...updates } : user
    ));
  }, []);

  const deleteUser = useCallback((id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  }, []);

  const toggleUserStatus = useCallback((id: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === id) {
        const statuses: ('active' | 'inactive' | 'suspended')[] = ['active', 'inactive', 'suspended'];
        const currentIndex = statuses.indexOf(user.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
        return { ...user, status: nextStatus };
      }
      return user;
    }));
  }, []);

  // Level operations
  const addLevel = useCallback((level: Omit<UserLevel, 'id'>) => {
    const newLevel: UserLevel = {
      ...level,
      id: Date.now().toString()
    };
    setLevels(prev => [...prev, newLevel]);
    return newLevel;
  }, []);

  const updateLevel = useCallback((id: string, updates: Partial<UserLevel>) => {
    setLevels(prev => prev.map(level => 
      level.id === id ? { ...level, ...updates } : level
    ));
  }, []);

  const deleteLevel = useCallback((id: string) => {
    const usersWithLevel = users.filter(u => u.levelId === id);
    if (usersWithLevel.length > 0) {
      throw new Error(`Não é possível excluir: ${usersWithLevel.length} usuário(s) utilizam este nível`);
    }
    setLevels(prev => prev.filter(level => level.id !== id));
  }, [users]);

  // Account type operations
  const addAccountType = useCallback((type: Omit<AccountType, 'id'>) => {
    const newType: AccountType = {
      ...type,
      id: Date.now().toString()
    };
    setAccountTypes(prev => [...prev, newType]);
    return newType;
  }, []);

  const updateAccountType = useCallback((id: string, updates: Partial<AccountType>) => {
    setAccountTypes(prev => prev.map(type => 
      type.id === id ? { ...type, ...updates } : type
    ));
  }, []);

  const deleteAccountType = useCallback((id: string) => {
    const usersWithType = users.filter(u => u.accountTypeId === id);
    if (usersWithType.length > 0) {
      throw new Error(`Não é possível excluir: ${usersWithType.length} usuário(s) utilizam este tipo de conta`);
    }
    setAccountTypes(prev => prev.filter(type => type.id !== id));
  }, [users]);

  // Getters
  const getUserById = useCallback((id: string) => {
    return users.find(u => u.id === id);
  }, [users]);

  const getLevelById = useCallback((id: string) => {
    return levels.find(l => l.id === id);
  }, [levels]);

  const getAccountTypeById = useCallback((id: string) => {
    return accountTypes.find(t => t.id === id);
  }, [accountTypes]);

  return {
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
    getUserById,
    getLevelById,
    getAccountTypeById
  };
}
