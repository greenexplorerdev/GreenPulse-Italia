export default function CO2Indicator({value}) {
    return(
        <div className="flex  items-center mx-auto justify-center  rounded-2xl h-fit w-fit p-8">
      {value < 100 ? (
        <p className="bg-green-600 text-cyan-600  text-center rounded-full p-2">
          🟢 Energia pulita
        </p>
      ) : value >= 100 && value <= 300 ? (
        <p className="bg-yellow-600 text-green-700   text-center rounded-full p-2">
         🟡 Emissioni moderate
        </p>
      ) : (
        <p className="bg-red-500 text-black  text-center rounded-full p-2 ">
         🔴 Alta intensità carbonica 💀
        </p>
      )}
    </div>
    )
}