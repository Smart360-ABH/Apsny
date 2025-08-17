import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { PenTool, Copy, Download } from "lucide-react";

interface GeneratedText {
  id: string;
  topic: string;
  audience: string;
  length: string;
  generatedText: string;
  createdAt: string;
}

export default function TextGeneratorForm() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [length, setLength] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: async (data: { topic: string; audience: string; length: string }) => {
      const response = await apiRequest("POST", "/api/generate-text", data);
      return response.json();
    },
    onSuccess: (data: GeneratedText) => {
      setGeneratedText(data.generatedText);
      toast({
        title: "Текст сгенерирован!",
        description: "Коммерческий текст готов к использованию",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось сгенерировать текст. Попробуйте снова.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !audience || !length) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля формы",
        variant: "destructive"
      });
      return;
    }
    generateMutation.mutate({ topic, audience, length });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    toast({
      title: "Скопировано!",
      description: "Текст скопирован в буфер обмена",
    });
  };

  const downloadText = () => {
    const blob = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/\s+/g, '-')}-text.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Файл загружен",
      description: "Текст сохранен в файл",
    });
  };

  return (
    <Card className="demo-interface" data-testid="text-generator-form">
      <CardHeader>
        <CardTitle className="flex items-center gap-2" data-testid="form-title">
          <PenTool className="w-6 h-6 text-primary" />
          Генератор коммерческих текстов
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="generator-form">
              <div>
                <Label htmlFor="topic">Тема *</Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Запуск нового продукта"
                  required
                  data-testid="topic-input"
                />
              </div>

              <div>
                <Label htmlFor="audience">Целевая аудитория *</Label>
                <Input
                  id="audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="Малый и средний бизнес"
                  required
                  data-testid="audience-input"
                />
              </div>

              <div>
                <Label htmlFor="length">Длина текста *</Label>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger data-testid="length-select">
                    <SelectValue placeholder="Выберите длину текста" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Короткий (до 100 слов)">Короткий (до 100 слов)</SelectItem>
                    <SelectItem value="Средний (100-300 слов)">Средний (100-300 слов)</SelectItem>
                    <SelectItem value="Длинный (300+ слов)">Длинный (300+ слов)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={generateMutation.isPending}
                data-testid="generate-button"
              >
                <PenTool className="w-4 h-4 mr-2" />
                {generateMutation.isPending ? "Генерация..." : "Сгенерировать текст"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg" data-testid="tips-section">
              <h4 className="font-semibold text-sm mb-2">💡 Советы для лучшего результата:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Будьте конкретны в теме</li>
                <li>• Точно определите аудиторию</li>
                <li>• Выберите подходящую длину</li>
                <li>• Можете генерировать несколько вариантов</li>
              </ul>
            </div>
          </div>

          <div>
            <Label>Сгенерированный текст</Label>
            <div className="mt-2">
              <Textarea
                value={generatedText}
                readOnly
                placeholder="Здесь будет отображаться сгенерированный текст..."
                className="min-h-80 resize-none"
                data-testid="generated-text-area"
              />
              
              {generatedText && (
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={copyToClipboard}
                    data-testid="copy-button"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Копировать
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={downloadText}
                    data-testid="download-button"
                  >
                    <Download className="w-4 h-4 mr-2" />
// [removed chatbot-related line]
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Example texts */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4" data-testid="examples-section">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Пример: Короткий</h4>
            <p className="text-sm text-gray-600 italic">
              "🚀 Новый продукт для малого бизнеса! 
              Smart 360 поможет автоматизировать процессы и увеличить прибыль. 
              Звоните: +7 940 943-55-55"
            </p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Пример: Средний</h4>
            <p className="text-sm text-gray-600 italic">
              "🎯 Революционное решение для вашего бизнеса! 
// [removed chatbot-related line]
              Увеличиваем прибыль на 30-50%. Гарантия результата..."
            </p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Пример: Длинный</h4>
            <p className="text-sm text-gray-600 italic">
              "🌟 Полный цикл цифровой трансформации! 
              Детальный анализ рынка, индивидуальная стратегия, 
              профессиональная реализация. Более 200 успешных проектов..."
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}