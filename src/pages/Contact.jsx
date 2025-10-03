import { Helmet } from 'react-helmet-async';
import { Card, CardBody } from '../components/ui';
import ContactForm from '../components/forms/ContactForm';
import { COMPANY_INFO } from '../utils/constants';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import Toast from '../components/ui/Toast';

/**
 * Contact Page
 * Follows AGENTS.md requirements:
 * - Accessible form with validation
 * - Clear contact information
 * - Success feedback (toast)
 * - No dead ends
 */

export default function Contact() {
  const { toasts, showToast, removeToast } = useToast();

  const handleFormSuccess = () => {
    showToast({
      title: '¡Mensaje enviado!',
      message: 'Nos pondremos en contacto contigo pronto',
      type: 'success',
      duration: 5000,
    });
  };

  return (
    <>
      <Helmet>
        <title>Contacto - ALISI</title>
        <meta
          name="description"
          content={`Contacta con ${COMPANY_INFO.NAME}. Estamos aquí para ayudarte a encontrar tu hogar ideal. Teléfono, email y ubicación.`}
        />
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <section className="bg-primary-600 text-white py-12 md:py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacto</h1>
            <p className="text-xl text-primary-100 max-w-2xl">
              ¿Tienes alguna pregunta? Estamos aquí para ayudarte. 
              Contacta con nosotros y te responderemos lo antes posible.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardBody>
                    <h2 className="text-2xl font-bold mb-6">
                      Envíanos un mensaje
                    </h2>
                    <ContactForm onSuccess={handleFormSuccess} />
                  </CardBody>
                </Card>
              </div>

              {/* Contact Info */}
              <aside className="space-y-6">
                {/* Contact Details */}
                <Card>
                  <CardBody className="space-y-4">
                    <h3 className="text-xl font-bold mb-4">
                      Información de contacto
                    </h3>

                    <div className="space-y-4">
                      {/* Phone */}
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100 flex-shrink-0">
                          <Phone className="h-5 w-5 text-primary-600" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Teléfono</p>
                          <a
                            href={`tel:${COMPANY_INFO.PHONE}`}
                            className="font-medium text-gray-900 hover:text-primary-600 transition-colors"
                          >
                            {COMPANY_INFO.PHONE}
                          </a>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100 flex-shrink-0">
                          <Mail className="h-5 w-5 text-primary-600" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Email</p>
                          <a
                            href={`mailto:${COMPANY_INFO.EMAIL}`}
                            className="font-medium text-gray-900 hover:text-primary-600 transition-colors break-all"
                          >
                            {COMPANY_INFO.EMAIL}
                          </a>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100 flex-shrink-0">
                          <MapPin className="h-5 w-5 text-primary-600" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Dirección</p>
                          <p className="font-medium text-gray-900">
                            {COMPANY_INFO.ADDRESS}
                          </p>
                        </div>
                      </div>

                      {/* Hours */}
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100 flex-shrink-0">
                          <Clock className="h-5 w-5 text-primary-600" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Horario</p>
                          <p className="font-medium text-gray-900">
                            Lunes a Viernes
                          </p>
                          <p className="text-sm text-gray-600">
                            9:00 - 14:00 / 16:00 - 19:00
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Help Card */}
                <Card className="bg-primary-50 border-primary-200">
                  <CardBody>
                    <h3 className="font-semibold text-primary-900 mb-2">
                      ¿Necesitas ayuda inmediata?
                    </h3>
                    <p className="text-sm text-primary-800 mb-4">
                      Si prefieres hablar directamente con nosotros, 
                      llámanos durante nuestro horario de atención.
                    </p>
                    <a
                      href={`tel:${COMPANY_INFO.PHONE}`}
                      className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                    >
                      <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                      Llamar ahora
                    </a>
                  </CardBody>
                </Card>

                {/* FAQ Hint */}
                <Card>
                  <CardBody>
                    <h3 className="font-semibold mb-2">
                      Preguntas frecuentes
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Antes de contactarnos, puedes consultar nuestras 
                      preguntas frecuentes. Quizás encuentres la respuesta 
                      que buscas.
                    </p>
                    <p className="text-sm text-gray-500">
                      Próximamente disponible
                    </p>
                  </CardBody>
                </Card>
              </aside>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">
                Estamos aquí para ayudarte
              </h2>
              <p className="text-gray-600 leading-relaxed">
                En {COMPANY_INFO.NAME} valoramos cada consulta. Nuestro equipo 
                de profesionales está disponible para resolver todas tus dudas 
                y ayudarte a encontrar el hogar perfecto para ti y tu familia.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Toast notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          show={toast.show}
          onClose={() => removeToast(toast.id)}
          {...toast}
        />
      ))}
    </>
  );
}