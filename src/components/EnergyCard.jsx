export default function EnergyCard({ title, icon, unit, children }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 ">
      <div className="flex  items-center justify-between mb-4 text-center">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">{unit}</p>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-700 min-h-15 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
