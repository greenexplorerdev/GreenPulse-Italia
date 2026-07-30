export default function EnergyCard({ title, icon, unit, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700 p-4 hover:shadow-lg transition-shadow duration-300 w-full h-full dark:border-gray-600 ">
      <div className="flex  items-center justify-between mb-4 text-center">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{unit}</p>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-700 dark:text-gray-300 min-h-15 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
