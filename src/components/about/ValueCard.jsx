export default function ValueCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
      <div className="text-5xl mb-4" aria-hidden="true">
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-3 text-gray-900">{title}</h4>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
