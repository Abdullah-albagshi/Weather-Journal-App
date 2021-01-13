/* Global Variables */
const zipInput = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');
const generateBtn = document.getElementById('generate');
const zipTextError = document.getElementById('zipCode-error');

const tempText = document.getElementById('degrees');
const cityText = document.getElementById('city-text');
const dateText = document.getElementById('date-text');
const feelingsText = document.getElementById('feelings-text');
const iconImg = document.getElementById('weather-icon');

const dateHolder = document.getElementById('date');
const tempHolder = document.getElementById('temp');
const feelingsHolder = document.getElementById('content');

const icon = `http://openweathermap.org/img/wn/`;
let iconId = '';
let cityName = '';
const APIUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const APIKey = '8c323c9fbdc6b9a8fbe1af8ab73c73df';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

generateBtn.addEventListener('click', clickAction);

function clickAction(e) {
    //prevent page from reloading
    e.preventDefault();

    // Get value of zip and feelings
    zipValue = zipInput.value;
    feelingsValue = feelingsInput.value;

    // if the value of zip or feeling are empty stop
    if (!zipValue || !feelingsValue) {
        return;
    }

    // call open weather API
    fetchFromAPI(APIUrl, APIKey, zipValue)
        // after successful fetch postDataTo serve will be called
        .then((data) => {
            //create object to pass it to local server
            projectData = {
                temp: data,
                date: newDate,
                feelings: feelingsValue,
            };
            //call server
            postDataToSever(projectData);
        })
}

let fetchFromAPI = async(APIUrl, APIKey, zipValue) => {
    //call open Weather API
    let serverRes = await fetch(
        `${APIUrl}zip=${zipValue}&appid=${APIKey}&units=imperial`
    );
    //check if successful response otherwise throw error
    if (serverRes.status !== 200) {
        throw new Error(serverRes.status);
    }

    try {
        //convert API response to json
        const data = await serverRes.json();
        //set icon id
        iconId = data.weather[0].icon;
        //set city name
        cityName = data.name;
        //return temperature
        return data.main.temp;
    } catch (error) {
        console.log(error);
    }
};

const postDataToSever = async(data) => {
    // post data local server
    const serverRes = await fetch('/add', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        //convert server response to json
        const data = await serverRes.json();
        console.log('data', data);
        return data;
    } catch (error) {
        console.log(error);
    }
};