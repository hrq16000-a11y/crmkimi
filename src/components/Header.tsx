import { Bell, Search, Settings, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            Online
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input
              placeholder="Pesquisar..."
              className="pl-10 w-64 bg-slate-50 border-slate-200 focus:bg-white"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} className="text-slate-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notificações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-64 overflow-auto">
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <span className="font-medium text-sm">Novo usuário cadastrado</span>
                  <span className="text-xs text-slate-500">Camila Rodrigues foi adicionada</span>
                  <span className="text-xs text-slate-400">Há 5 minutos</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <span className="font-medium text-sm">Status alterado</span>
                  <span className="text-xs text-slate-500">Bruno Ferreira foi suspenso</span>
                  <span className="text-xs text-slate-400">Há 30 minutos</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <span className="font-medium text-sm">Nível atualizado</span>
                  <span className="text-xs text-slate-500">Diego Almeida promovido a Supervisor</span>
                  <span className="text-xs text-slate-400">Há 1 hora</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings size={20} className="text-slate-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Configurações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Preferências</DropdownMenuItem>
              <DropdownMenuItem>Integrações</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
