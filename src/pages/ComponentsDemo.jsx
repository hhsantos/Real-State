import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Modal,
  ModalFooter,
  Tooltip,
  Skeleton,
  SkeletonText,
  SkeletonCard,
} from '../components/ui';
import { useModal } from '../hooks/useModal';
import { useToast } from '../hooks/useToast';
import Toast from '../components/ui/Toast';
import { Info } from '@/components/icons';

/**
 * Components Demo Page
 * Showcases all accessible UI components
 */

export default function ComponentsDemo() {
  // Form states
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal state
  const { isOpen, open, close } = useModal();

  // Toast state
  const { toasts, showToast, removeToast } = useToast();

  const selectOptions = [
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' },
    { value: 'option3', label: 'Opción 3' },
  ];

  const radioOptions = [
    { value: 'radio1', label: 'Radio 1', description: 'Primera opción' },
    { value: 'radio2', label: 'Radio 2', description: 'Segunda opción' },
    { value: 'radio3', label: 'Radio 3', description: 'Tercera opción' },
  ];

  const handleLoadingButton = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Componentes UI - Real State</title>
        <meta name="description" content="Demostración de componentes UI accesibles" />
      </Helmet>

      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Componentes UI</h1>
            <p className="text-gray-600">
              Demostración de todos los componentes accesibles siguiendo AGENTS.md
            </p>
          </div>

          {/* Buttons */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Buttons</h2>
            <Card>
              <CardBody>
                <div className="flex flex-wrap gap-4">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                  <Button loading={loading} onClick={handleLoadingButton}>
                    {loading ? 'Loading...' : 'Click to Load'}
                  </Button>
                  <Button disabled>Disabled</Button>
                </div>
              </CardBody>
            </Card>
          </section>

          {/* Inputs */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Form Controls</h2>
            <Card>
              <CardBody className="space-y-6">
                {/* Input */}
                <Input
                  label="Input Field"
                  placeholder="Escribe algo…"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  helperText="Este es un texto de ayuda"
                />

                {/* Input with error */}
                <Input
                  label="Input con Error"
                  error="Este campo es obligatorio"
                  required
                />

                {/* Textarea */}
                <Textarea
                  label="Textarea"
                  placeholder="Escribe un mensaje…"
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  rows={4}
                  maxLength={200}
                  showCount
                  helperText="Usa ⌘/Ctrl+Enter para enviar"
                />

                {/* Select */}
                <Select
                  label="Select"
                  value={selectValue}
                  onChange={setSelectValue}
                  options={selectOptions}
                  helperText="Selecciona una opción"
                />

                {/* Checkbox */}
                <Checkbox
                  label="Checkbox"
                  description="Acepto los términos y condiciones"
                  checked={checkboxValue}
                  onChange={(e) => setCheckboxValue(e.target.checked)}
                />

                {/* Radio Group */}
                <RadioGroup
                  name="radio-demo"
                  label="Radio Group"
                  value={radioValue}
                  onChange={setRadioValue}
                  options={radioOptions}
                />
              </CardBody>
            </Card>
          </section>

          {/* Modal */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Modal</h2>
            <Card>
              <CardBody>
                <Button onClick={open}>Abrir Modal</Button>
                
                <Modal
                  open={isOpen}
                  onClose={close}
                  title="Título del Modal"
                  description="Este es un modal accesible con focus trap"
                >
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Este modal sigue las mejores prácticas de accesibilidad:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                      <li>Focus trap activado</li>
                      <li>Escape cierra el modal</li>
                      <li>Focus retorna al trigger</li>
                      <li>overscroll-behavior: contain</li>
                    </ul>
                  </div>
                  
                  <ModalFooter>
                    <Button variant="outline" onClick={close}>
                      Cancelar
                    </Button>
                    <Button onClick={close}>
                      Aceptar
                    </Button>
                  </ModalFooter>
                </Modal>
              </CardBody>
            </Card>
          </section>

          {/* Toasts */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Toast Notifications</h2>
            <Card>
              <CardBody>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => showToast({
                      title: 'Success',
                      message: 'Operación completada con éxito',
                      type: 'success',
                    })}
                  >
                    Success Toast
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => showToast({
                      title: 'Error',
                      message: 'Ha ocurrido un error',
                      type: 'error',
                    })}
                  >
                    Error Toast
                  </Button>
                  <Button
                    onClick={() => showToast({
                      title: 'Warning',
                      message: 'Ten cuidado con esta acción',
                      type: 'warning',
                    })}
                  >
                    Warning Toast
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => showToast({
                      title: 'Info',
                      message: 'Esta es una información útil',
                      type: 'info',
                    })}
                  >
                    Info Toast
                  </Button>
                </div>
              </CardBody>
            </Card>
          </section>

          {/* Tooltip */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Tooltip</h2>
            <Card>
              <CardBody>
                <div className="flex flex-wrap gap-8">
                  <Tooltip content="Tooltip arriba" position="top">
                    <Button variant="outline">
                      <Info className="h-4 w-4 mr-2" />
                      Top
                    </Button>
                  </Tooltip>
                  <Tooltip content="Tooltip derecha" position="right">
                    <Button variant="outline">
                      <Info className="h-4 w-4 mr-2" />
                      Right
                    </Button>
                  </Tooltip>
                  <Tooltip content="Tooltip abajo" position="bottom">
                    <Button variant="outline">
                      <Info className="h-4 w-4 mr-2" />
                      Bottom
                    </Button>
                  </Tooltip>
                  <Tooltip content="Tooltip izquierda" position="left">
                    <Button variant="outline">
                      <Info className="h-4 w-4 mr-2" />
                      Left
                    </Button>
                  </Tooltip>
                </div>
              </CardBody>
            </Card>
          </section>

          {/* Skeletons */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Skeleton Loaders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Skeleton Text</h3>
                </CardHeader>
                <CardBody>
                  <SkeletonText lines={3} />
                </CardBody>
              </Card>
              
              <SkeletonCard />
            </div>
          </section>

          {/* Cards */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card hoverable>
                <CardHeader>
                  <h3 className="font-semibold">Card con Header</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-600">
                    Este es el contenido del card. Puede contener cualquier cosa.
                  </p>
                </CardBody>
                <CardFooter>
                  <Button size="sm">Acción</Button>
                </CardFooter>
              </Card>

              <Card hoverable>
                <CardBody>
                  <h3 className="font-semibold mb-2">Card Simple</h3>
                  <p className="text-gray-600">
                    Card sin header ni footer, solo con contenido.
                  </p>
                </CardBody>
              </Card>
            </div>
          </section>
        </div>
      </div>

      {/* Toast Container */}
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