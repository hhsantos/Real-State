import { useState } from 'react';
import './Contacto.css';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
    acepto: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Warn on unsaved changes before navigation
  useState(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges && !submitSuccess) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges, submitSuccess]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    setHasUnsavedChanges(true);

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Trim values to handle text expansion trailing spaces
    const nombre = formData.nombre.trim();
    const email = formData.email.trim();
    const telefono = formData.telefono.trim();
    const mensaje = formData.mensaje.trim();

    if (!nombre) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!telefono) {
      newErrors.telefono = 'El teléfono es obligatorio';
    } else if (!/^[+]?[\d\s()-]{9,}$/.test(telefono)) {
      newErrors.telefono = 'El teléfono no es válido';
    }

    if (!mensaje) {
      newErrors.mensaje = 'El mensaje es obligatorio';
    } else if (mensaje.length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    if (!formData.acepto) {
      newErrors.acepto = 'Debe aceptar la política de privacidad';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Allow submitting incomplete forms to surface validation
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      
      // On submit, focus first error
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.focus();
      }
      
      return;
    }

    // Keep submit enabled until request starts
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setHasUnsavedChanges(false);
      
      // Reset form
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: '',
        acepto: false
      });

      // Show success message for 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);

    } catch (error) {
      setErrors({ submit: 'Ha ocurrido un error. Por favor, inténtelo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enter submits focused text input; in textarea, Cmd/Ctrl+Enter submits
  const handleKeyDown = (e) => {
    if (e.target.name === 'mensaje') {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        handleSubmit(e);
      }
    }
  };

  return (
    <div className="contacto-page">
      <section className="contacto-hero">
        <div className="container">
          <h1>Contacto</h1>
          <p className="hero-subtitle">
            Estamos aquí para ayudarle a encontrar su hogar ideal
          </p>
        </div>
      </section>

      <section className="contacto-content">
        <div className="container">
          <div className="contacto-grid">
            <div className="contacto-info">
              <h2>Información de contacto</h2>
              
              <div className="info-item">
                <div className="info-icon" aria-hidden="true">📍</div>
                <div>
                  <h3>Dirección</h3>
                  <p>
                    Calle Principal, 123<br />
                    28001 Madrid, España
                  </p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon" aria-hidden="true">📞</div>
                <div>
                  <h3>Teléfono</h3>
                  <p>
                    <a href="tel:+34912345678">+34&nbsp;91&nbsp;234&nbsp;56&nbsp;78</a>
                  </p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon" aria-hidden="true">✉️</div>
                <div>
                  <h3>Email</h3>
                  <p>
                    <a href="mailto:info@alisi.com">info@alisi.com</a>
                  </p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon" aria-hidden="true">🕐</div>
                <div>
                  <h3>Horario</h3>
                  <p>
                    Lunes a Viernes: 9:00&nbsp;–&nbsp;19:00<br />
                    Sábados: 10:00&nbsp;–&nbsp;14:00
                  </p>
                </div>
              </div>
            </div>

            <div className="contacto-form-wrapper">
              <h2>Envíenos un mensaje</h2>
              
              {submitSuccess && (
                <div 
                  className="success-message" 
                  role="status" 
                  aria-live="polite"
                >
                  ✓ Mensaje enviado correctamente. Nos pondremos en contacto con usted pronto.
                </div>
              )}

              <form 
                className="contacto-form" 
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="form-group">
                  <label htmlFor="nombre">
                    Nombre completo <span aria-label="obligatorio">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder="Juan Pérez…"
                    aria-invalid={errors.nombre ? 'true' : 'false'}
                    aria-describedby={errors.nombre ? 'nombre-error' : undefined}
                    required
                  />
                  {errors.nombre && (
                    <span 
                      id="nombre-error" 
                      className="error-message" 
                      role="alert"
                    >
                      {errors.nombre}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email <span aria-label="obligatorio">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    spellCheck="false"
                    placeholder="juan.perez@ejemplo.com…"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    required
                  />
                  {errors.email && (
                    <span 
                      id="email-error" 
                      className="error-message" 
                      role="alert"
                    >
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">
                    Teléfono <span aria-label="obligatorio">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+34 912 345 678…"
                    aria-invalid={errors.telefono ? 'true' : 'false'}
                    aria-describedby={errors.telefono ? 'telefono-error' : undefined}
                    required
                  />
                  {errors.telefono && (
                    <span 
                      id="telefono-error" 
                      className="error-message" 
                      role="alert"
                    >
                      {errors.telefono}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="asunto">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Información sobre promociones…"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">
                    Mensaje <span aria-label="obligatorio">*</span>
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    rows="6"
                    placeholder="Escriba su mensaje aquí…"
                    aria-invalid={errors.mensaje ? 'true' : 'false'}
                    aria-describedby={errors.mensaje ? 'mensaje-error mensaje-help' : 'mensaje-help'}
                    required
                  />
                  <span id="mensaje-help" className="help-text">
                    En textarea, ⌘/Ctrl&nbsp;+&nbsp;Enter envía el formulario
                  </span>
                  {errors.mensaje && (
                    <span 
                      id="mensaje-error" 
                      className="error-message" 
                      role="alert"
                    >
                      {errors.mensaje}
                    </span>
                  )}
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="acepto"
                      checked={formData.acepto}
                      onChange={handleChange}
                      aria-invalid={errors.acepto ? 'true' : 'false'}
                      aria-describedby={errors.acepto ? 'acepto-error' : undefined}
                      required
                    />
                    <span className="checkbox-text">
                      He leído y acepto la{' '}
                      <a 
                        href="/privacidad" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        política de privacidad
                      </a>{' '}
                      <span aria-label="obligatorio">*</span>
                    </span>
                  </label>
                  {errors.acepto && (
                    <span 
                      id="acepto-error" 
                      className="error-message" 
                      role="alert"
                    >
                      {errors.acepto}
                    </span>
                  )}
                </div>

                {errors.submit && (
                  <div className="error-message submit-error" role="alert">
                    {errors.submit}
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" aria-hidden="true"></span>
                      Enviar mensaje
                    </>
                  ) : (
                    'Enviar mensaje'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
