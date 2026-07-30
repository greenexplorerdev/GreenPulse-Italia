  import { memo } from "react";

  export default memo(function EnergySourceItem({ name, icon, value, unit, type }) {
    return (
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <p className="font-medium dark:text-gray-100">{name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {value} {unit}
            </p>
          </div>
        </div>
        <div
          aria-label="Energy-indicator"
          className={`w-3 h-3 rounded-full ${
            type === "renewable" ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
      </div>
    );
  });
