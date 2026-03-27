// Tipos para o Painel CRM de Gestão de Usuários

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  levelId: string;
  accountTypeId: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLogin?: string;
  phone?: string;
  department?: string;
}

export interface UserLevel {
  id: string;
  name: string;
  description: string;
  color: string;
  permissions: string[];
  priority: number;
}

export interface AccountType {
  id: string;
  name: string;
  description: string;
  color: string;
  features: string[];
  maxUsers?: number;
  price?: number;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
  usersByLevel: Record<string, number>;
  usersByAccountType: Record<string, number>;
  recentUsers: User[];
}

export type ViewMode = 'dashboard' | 'users' | 'levels' | 'account-types';

export type UserStatus = 'active' | 'inactive' | 'suspended';
