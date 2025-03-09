let weather = {
    apiKey: "2dbcc2ccb1f57a9afb95a42aaa9eba15",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
        .then((response) => {
            if (!response.ok) {
                throw new Error("No weather found.");
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data))
        .catch(() => {
            document.querySelector(".weather").innerHTML = "<p>City not found. Try again.</p>";
        });
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".search button").addEventListener("click", function () {
        weather.search();
    });

    document.querySelector(".search-bar").addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });
    document.body.style.backgroundImage = "url('./BG.jpg')";
});
weather.fetchWeather("Islamabad");
