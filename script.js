let weather = {
  apiKey: "87cab7f3a3825e6dfdf9b54d039e2056",
  getWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
        }
        return response.json();
      })
      .then((data) => this. showWeather(data));
  },
  showWeather: function (data) {
    const name = data.name;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const speed = data.wind.speed;
    document.querySelector(".city").textContent = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").textContent = description;
    document.querySelector(".temp").textContent = temp + "°C";
    document.querySelector(".humidity").textContent =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").textContent =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.getWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.getWeather("Kharkiv");
