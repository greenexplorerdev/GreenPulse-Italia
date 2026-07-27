function weatherApi(latitude, longitude) {
  //restituendo una funzione posso passarla a usefetch
  return async function fetchWeatherData(signal) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=shortwave_radiation&timezone=auto`;
    const response = await fetch(url, { signal });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Errore nella richiesta dell'API Meteo: ${response.status}- ${errorText.substring(0, 100)}`,
      );
    }

    return response.json();
  };
}
export default weatherApi;
