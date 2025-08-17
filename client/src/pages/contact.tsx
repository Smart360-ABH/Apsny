import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ContactForm from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20" data-testid="contact-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="contact-title">
            Контакты
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto" data-testid="contact-description">
            Свяжитесь с нами любым удобным способом. Мы готовы обсудить ваш проект 
            и предложить лучшее решение для вашего бизнеса.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-neutral" data-testid="contact-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div data-testid="contact-form-section">
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Main Contact Info */}
              <Card data-testid="contact-info-card">
                <CardHeader>
                  <CardTitle data-testid="contact-info-title">Наши контакты</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4" data-testid="address-info">
                    <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Адрес офиса</h4>
                      <p className="text-gray-600">г. Сухум, ул. Эшба 166</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4" data-testid="phone-info">
                    <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Телефоны</h4>
                      <div className="space-y-1">
                        <p>
                          <a 
                            href="tel:+79407666644" 
                            className="text-primary hover:underline"
                            data-testid="phone-1"
                          >
                            +7 940 766-66-44
                          </a>
                          <span className="text-gray-500 text-sm ml-2">(основной)</span>
                        </p>
                        <p>
                          <a 
                            href="tel:+79409435555" 
                            className="text-primary hover:underline"
                            data-testid="phone-2"
                          >
                            +7 940 943-55-55
                          </a>
                          <span className="text-gray-500 text-sm ml-2">(дополнительный)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4" data-testid="email-info">
                    <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <a 
                        href="mailto:Service-abh@yandex.ru" 
                        className="text-primary hover:underline"
                        data-testid="email-link"
                      >
                        Service-abh@yandex.ru
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-testid="hours-info">
                    <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
// [removed chatbot-related line]
                      <div className="text-gray-600 space-y-1">
                        <p>Понедельник - Пятница: 9:00 - 18:00</p>
// [removed chatbot-related line]
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

// [removed chatbot-related line]
// [removed chatbot-related line]
                <CardHeader>
// [removed chatbot-related line]
                    <MessageCircle className="w-6 h-6 text-accent" />
// [removed chatbot-related line]
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full bg-accent text-white hover:bg-accent/90 justify-start"
                    asChild
// [removed chatbot-related line]
                  >
                    <a 
                      href="https://wa.me/79409435555?text=Здравствуйте,%20хочу%20узнать%20о%20решениях%20Smart%20360%20для%20моего%20бизнеса."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold">Написать +7 940 943-55-55</div>
                        <div className="text-sm text-green-100">Основной номер</div>
                      </div>
                    </a>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-accent text-accent hover:bg-accent hover:text-white justify-start"
                    asChild
// [removed chatbot-related line]
                  >
                    <a 
                      href="https://wa.me/79407666644?text=Здравствуйте,%20хочу%20узнать%20о%20решениях%20Smart%20360%20для%20моего%20бизнеса."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold">Написать +7 940 766-66-44</div>
                        <div className="text-sm opacity-70">Дополнительный номер</div>
                      </div>
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Map */}
              <Card data-testid="map-card">
                <CardHeader>
                  <CardTitle data-testid="map-title">Как нас найти</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center" data-testid="map-placeholder">
                    <img 
                      src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=320" 
                      alt="Карта расположения офиса Smart 360 в Сухуме" 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-3 text-center" data-testid="map-caption">
                    г. Сухум, ул. Эшба 166
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20 bg-white" data-testid="additional-info">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6" data-testid="additional-title">
            Удобные способы связи
          </h2>
          <p className="text-gray-600 mb-8" data-testid="additional-description">
            Выберите наиболее удобный для вас способ связи. Мы отвечаем быстро!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6" data-testid="communication-method-1">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Телефонный звонок</h3>
              <p className="text-sm text-gray-600">Мгновенная связь для срочных вопросов</p>
            </div>
            
            <div className="text-center p-6" data-testid="communication-method-2">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-accent" />
              </div>
// [removed chatbot-related line]
              <p className="text-sm text-gray-600">Удобное общение в любое время</p>
            </div>
            
            <div className="text-center p-6" data-testid="communication-method-3">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="font-semibold mb-2">Email переписка</h3>
              <p className="text-sm text-gray-600">Для детального обсуждения проектов</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}