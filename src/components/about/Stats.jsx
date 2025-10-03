import { useEffect, useRef, useState } from 'react';

function StatCounter({ end, duration = 2000, label, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-bold mb-2 font-variant-numeric-tabular">
        {count}{suffix}
      </div>
      <div className="text-xl opacity-90">{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <StatCounter end={29} label="Años de Experiencia" />
      <StatCounter end={50} suffix="+" label="Proyectos Completados" />
      <StatCounter end={2000} suffix="+" label="Viviendas Entregadas" />
      <StatCounter end={2000} suffix="+" label="Familias Satisfechas" />
    </div>
  );
}
