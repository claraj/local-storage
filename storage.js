// Check to see if localstorage is available 
if (typeof(Storage) == "undefined") {
    alert('Sorry, your browser does not support local storage')
    throw new Error()   // stops script badly and hackily. 
}

let inputHours = document.querySelector('#hours')
let button = document.querySelector('#addHours')
let savedTimesList = document.querySelector('#savedTimes')

// get the saved times, display in the ul
let times = getSavedTimes() 
displayTimesInList(times, savedTimesList)

const LOCAL_STORAGE_KEY = 'savedTimes'

button.addEventListener('click', function() {
    // save time entered 
    // store in localstorage
    // refresh list of times 

    let timeNow = new Date() 
    let hoursPlayed = inputHours.value  //todo validation

    saveTime(timeNow, hoursPlayed)
    displayTimesInList()
})


// get the string associated with LOCAL_STORAGE_KEY,
// parse it into a JavaScript object.
function getSavedTimes() {
    let string = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (string) {
        return JSON.parse(string)
    }
}


// Get the data from LOCAL_STORAGE_KEY as an array
// add a new time object to it 
// save the new array back to local storage 
function saveTime(time, hours) {
    let times = getSavedTimes() 
    if (!times) { times = [] }
    times.push( { time: time, hours: hours })
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(times))
}

function displayTimesInList() {
    
    savedTimesList.innerHTML = ''  // clear list 
    let times = getSavedTimes() 
    if (times) {
        times.forEach(function (timeob) {
            let li = document.createElement('li')
            let date = new Date(timeob.time)
            let hours = timeob.hours
            li.innerHTML = `On ${date} you played ${hours} hours of video games`
            savedTimesList.appendChild(li)
        })
    }
}


