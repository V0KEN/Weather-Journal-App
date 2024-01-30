/* Global Variables */
const apiKey = '&appid=df4bece2f38395324777e7cb43f34748';
const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&zip='

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const zipCode = document.querySelector('.zip input');
const button = document.querySelector('.feel button');
const feeling = document.querySelector('.feel textarea');

// Function to fetch weather data from OpenWeatherAPI
const getData = async (zip) => {
    const response = await fetch(url + zip + apiKey);

    try {
        //fetch weather data
        const data = await response.json();

        document.querySelector('#date').innerHTML = 'Date: ' + newDate;
        document.querySelector('#temp').innerHTML =  'Temperature: ' + data.main.temp + '°C';
        document.querySelector('#country').innerHTML = 'Location: ' + data.sys.country;
        document.querySelector('#content').innerHTML = `Your feeling: ` + feeling.value;

    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

// Event listener for the 'generate' button
document.getElementById('generate').addEventListener('click', async () => {
    getData(zipCode.value);
});

    