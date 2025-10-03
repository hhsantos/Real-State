export default function TeamMember({ name, position, image, description }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square overflow-hidden bg-gray-200">
        <img
          src={image}
          alt={`${name}, ${position}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-blue-600 font-medium mb-3">{position}</p>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
