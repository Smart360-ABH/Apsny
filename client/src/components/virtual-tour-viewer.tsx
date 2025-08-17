import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, Eye, X } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface VirtualTour {
  id: string;
  name: string;
  filename: string;
  filePath: string;
  uploadedAt: string;
  isActive: boolean;
}

export default function VirtualTourViewer() {
  const [tourName, setTourName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { data: tours, refetch: refetchTours } = useQuery<VirtualTour[]>({
    queryKey: ["/api/virtual-tours"],
  });

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/virtual-tours", {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Успешно!",
        description: "Виртуальный тур загружен успешно",
      });
      setTourName("");
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      refetchTours();
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить файл",
        variant: "destructive"
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/virtual-tours/${id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Удалено",
        description: "Виртуальный тур удален",
      });
      refetchTours();
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить тур",
        variant: "destructive"
      });
    }
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите изображение",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Ошибка",
        description: "Файл слишком большой (максимум 10MB)",
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Auto-fill name if empty
    if (!tourName) {
      setTourName(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !tourName.trim()) {
      toast({
        title: "Ошибка",
        description: "Выберите файл и введите название",
        variant: "destructive"
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('name', tourName.trim());

    uploadMutation.mutate(formData);
  };

  const viewTour = (tourId: string) => {
    window.open(`/api/virtual-tours/${tourId}/file`, '_blank');
  };

  const downloadTourPackage = (tour: VirtualTour) => {
    // Create a simple "package" JSON for Yandex Maps integration
    const packageData = {
      tour: {
        name: tour.name,
        filename: tour.filename,
        id: tour.id,
        created: tour.uploadedAt
      },
      yandexMapsConfig: {
        title: tour.name,
        description: `Виртуальный тур: ${tour.name}`,
        type: "360_tour",
        url: `/api/virtual-tours/${tour.id}/file`
      },
      instructions: {
        ru: "Для интеграции с Яндекс.Картами свяжитесь с нами: Service-abh@yandex.ru",
        phone: "+7 940 943-55-55"
      }
    };

    const blob = new Blob([JSON.stringify(packageData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tour.name}-package.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8" data-testid="virtual-tour-viewer">
      {/* Upload Section */}
      <Card className="demo-interface">
        <CardHeader>
          <CardTitle data-testid="upload-title">Загрузка виртуального тура 360°</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="tour-name">Название тура</Label>
                <Input
                  id="tour-name"
                  value={tourName}
                  onChange={(e) => setTourName(e.target.value)}
                  placeholder="Введите название..."
                  data-testid="tour-name-input"
                />
              </div>
              
              <div>
                <Label>360° изображение</Label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  data-testid="file-upload-area"
                >
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    {selectedFile ? selectedFile.name : "Загрузите 360° фото"}
                  </h4>
                  <p className="text-gray-500 mb-4">JPG, PNG до 10MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    data-testid="file-input"
                  />
                  <Button 
                    variant="outline" 
                    type="button"
                    data-testid="select-file-button"
                  >
                    Выбрать файл
                  </Button>
                </div>
              </div>

              <Button 
                onClick={handleUpload}
                disabled={!selectedFile || !tourName.trim() || uploadMutation.isPending}
                className="w-full"
                data-testid="upload-button"
              >
                {uploadMutation.isPending ? "Загрузка..." : "Загрузить тур"}
              </Button>
            </div>

            <div>
              <Label>Предварительный просмотр</Label>
              <div className="bg-gray-900 rounded-lg p-4 h-64 flex items-center justify-center">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Preview"
                    className="max-w-full max-h-full object-contain rounded"
                    data-testid="tour-preview"
                  />
                ) : (
                  <img 
                    src="https://images.unsplash.com/photo-1497366412874-3415097a27e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300" 
                    alt="Пример 360-градусного тура современного офиса" 
                    className="rounded w-full h-full object-cover"
                    data-testid="example-tour"
                  />
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                {previewUrl ? "Предварительный просмотр" : "Пример виртуального тура"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tours List */}
      <Card>
        <CardHeader>
          <CardTitle data-testid="tours-list-title">Загруженные туры</CardTitle>
        </CardHeader>
        <CardContent>
          {tours && tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="tours-grid">
              {tours.map((tour) => (
                <div 
                  key={tour.id} 
                  className="border rounded-lg p-4 space-y-3"
                  data-testid={`tour-item-${tour.id}`}
                >
                  <h4 className="font-medium" data-testid={`tour-name-${tour.id}`}>
                    {tour.name}
                  </h4>
                  <p className="text-sm text-gray-500" data-testid={`tour-filename-${tour.id}`}>
                    {tour.filename}
                  </p>
                  <p className="text-xs text-gray-400" data-testid={`tour-date-${tour.id}`}>
                    {new Date(tour.uploadedAt).toLocaleString('ru-RU')}
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => viewTour(tour.id)}
                      data-testid={`view-tour-${tour.id}`}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Просмотр
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => downloadTourPackage(tour)}
                      data-testid={`download-tour-${tour.id}`}
                    >
                      <Download className="w-4 h-4 mr-1" />
// [removed chatbot-related line]
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(tour.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`delete-tour-${tour.id}`}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8" data-testid="no-tours-message">
              Пока нет загруженных туров. Загрузите первый тур выше.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}