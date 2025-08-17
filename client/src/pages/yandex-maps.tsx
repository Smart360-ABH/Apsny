import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import YandexMapsForm from "@/components/yandex-maps-form";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Map, Search, Users } from "lucide-react";

export default function YandexMaps() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 bg-neutral" data-testid="yandex-maps-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" asChild data-testid="back-button">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад
              </Link>
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="page-title">
              Интеграция с Яндекс.Картами
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="page-description">
              Заполните карточку организации и создайте JSON-файл для экспорта в Яндекс.Карты. 
              Привлекайте местных клиентов через геопоиск.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-12" data-testid="demo-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <YandexMapsForm />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-neutral" data-testid="benefits-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="benefits-title">
              Почему важно быть на Яндекс.Картах
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto" data-testid="benefits-description">
              Увеличьте видимость вашего бизнеса в местном поиске
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm" data-testid="benefit-1">
              <Search className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Местный поиск</h3>
              <p className="text-gray-600">
                Клиенты найдут ваш бизнес при поиске "рядом со мной"
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm" data-testid="benefit-2">
              <Map className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Навигация</h3>
              <p className="text-gray-600">
                Удобная навигация до вашего заведения прямо из карт
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm" data-testid="benefit-3">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Больше клиентов</h3>
              <p className="text-gray-600">
                Привлекайте новых клиентов через геотаргетинг
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="features-title">
              Что мы настраиваем
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4" data-testid="feature-1">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="font-semibold mb-2">Точное местоположение</h3>
              <p className="text-sm text-gray-600">Привязка к координатам</p>
            </div>
            
            <div className="text-center p-4" data-testid="feature-2">
              <div className="text-4xl mb-3">📞</div>
              <h3 className="font-semibold mb-2">Контактная информация</h3>
              <p className="text-sm text-gray-600">Телефоны, сайт, email</p>
            </div>
            
            <div className="text-center p-4" data-testid="feature-3">
              <div className="text-4xl mb-3">🕒</div>
// [removed chatbot-related line]
// [removed chatbot-related line]
            </div>
            
            <div className="text-center p-4" data-testid="feature-4">
              <div className="text-4xl mb-3">📸</div>
              <h3 className="font-semibold mb-2">Фотографии</h3>
              <p className="text-sm text-gray-600">Интерьер и экстерьер</p>
            </div>
            
            <div className="text-center p-4" data-testid="feature-5">
              <div className="text-4xl mb-3">🏷️</div>
              <h3 className="font-semibold mb-2">Категории</h3>
              <p className="text-sm text-gray-600">Тип деятельности</p>
            </div>
            
            <div className="text-center p-4" data-testid="feature-6">
              <div className="text-4xl mb-3">📦</div>
              <h3 className="font-semibold mb-2">Каталог товаров</h3>
              <p className="text-sm text-gray-600">Меню, прайс-листы</p>
            </div>
            
            <div className="text-center p-4" data-testid="feature-7">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-semibold mb-2">Отзывы</h3>
              <p className="text-sm text-gray-600">Управление репутацией</p>
            </div>
            
            <div className="text-center p-4" data-testid="feature-8">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-semibold mb-2">Продвижение</h3>
              <p className="text-sm text-gray-600">SEO-оптимизация</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white" data-testid="cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" data-testid="cta-title">
            Добавьте ваш бизнес на Яндекс.Карты
          </h2>
          <p className="text-xl text-blue-100 mb-8" data-testid="cta-description">
            Полное заполнение карточки организации и продвижение в местном поиске
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild data-testid="cta-contact">
              <Link href="/contact">
                Заказать размещение
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              asChild
// [removed chatbot-related line]
            >
              <a 
                href="https://wa.me/79407666644?text=Здравствуйте,%20хочу%20узнать%20об%20интеграции%20с%20Яндекс.Картами%20Smart%20360"
                target="_blank"
                rel="noopener noreferrer"
              >
// [removed chatbot-related line]
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}