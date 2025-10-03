import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Textarea, Select, Checkbox, Button } from '../ui';
import { VALIDATION_MESSAGES } from '../../utils/constants';
import { useState } from 'react';

/**
 * ContactForm Component
 * Follows AGENTS.md requirements:
 * - React Hook Form for performance
 * - Zod for validation
 * - Inline errors
 * - Loading states
 * - Never blocks paste
 * - Autocomplete attributes
 */

// Validation schema
const contactSchema = z.object({
  name: z.string()
    .min(2, VALIDATION_MESSAGES.MIN_LENGTH(2))
    .max(100, VALIDATION_MESSAGES.MAX_LENGTH(100)),
  email: z.string()
    .email(VALIDATION_MESSAGES.EMAIL),
  phone: z.string()
    .min(9, 'Por favor, introduce un teléfono válido')
    .regex(/^[0-9+\s()-]+$/, 'Por favor, introduce un teléfono válido'),
  subject: z.string()
    .min(1, VALIDATION_MESSAGES.REQUIRED),
  message: z.string()
    .min(10, VALIDATION_MESSAGES.MIN_LENGTH(10))
    .max(1000, VALIDATION_MESSAGES.MAX_LENGTH(1000)),
  propertyInterest: z.string().optional(),
  acceptPrivacy: z.boolean()
    .refine(val => val === true, 'Debes aceptar la política de privacidad'),
});

export default function ContactForm({ propertyId, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      propertyInterest: propertyId || '',
      acceptPrivacy: false,
    },
  });

  const messageValue = watch('message');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form data:', data);
    
    setIsSubmitting(false);
    
    if (onSuccess) {
      onSuccess(data);
    }
    
    reset();
  };

  const subjectOptions = [
    { value: '', label: 'Selecciona un asunto…' },
    { value: 'information', label: 'Solicitar información' },
    { value: 'visit', label: 'Agendar visita' },
    { value: 'quote', label: 'Solicitar presupuesto' },
    { value: 'other', label: 'Otro' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <Input
        label="Nombre completo"
        {...register('name')}
        error={errors.name?.message}
        required
        autoComplete="name"
        placeholder="Tu nombre"
      />

      {/* Email */}
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        required
        autoComplete="email"
        placeholder="tu@email.com"
      />

      {/* Phone */}
      <Input
        label="Teléfono"
        type="tel"
        {...register('phone')}
        error={errors.phone?.message}
        required
        autoComplete="tel"
        placeholder="+34 600 000 000"
        helperText="Incluye el prefijo del país"
      />

      {/* Subject */}
      <Select
        label="Asunto"
        {...register('subject')}
        error={errors.subject?.message}
        options={subjectOptions}
        required
      />

      {/* Property Interest (optional) */}
      {!propertyId && (
        <Input
          label="Promoción de interés (opcional)"
          {...register('propertyInterest')}
          placeholder="Nombre de la promoción"
          helperText="Si tienes interés en alguna promoción específica"
        />
      )}

      {/* Message */}
      <Textarea
        label="Mensaje"
        {...register('message')}
        error={errors.message?.message}
        required
        rows={6}
        maxLength={1000}
        showCount
        placeholder="Cuéntanos en qué podemos ayudarte…"
        value={messageValue}
        onSubmit={handleSubmit(onSubmit)}
      />

      {/* Privacy Policy */}
      <Checkbox
        {...register('acceptPrivacy')}
        label="Acepto la política de privacidad"
        description={
          <span className="text-sm">
            He leído y acepto la{' '}
            <a
              href="/privacidad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              política de privacidad
            </a>
          </span>
        }
        error={errors.acceptPrivacy?.message}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        loading={isSubmitting}
        disabled={isSubmitting}
        className="w-full"
        size="lg"
      >
        {isSubmitting ? 'Enviando…' : 'Enviar mensaje'}
      </Button>

      <p className="text-sm text-gray-500 text-center">
        Nos pondremos en contacto contigo lo antes posible
      </p>
    </form>
  );
}