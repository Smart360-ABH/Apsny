import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Eye, Download, Trash2, LogIn, LogOut, Users, FileText, Settings } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  message?: string;
  status: string;
  createdAt: string;
}

interface User {
  id: string;
  username: string;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest("POST", "/api/auth/login", credentials);
      return response.json();
    },
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setCurrentUser(data.user);
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в админ-панель!",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка входа",
        description: "Неверные учетные данные",
        variant: "destructive",
      });
    }
  });

  const { data: leads, refetch: refetchLeads } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
    enabled: isAuthenticated,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await apiRequest("PATCH", `/api/leads/${id}/status`, { status });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Статус обновлен",
        description: "Статус заявки успешно изменен",
      });
      refetchLeads();
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус",
        variant: "destructive",
      });
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Ошибка",
        description: "Введите логин и пароль",
        variant: "destructive",
      });
      return;
    }
    loginMutation.mutate({ username, password });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUsername("");
    setPassword("");
    toast({
      title: "Выход выполнен",
      description: "Вы вышли из админ-панели",
    });
  };

  const downloadCSV = () => {
    window.open("/api/leads/export/csv", "_blank");
    toast({
// [removed chatbot-related line]
      description: "Файл CSV будет загружен",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "contacted": return "bg-yellow-100 text-yellow-800";
      case "converted": return "bg-green-100 text-green-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "new": return "Новая";
      case "contacted": return "Связались";
      case "converted": return "Клиент";
      case "closed": return "Закрыта";
      default: return status;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" data-testid="login-page">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center gap-2 justify-center" data-testid="login-title">
              <LogIn className="w-6 h-6" />
              Вход в админ-панель
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4" data-testid="login-form">
              <div>
                <Label htmlFor="username">Логин</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  data-testid="username-input"
                />
              </div>
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  data-testid="password-input"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={loginMutation.isPending}
                data-testid="login-button"
              >
                {loginMutation.isPending ? "Вход..." : "Войти"}
              </Button>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center" data-testid="login-hint">
              <p>Тестовые данные:</p>
              <p>Логин: <code>admin</code></p>
              <p>Пароль: <code>smart360admin</code></p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" data-testid="admin-dashboard">
      {/* Header */}
      <div className="bg-white shadow-sm border-b" data-testid="admin-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900" data-testid="dashboard-title">
                Админ-панель Smart 360
              </h1>
              {currentUser && (
                <Badge variant="outline" data-testid="current-user">
                  {currentUser.username}
                </Badge>
              )}
            </div>
            <Button variant="outline" onClick={handleLogout} data-testid="logout-button">
              <LogOut className="w-4 h-4 mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-testid="admin-stats">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold" data-testid="total-leads">
                    {leads?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Всего заявок</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <FileText className="w-8 h-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold" data-testid="new-leads">
                    {leads?.filter(lead => lead.status === "new").length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Новые</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Settings className="w-8 h-8 text-green-500" />
                <div>
                  <div className="text-2xl font-bold" data-testid="converted-leads">
                    {leads?.filter(lead => lead.status === "converted").length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Клиенты</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Download className="w-8 h-8 text-purple-500" />
                <div>
                  <Button onClick={downloadCSV} size="sm" data-testid="export-csv-button">
                    <Download className="w-4 h-4 mr-2" />
                    Экспорт CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leads Table */}
        <Card data-testid="leads-table-card">
          <CardHeader>
            <CardTitle data-testid="leads-table-title">Заявки клиентов</CardTitle>
          </CardHeader>
          <CardContent>
            {leads && leads.length > 0 ? (
              <Table data-testid="leads-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата</TableHead>
                    <TableHead>Имя</TableHead>
                    <TableHead>Телефон</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Услуга</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id} data-testid={`lead-row-${lead.id}`}>
                      <TableCell data-testid={`lead-date-${lead.id}`}>
                        {new Date(lead.createdAt).toLocaleDateString('ru-RU')}
                      </TableCell>
                      <TableCell data-testid={`lead-name-${lead.id}`}>
                        {lead.name}
                      </TableCell>
                      <TableCell data-testid={`lead-phone-${lead.id}`}>
                        <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                          {lead.phone}
                        </a>
                      </TableCell>
                      <TableCell data-testid={`lead-email-${lead.id}`}>
                        {lead.email ? (
                          <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                            {lead.email}
                          </a>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </TableCell>
                      <TableCell data-testid={`lead-service-${lead.id}`}>
                        {lead.service}
                      </TableCell>
                      <TableCell data-testid={`lead-status-${lead.id}`}>
                        <select
                          value={lead.status}
                          onChange={(e) => updateStatusMutation.mutate({ id: lead.id, status: e.target.value })}
                          className={`px-2 py-1 rounded text-xs font-medium border-0 ${getStatusColor(lead.status)}`}
                        >
                          <option value="new">Новая</option>
                          <option value="contacted">Связались</option>
                          <option value="converted">Клиент</option>
                          <option value="closed">Закрыта</option>
                        </select>
                      </TableCell>
                      <TableCell data-testid={`lead-actions-${lead.id}`}>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              toast({
                                title: "Сообщение клиента",
                                description: lead.message || "Сообщение отсутствует",
                              });
                            }}
                            data-testid={`view-message-${lead.id}`}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
// [removed chatbot-related line]
                          >
                            <a
                              href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=Здравствуйте,%20${lead.name}!%20Спасибо%20за%20заявку%20на%20Smart%20360.`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
// [removed chatbot-related line]
                            </a>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500" data-testid="no-leads-message">
                Заявок пока нет
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}