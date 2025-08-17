import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye } from "lucide-react";

export default function Portfolio() {
  const portfolioItems = [
    {
      id: 1,
      title: "Интернет-магазин электроники",
// [removed chatbot-related line]
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
// [removed chatbot-related line]
      category: "E-commerce",
      year: "2024"
    },
    {
      id: 2,
      title: "Ресторан \"Классика\"",
      description: "Сайт-визитка ресторана с виртуальным туром 360°, онлайн-бронированием столиков и полной интеграцией с Яндекс.Картами",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      tags: ["360° Tour", "Yandex Maps", "Booking", "SEO"],
      category: "Ресторан",
      year: "2024"
    },
    {
      id: 3,
      title: "Медицинский центр \"Здоровье+\"",
      description: "Корпоративный сайт медицинского центра с системой онлайн-записи к врачам и ИИ-помощником для консультаций",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      tags: ["Medical", "AI Assistant", "Booking", "CRM"],
      category: "Медицина",
      year: "2023"
    },
    {
      id: 4,
      title: "Салон красоты \"Элегант\"",
// [removed chatbot-related line]
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      tags: ["Beauty", "Instagram Ads", "Virtual Tour", "Gallery"],
      category: "Красота",
      year: "2023"
    },
    {
      id: 5,
      title: "Автосервис \"Мастер\"",
      description: "Корпоративный сайт автосервиса с калькулятором стоимости ремонта, системой записи и каталогом услуг в Яндекс.Картах",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      tags: ["Automotive", "Calculator", "Yandex Maps", "CRM"],
      category: "Автосервис",
      year: "2023"
    },
    {
      id: 6,
      title: "Стоматологическая клиника",
// [removed chatbot-related line]
      image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
// [removed chatbot-related line]
      category: "Медицина",
      year: "2024"
    }
  ];

  const categories = ["Все", ...Array.from(new Set(portfolioItems.map(item => item.category)))];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20" data-testid="portfolio-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="portfolio-title">
// [removed chatbot-related line]
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto" data-testid="portfolio-description">
            Примеры успешных проектов Smart 360. От простых лендингов до сложных 
            интернет-магазинов с ИИ-интеграциями.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-neutral" data-testid="portfolio-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center">
            <div data-testid="stat-projects">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">200+</div>
              <div className="text-gray-600">Проектов</div>
            </div>
            <div data-testid="stat-clients">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">150+</div>
              <div className="text-gray-600">Клиентов</div>
            </div>
            <div data-testid="stat-industries">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">25+</div>
              <div className="text-gray-600">Отраслей</div>
            </div>
            <div data-testid="stat-experience">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5+</div>
              <div className="text-gray-600">Лет опыта</div>
            </div>
          </div>

          {/* Portfolio Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <Card key={item.id} className="card-hover overflow-hidden" data-testid={`portfolio-item-${item.id}`}>
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    data-testid={`portfolio-image-${item.id}`}
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" data-testid={`portfolio-year-${item.id}`}>
                      {item.year}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs" data-testid={`portfolio-category-${item.id}`}>
                      {item.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3" data-testid={`portfolio-title-${item.id}`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm" data-testid={`portfolio-description-${item.id}`}>
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4" data-testid={`portfolio-tags-${item.id}`}>
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    data-testid={`portfolio-view-button-${item.id}`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-white" data-testid="technologies-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="technologies-title">
              Технологии, которые мы используем
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto" data-testid="technologies-description">
              Современный стек технологий для создания быстрых и надежных решений
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "React", icon: "⚛️" },
              { name: "Node.js", icon: "🟢" },
              { name: "Next.js", icon: "▲" },
              { name: "TypeScript", icon: "🔷" },
              { name: "Python", icon: "🐍" },
              { name: "WordPress", icon: "📝" },
              { name: "Figma", icon: "🎨" },
              { name: "PostgreSQL", icon: "🐘" },
              { name: "MongoDB", icon: "🍃" },
              { name: "Docker", icon: "🐳" },
              { name: "AWS", icon: "☁️" },
// [removed chatbot-related line]
            ].map((tech, index) => (
              <div 
                key={index}
                className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                data-testid={`tech-${index}`}
              >
                <div className="text-3xl mb-2">{tech.icon}</div>
                <h3 className="font-medium text-sm">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white" data-testid="portfolio-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" data-testid="cta-title">
            Готовы создать свой проект?
          </h2>
          <p className="text-xl text-blue-100 mb-8" data-testid="cta-description">
            Обсудим ваши задачи и создадим решение, которое приведет к результатам
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild data-testid="cta-contact">
              <a href="/contact">
                Обсудить проект
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              asChild
// [removed chatbot-related line]
            >
              <a 
                href="https://wa.me/79409435555?text=Здравствуйте,%20хочу%20обсудить%20проект%20с%20Smart%20360"
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