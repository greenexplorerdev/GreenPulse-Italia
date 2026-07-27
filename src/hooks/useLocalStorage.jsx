import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [storage, setStorage] = useState(() => {
    try {
      //lettura del local storage attraverso la key che diventa il valore iniziale al primo render
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(
        `Errore nella lettura della chiave localStorage "${key}":`,
        error,
      );
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      
   /*  useLocalStorage vuole comportarsi esattamente come useState, quindi deve accettare sia un valore che una funzione:
  - Se value è un valore qualsiasi (stringa, numero, oggetto, …) → lo salva così com’è.
  - Se value è una funzione → la esegue passando lo stato corrente (storage) 
    e usa il valore restituito dalla funzione come nuovo stato da salvare.
   */
      const valueToStore = value instanceof Function ? value(storage) : value;

      setStorage(valueToStore);
      //scrittura persistente dentro al local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(
        `Errore nell'impostazione della chiave localStorage "${key}":`,
        error,
      );
    }
  };

  return [storage, setValue];
}
