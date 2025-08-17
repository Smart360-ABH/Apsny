import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, MapPin, Phone, Mail } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
// [removed chatbot-related line]
  phoneNumber: string;
}

export default function ServiceCard({ 
  title, 
  description, 
  image, 
  imageAlt, 
// [removed chatbot-related line]
  phoneNumber 
}: ServiceCardProps) {
  return (
    <Card className="card-hover overflow-hidden" data-testid={`service-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <img 
        src={image} 
        alt={imageAlt} 
        className="w-full h-48 object-cover"
        data-testid={`service-image-${title.toLowerCase().replace(/\s+/g, '-')}`}
      />
      <CardContent className="p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4" data-testid={`service-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h3>
        <p className="text-gray-600 mb-6" data-testid={`service-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {description}
        </p>
        
        <div className="text-sm text-gray-500 mb-4 space-y-1" data-testid={`service-contact-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>г. Сухум, ул. Эшба 166</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <a href={`tel:${phoneNumber}`} className="text-primary hover:underline">
              {phoneNumber}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <a href="mailto:Service-abh@yandex.ru" className="text-primary hover:underline">
              Service-abh@yandex.ru
            </a>
          </div>
        </div>
        
        <Button 
          className="bg-accent text-white hover:bg-accent/90 w-full"
          asChild
          data-testid={`service-order-button-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <a 
// [removed chatbot-related line]
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
// [removed chatbot-related line]
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}