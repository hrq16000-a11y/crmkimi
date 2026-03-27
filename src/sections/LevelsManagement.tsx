import { useState } from 'react';
import { Plus, Edit2, Trash2, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { UserLevel } from '@/types';
import { toast } from 'sonner';

interface LevelsManagementProps {
  levels: UserLevel[];
  onAddLevel: (level: Omit<UserLevel, 'id'>) => void;
  onUpdateLevel: (id: string, updates: Partial<UserLevel>) => void;
  onDeleteLevel: (id: string) => void;
}

const availablePermissions = [
  { id: 'users.create', label: 'Criar Usuários' },
  { id: 'users.edit', label: 'Editar Usuários' },
  { id: 'users.delete', label: 'Excluir Usuários' },
  { id: 'users.view', label: 'Visualizar Usuários' },
  { id: 'settings.manage', label: 'Gerenciar Configurações' },
  { id: 'reports.view', label: 'Visualizar Relatórios' },
  { id: 'billing.manage', label: 'Gerenciar Faturamento' },
];

const colorOptions = [
  { value: '#ef4444', label: 'Vermelho' },
  { value: '#f97316', label: 'Laranja' },
  { value: '#eab308', label: 'Amarelo' },
  { value: '#22c55e', label: 'Verde' },
  { value: '#3b82f6', label: 'Azul' },
  { value: '#8b5cf6', label: 'Roxo' },
  { value: '#ec4899', label: 'Rosa' },
  { value: '#06b6d4', label: 'Ciano' },
  { value: '#64748b', label: 'Cinza' },
];

export function LevelsManagement({
  levels,
  onAddLevel,
  onUpdateLevel,
  onDeleteLevel
}: LevelsManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<UserLevel | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3b82f6',
    permissions: [] as string[],
    priority: 50
  });

  const handleAdd = () => {
    if (!formData.name || !formData.description) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    onAddLevel(formData);
    toast.success('Nível adicionado com sucesso!');
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (selectedLevel) {
      onUpdateLevel(selectedLevel.id, formData);
      toast.success('Nível atualizado com sucesso!');
      setIsEditDialogOpen(false);
      setSelectedLevel(null);
    }
  };

  const handleDelete = () => {
    if (selectedLevel) {
      try {
        onDeleteLevel(selectedLevel.id);
        toast.success('Nível excluído com sucesso!');
        setIsDeleteDialogOpen(false);
        setSelectedLevel(null);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Erro ao excluir nível');
      }
    }
  };

  const togglePermission = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const openEditDialog = (level: UserLevel) => {
    setSelectedLevel(level);
    setFormData({
      name: level.name,
      description: level.description,
      color: level.color,
      permissions: level.permissions,
      priority: level.priority
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (level: UserLevel) => {
    setSelectedLevel(level);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      color: '#3b82f6',
      permissions: [],
      priority: 50
    });
  };

  const renderLevelForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Nível *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ex: Administrador"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descreva as permissões deste nível"
          rows={3}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="color">Cor</Label>
          <Select 
            value={formData.color} 
            onValueChange={(value) => setFormData({ ...formData, color: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma cor" />
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: color.value }}
                    />
                    {color.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="priority">Prioridade (0-100)</Label>
          <Input
            id="priority"
            type="number"
            min={0}
            max={100}
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Permissões</Label>
        <div className="grid grid-cols-2 gap-2 border rounded-lg p-3">
          {availablePermissions.map((permission) => (
            <button
              key={permission.id}
              onClick={() => togglePermission(permission.id)}
              className={`flex items-center gap-2 p-2 rounded-md text-left text-sm transition-colors ${
                formData.permissions.includes(permission.id)
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'hover:bg-slate-50 border border-transparent'
              }`}
            >
              <div className={`w-4 h-4 rounded flex items-center justify-center ${
                formData.permissions.includes(permission.id)
                  ? 'bg-blue-500 text-white'
                  : 'border border-slate-300'
              }`}>
                {formData.permissions.includes(permission.id) && <Check size={12} />}
              </div>
              {permission.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Níveis de Acesso</h3>
          <p className="text-sm text-slate-500">Gerencie os níveis de permissão do sistema</p>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          <Plus size={18} className="mr-2" />
          Novo Nível
        </Button>
      </div>

      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {levels.map((level) => (
          <Card key={level.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${level.color}20` }}
                  >
                    <Shield size={24} style={{ color: level.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{level.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: level.color }}
                      />
                      <span className="text-xs text-slate-500">Prioridade: {level.priority}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => openEditDialog(level)}
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => openDeleteDialog(level)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                {level.description}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 mb-2">Permissões:</p>
                <div className="flex flex-wrap gap-1">
                  {level.permissions.slice(0, 4).map((perm) => {
                    const permLabel = availablePermissions.find(p => p.id === perm)?.label || perm;
                    return (
                      <Badge key={perm} variant="secondary" className="text-xs">
                        {permLabel}
                      </Badge>
                    );
                  })}
                  {level.permissions.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{level.permissions.length - 4}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Nível</DialogTitle>
            <DialogDescription>
              Crie um novo nível de acesso com permissões específicas.
            </DialogDescription>
          </DialogHeader>
          {renderLevelForm()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAdd}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Nível</DialogTitle>
            <DialogDescription>
              Atualize as informações do nível de acesso.
            </DialogDescription>
          </DialogHeader>
          {renderLevelForm()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEdit}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o nível <strong>{selectedLevel?.name}</strong>?
              <br /><br />
              <span className="text-amber-600 text-sm">
                Nota: Níveis em uso por usuários não podem ser excluídos.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
