/* Global Variables */
let apiKey = 'fecfba743fd2ac435cf7f85a5a99d27f';
let url = 'https://api.openweathermap.org/data/2.5/weather?q=Sydney,NSW,AUS&zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Function to fetch weather data from OpenWeatherAPI
const getData = async (zipCode) => {
    const apiUrl = `${url}${zipCode}&appid=${apiKey}&units=imperial`;   

    try {
        //fetch weather data
        const response = await fetch(apiUrl);
        const newWeatherData = await response.json();

        if (response.ok) {
            // Handle the weather data (you can log it or update the UI)
            console.log('Weather Data:', newWeatherData);
        } else {
            // Handle errors from the API
            console.error('Error fetching weather data:', newWeatherData.message);
        }
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

// POST request to add the API + user data
const postData = async (url, data={}) => {
    // make POST request to the server
    const response = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    
    try {
        const newWeatherData = await response.json();
            return newWeatherData;
    } catch (error) {
        console.error("Error posting data: ", error);
    }
};

// Async function to updates the UI dynamically
const updateUI = async (zipCode) => {
    // Make a GET request to retrieve data from the server
    const apiUrl = `${url}${zipCode}&appid=${apiKey}&units=imperial`;
    const response = await fetch(apiUrl);

    try {
        // Parse the json data
        if (response.ok) {
            const data = await response.json;
            console.log('Update data: ')

            // Update the UI elements with retrieved data
            document.getElementById('date').innerHTML = `Date: ${data.date}`;
            document.getElementById('temp').innerHTML =  `Temperature: ${data.temperature} °C`;
            document.getElementById('content').innerHTML = `User Input: ${data.userResponse}`;
        }
        else {
            console.log('Error fetching data from server: ', response.statusText)
        }
    } catch (error) {
        console.log('Error updating UI: ', error);
    }
};

// Event listener for the 'generate' button
document.getElementById('generate').addEventListener('click', async () => {
    // Get user-entered zip code
    const userZipCode = document.getElementById('zip').value;
    const apiUrl = `${url}${userZipCode}&appid=${apiKey}&units=imperial`;

    try {
        // Call async GET request 
        const weatherData = await fetch(apiUrl);
        const weatherInfo = await weatherData.json();

        const date = new Date().toLocaleString;
        const userResponse = document.getElementById('feelings').value;
        

        const newData = {
            temperature: weatherInfo.main.temp,
            date,
            userResponse,
        }

        // After successful POST request, call the updateUI function
        postData('/', newData);
        await updateUI();

    } catch(error) {
        console.log('Error processing weather data: ', error);
    }
});

    