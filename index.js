const key = "EUgijo5Du7IBTWLZJ1E3fMhb8PCnVbvuHKoerj7T"
const URL = `https://api.nasa.gov/insight_weather/?api_key=${key}&feedtype=json&ver=1.0`

fetch(URL)
    .then(res => res.json())
    .then(json => {
        let days = json.sol_keys
        console.log(days)
        console.log(json)

        
        const displayData = (index) => {
        if('PRE' in json[days[index]]){
        document.getElementById("pressure").innerHTML= `The average pressure today is ${json[days[index]].PRE.av} Pa `
        }
        if('AT' in json[days[index]]){
            document.getElementById("temperature").innerHTML = `The average pressure today is ${json[days[index]].AT.av} °F`
        } else {
            document.getElementById("temperature").innerHTML = `There is no temperature available for today! Good luck!`
        }
        if('HWS' in json[days[index]]){
            document.getElementById("wind").innerHTML = `The average wind speed today is ${json[days[index]].HWS.av} m/s`
        } else {
            document.getElementById("wind").innerHTML = `There is no wind data available for today!`
        }
    }

    displayData(days.length-1)
})

