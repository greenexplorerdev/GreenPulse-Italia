async function weatherApi(latitude,longitude) {
const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=shortwave_radiation&timezone=Europe/Rome&forecast_days=1`    

const response = await fetch(url)

if (!response.ok) {
    throw new Error(`Errore nella richiesta dell'API Meteo: ${response.status}`);
}

return response.json()

}

export default weatherApi