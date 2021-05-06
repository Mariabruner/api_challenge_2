const key = "EUgijo5Du7IBTWLZJ1E3fMhb8PCnVbvuHKoerj7T"
const weatherURL = `https://api.nasa.gov/insight_weather/?api_key=${key}&feedtype=json&ver=1.0`
const imageURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${key}`

let backButton = document.getElementById("back-button")
let forwardButton = document.getElementById("forward-button")

let dayTracker = 1


const getData = (dayTracker, imageURL) =>
    fetch(weatherURL)
        .then(res => res.json())
        .then(json => {


            let newPicture = document.createElement("IMG")
            newPicture.srcset = imageURL
            newPicture.type= "image/jpeg"
            newPicture.style.width= `300px`
            newPicture.style.height= `auto`
            document.getElementById("rover-picture").appendChild(newPicture)

            let days = json.sol_keys

            while (1) {
                if (dayTracker < 1 || dayTracker > days.length) {
                    document.getElementById("no-results").innerHTML = "There are no more availble days to display today"
                    break
                }
               
                displayData(json, days, days.length - dayTracker)
                break
            }
        })

const getImage = (dayTracker) =>
    fetch(imageURL)
        .then(res => res.json())
        .then(json => {

            let index = Math.floor(Math.random()*856)
            let image = json.photos[index].img_src

            getData(dayTracker, image)
        })

getImage(dayTracker)

const displayData = (json, days, index) => {
    document.getElementById("no-results").innerHTML = ""
    if ('PRE' in json[days[index]]) {
        document.getElementById("pressure").innerHTML = `The average pressure today is ${json[days[index]].PRE.av} Pa `
    }
    if ('AT' in json[days[index]]) {
        document.getElementById("temperature").innerHTML = `The average pressure today is ${json[days[index]].AT.av} °F`
    } else {
        document.getElementById("temperature").innerHTML = `There is no temperature data available for today!`
    }
    if ('HWS' in json[days[index]]) {
        document.getElementById("wind").innerHTML = `The average wind speed today is ${json[days[index]].HWS.av} m/s`
    } else {
        document.getElementById("wind").innerHTML = `There is no wind data available for today!`
    }
}

const goBack = () => {
    dayTracker = dayTracker + 1;
    getData(dayTracker)
}

const goForward = () => {
    dayTracker = dayTracker - 1;
    getData(dayTracker)
}

backButton.addEventListener("click", goBack)
forwardButton.addEventListener("click", goForward)