import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, MessageCircle } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Старт",
      price: "15,000₽",
      period: "/проект",
      description: "Идеально для малого бизнеса и стартапов",
      features: [
        "Лендинг или сайт-визитка",
        "Адаптивный дизайн",
        "Базовая SEO-оптимизация",
        "Заполнение Яндекс.Карт",
        "Техподдержка 1 месяц",
        "Домен и хостинг на год"
      ],
      popular: false,
// [removed chatbot-related line]
    },
    {
      name: "Профи",
      price: "35,000₽",
      period: "/проект",
      description: "Комплексное решение для развития бизнеса",
      features: [
        "Корпоративный сайт до 10 страниц",
// [removed chatbot-related line]
        "Виртуальный тур 360°",
        "Реклама в Instagram (настройка)",
        "Полная интеграция с Яндекс.Картами",
        "SEO-оптимизация и аналитика",
        "Техподдержка 3 месяца",
        "Обучение команды"
      ],
      popular: true,
// [removed chatbot-related line]
    },
    {
      name: "Бизнес",
      price: "75,000₽",
      period: "/проект",
      description: "Максимальная автоматизация и возможности",
      features: [
        "Интернет-магазин или большой корпсайт",
// [removed chatbot-related line]
        "Автоматизация бизнес-процессов",
        "Комплексный digital-маркетинг",
        "Уникальный дизайн и брендинг",
        "Мобильное приложение (PWA)",
        "Техподдержка 6 месяцев",
        "Персональный менеджер"
      ],
      popular: false,
// [removed chatbot-related line]
    }
  ];

  const additionalServices = [
    {
// [removed chatbot-related line]
      price: "от 8,000₽",
      description: "ИИ-помощник для автоматизации общения с клиентами"
    },
    {
      name: "Виртуальный тур 360°",
      price: "от 5,000₽", 
      description: "Профессиональная съемка и создание интерактивного тура"
    },
    {
      name: "Реклама в Instagram",
      price: "от 10,000₽/мес",
      description: "Настройка и ведение рекламных кампаний"
    },
    {
      name: "SEO-продвижение",
      price: "от 15,000₽/мес",
      description: "Комплексное продвижение сайта в поисковых системах"
    },
    {
      name: "Копирайтинг",
      price: "от 1,000₽/текст",
      description: "Создание продающих текстов для сайта и рекламы"
    },
    {
      name: "Техподдержка",
      price: "от 3,000₽/мес",
      description: "Обновления, резервное копирование, мониторинг"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20" data-testid="pricing-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="pricing-title">
            Тарифы и цены
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto" data-testid="pricing-description">
            Выберите подходящий пакет услуг для вашего бизнеса. 
            Прозрачное ценообразование без скрытых платежей.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-neutral" data-testid="pricing-plans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.popular ? 'ring-2 ring-primary scale-105' : ''}`}
                data-testid={`pricing-plan-${index}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-white px-4 py-1" data-testid="popular-badge">
                      <Star className="w-4 h-4 mr-1" />
                      Популярный
                    </Badge>
                  </div>
                )}
                
                <CardHeader className={`text-center ${plan.popular ? 'bg-primary text-white' : ''}`}>
                  <CardTitle className="text-2xl mb-2" data-testid={`plan-name-${index}`}>
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4" data-testid={`plan-price-${index}`}>
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={`text-sm ${plan.popular ? 'text-blue-200' : 'text-gray-500'}`}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`} data-testid={`plan-description-${index}`}>
                    {plan.description}
                  </p>
                </CardHeader>
                
                <CardContent className="p-6">
                  <ul className="space-y-3 mb-8" data-testid={`plan-features-${index}`}>
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-white text-primary hover:bg-gray-100' : 'bg-primary text-white hover:bg-primary/90'}`}
                    asChild
                    data-testid={`plan-button-${index}`}
                  >
                    <a 
// [removed chatbot-related line]
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Выбрать тариф
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white" data-testid="additional-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="additional-title">
              Дополнительные услуги
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto" data-testid="additional-description">
              Расширьте возможности вашего проекта с помощью дополнительных сервисов
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow" data-testid={`additional-service-${index}`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg" data-testid={`service-name-${index}`}>
                      {service.name}
                    </h3>
                    <Badge variant="secondary" data-testid={`service-price-${index}`}>
                      {service.price}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm" data-testid={`service-description-${index}`}>
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-neutral" data-testid="faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="faq-title">
              Часто задаваемые вопросы
            </h2>
          </div>
          
          <div className="space-y-6">
            {[
              {
// [removed chatbot-related line]
                answer: "Сроки зависят от сложности проекта: лендинг - 3-7 дней, корпоративный сайт - 2-4 недели, интернет-магазин - 4-8 недель."
              },
              {
                question: "Входит ли домен и хостинг в стоимость?",
                answer: "В тарифах 'Старт' и 'Профи' домен и хостинг включены на первый год. В дальнейшем стоимость составляет около 3,000₽/год."
              },
              {
                question: "Можно ли изменить сайт после сдачи проекта?",
                answer: "Да, мы предоставляем техподдержку и можем вносить изменения. Небольшие правки входят в техподдержку, крупные изменения оплачиваются отдельно."
              },
              {
// [removed chatbot-related line]
// [removed chatbot-related line]
              },
              {
                question: "Возможна ли оплата в рассрочку?",
                answer: "Да, мы предлагаем рассрочку для проектов от 30,000₽. Обычно это 50% предоплата и 50% по завершении проекта."
              }
            ].map((item, index) => (
              <Card key={index} data-testid={`faq-item-${index}`}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3" data-testid={`faq-question-${index}`}>
                    {item.question}
                  </h3>
                  <p className="text-gray-600" data-testid={`faq-answer-${index}`}>
                    {item.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white" data-testid="pricing-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" data-testid="cta-title">
            Не уверены, какой тариф выбрать?
          </h2>
          <p className="text-xl text-blue-100 mb-8" data-testid="cta-description">
            Получите бесплатную консультацию и персональное предложение
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild data-testid="cta-contact">
              <a href="/contact">
                Получить консультацию
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
                href="https://wa.me/79409435555?text=Здравствуйте,%20хочу%20получить%20консультацию%20по%20тарифам%20Smart%20360"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
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