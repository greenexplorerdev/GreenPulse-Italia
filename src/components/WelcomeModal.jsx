import { useState } from "react";

// Step del tutorial
const steps = [
  {
    icon: "🌱",
    title: "Benvenuto in GreenPulse Italia",
    body: "GreenPulse ti mostra in tempo reale quanto è verde l'energia che stai consumando. Seleziona la tua regione, cerca la tua città e scopri dati su irraggiamento solare, CO₂ e mix energetico.",
  },
  {
    icon: "⚡",
    title: "Filtra le fonti energetiche",
    body: "Usa i pulsanti Tutte / Rinnovabili / Fossili per filtrare la lista delle fonti energetiche. Verde = rinnovabile, rosso = fossile.",
  },
  {
    icon: "📊",
    title: "Leggi i grafici",
    body: "I tre grafici mostrano: irraggiamento solare nelle ore del giorno, intensità di CO₂ nella rete (meno è meglio), produzione solare settimanale. Passa il mouse sopra ogni barra o punto per vedere il valore esatto.",
  },
  {
    icon: "🌙",
    title: "Dark mode",
    body: "Usa il pulsante in basso a destra per passare dalla modalità chiara a quella scura. La preferenza non viene salvata tra sessioni — puoi cambiarla in qualsiasi momento.",
  },
];

export default function WelcomeModal() {
  const [open, setOpen] = useState(() => {
    return !localStorage.getItem("greenpulse-tutorial-seen");
  });
  const [step, setStep] = useState(0);

  function handleNext() {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      handleClose();
    }
  }

  function handlePrev() {
    setStep((s) => s - 1);
  }

  function handleClose() {
    localStorage.setItem("greenpulse-tutorial-seen", "true");
    setOpen(false);
  }

  if (!open) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setOpen(true)}
          className="relative pl-2 pr-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors shadow-lg focus:ring-2 focus-ring-emerald-300 focus:outline-none  hover:scale-110"
          aria-label="Apri guida introduttiva"
          title="Guida introduttiva - Clicca per iniziare il tutorial"
        >
          <span className=" p-2 absolute -top-2 -left-2 flex h-3 w-3 items-center justify-center bg-red-500 text-xs font-bold text-white rounded-full animate-pulse">
            !
          </span>
          <span className=" mx-auto p-2 block text-lg">?</span>
        </button>
      </div>
    );
  }

  const current = steps[step];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-bold"
          aria-label="Chiudi tutorial"
        >
          ×
        </button>

        <div className="text-center mb-6">
          <div className="text-5xl mb-4">{current.icon}</div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
            {current.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {current.body}
          </p>
        </div>

        <div className="flex justify-center gap-1.5 mb-5">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === step
                  ? "w-6 bg-emerald-500"
                  : "w-1.5 bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`Vai allo step ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          {step > 0 && (
            <button
              onClick={handlePrev}
              className="flex-1 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              ← Indietro
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            {step < steps.length - 1 ? "Avanti →" : "Inizia →"}
          </button>
        </div>

        {step < steps.length - 1 && (
          <button
            onClick={handleClose}
            className="w-full mt-2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            Salta il tutorial
          </button>
        )}
      </div>
    </div>
  );
}
