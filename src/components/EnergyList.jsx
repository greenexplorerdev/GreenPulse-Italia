  import EnergySourceItem from "./EnergySourceItem";
        
  export default function EnergyList({ sources }) {
    if (!sources || sources.length === 0) {
      return (
        <p className="text-center text-gray-500 py-8">
          Nessuna fonte disponibile
        </p>
      );
    } 

    return (
      <div className="space-y-4">
        {sources.map(source => (
          <EnergySourceItem
            key={source.id}
            name={source.name}
            icon={source.icon}
            value={source.value}
            unit={source.unit}
            type={source.type}
          />
        ))}
      </div>
    );
  }
