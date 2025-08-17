import { Link } from "wouter";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold text-white mb-4" data-testid="footer-logo">Smart 360</div>
            <p className="text-gray-300 mb-4" data-testid="footer-description">
// [removed chatbot-related line]
              интегрируем с Яндекс.Картами и предоставляем полный цикл цифровых услуг.
            </p>
            <div className="text-sm text-gray-400 space-y-1" data-testid="footer-contact-info">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>г. Сухум, ул. Эшба 166</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>
                  <a href="tel:+79407666644" className="hover:text-white" data-testid="footer-phone-1">+7 940 766-66-44</a>,{" "}
                  <a href="tel:+79409435555" className="hover:text-white" data-testid="footer-phone-2">+7 940 943-55-55</a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:Service-abh@yandex.ru" className="hover:text-white" data-testid="footer-email">
                  Service-abh@yandex.ru
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4" data-testid="footer-services-title">Услуги</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/services" data-testid="footer-service-websites"><a className="hover:text-white">Создание сайтов</a></Link></li>
// [removed chatbot-related line]
              <li><Link href="/services" data-testid="footer-service-maps"><a className="hover:text-white">Яндекс.Карты</a></Link></li>
              <li><Link href="/services" data-testid="footer-service-tours"><a className="hover:text-white">Виртуальные туры</a></Link></li>
              <li><Link href="/services" data-testid="footer-service-instagram"><a className="hover:text-white">Реклама Instagram</a></Link></li>
              <li><Link href="/services" data-testid="footer-service-content"><a className="hover:text-white">Тексты и планы</a></Link></li>
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4" data-testid="footer-contact-title">Связь</h4>
            <div className="space-y-3">
              <a 
                href="https://wa.me/79409435555?text=Здравствуйте,%20хочу%20узнать%20о%20решениях%20Smart%20360%20для%20моего%20бизнеса."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors text-sm gap-2"
// [removed chatbot-related line]
              >
                <MessageCircle className="w-4 h-4" />
// [removed chatbot-related line]
              </a>
              <a 
                href="mailto:Service-abh@yandex.ru"
                className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm gap-2"
                data-testid="footer-email-button"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
              <a 
                href="tel:+79409435555"
                className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm gap-2"
                data-testid="footer-call-button"
              >
                <Phone className="w-4 h-4" />
                Позвонить
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm" data-testid="footer-copyright">
          <p>&copy; 2024 Smart 360. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}