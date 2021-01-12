/* Global Variables */
const zipInput = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');
const generateBtn = document.getElementById('generate');
// const entryHolder = document.getElementById('entryHolder');

const dateHolder = document.getElementById('date')
const tempHolder = document.getElementById('temp')
const feelingsHolder = document.getElementById('content')

const icon = `http://openweathermap.org/img/wn/`;
let iconId = ''
const APIUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const APIKey = '8c323c9fbdc6b9a8fbe1af8ab73c73df';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

generateBtn.addEventListener('click', clickAction);

function clickAction(e) {
    e.preventDefault();

    // Get value of zip and feelings
    zipValue = zipInput.value;
    feelingsValue = feelingsInput.value;

    // if the value of zip or feeling are empty stop
    if (!zipValue || !feelingsValue) {
        return;
    }

    console.log(zipValue, feelingsValue);
    fetchFromAPI(APIUrl, APIKey, zipValue)

}

let fetchFromAPI = async(APIUrl, APIKey, zipValue) => {
    let serverRes = await fetch(
        `${APIUrl}zip=${zipValue}&appid=${APIKey}&units=imperial`
    );
    try {
        const data = await serverRes.json();
        console.log(data);
        iconId = data.weather[0].icon
        return data.main.temp;
    } catch (error) {
        console.log(error);
    }
};