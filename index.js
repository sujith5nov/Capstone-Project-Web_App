// server.js
import  express from "express";
import axios from "axios";
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

const apiKey = "b6333c535c18abd693131fff19f54d3b"; 

app.get("/", async (req, res) => {
    try {
        let city = req.query.city || "Dubai"
        // Default to Hyderabad if no city is provided
        const weatherData = await fetchWeatherData(city);
        res.render("index", { weatherData });
    } catch (error) {
        console.error("Error fetching weather data:", error.response ? error.response.data : error.message);
        res.status(500).send("Error fetching weather data");
    }
   
});

async function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(apiUrl);
    return {
        city: response.data.name,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed
    };
}

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
