let weather = {
  apiKey: "87cab7f3a3825e6dfdf9b54d039e2056",

  getWeather: function (city) {
    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
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
      .then((array) => {
        this.lat = array[0].lat;
        this.lon = array[0].lon;
        return [this.lat, this.lon];
      })
      .then((arr) => {
        fetch(
          "http://api.openweathermap.org/data/2.5/forecast?lat=" +
            arr[0] +
            "&lon=" +
            arr[1] +
            "&units=metric&appid=" +
            this.apiKey
        ).then((secondResponse)=> {return secondResponse.json();})
        .then((data) => {
         this.showWeather(data)});
      })          
  },
  showWeather: function (data) {
    const name = data.city.name;
    const icon = data.list[0].weather[0].icon;
    const description = data.list[0].weather[0].description;
    const temp = data.list[0].main.temp;
    const humidity = data.list[0].main.humidity;
    const speed = data.list[0].wind.speed;

    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    const myDate = new Date( data.list[0].dt *1000);
    const currentDay = week[myDate.getDay()];
    const tommorow = new Date( data.list[6].dt_txt);
    const forecastDay1 = week[tommorow.getDay()];
    const tommorow_2 = new Date( data.list[14].dt_txt);
    const forecastDay2 = week[tommorow_2.getDay()];
    const tommorow_3= new Date( data.list[22].dt_txt);
    const forecastDay3 = week[tommorow_3.getDay()];
    const tommorow_4= new Date( data.list[30].dt_txt);
    const forecastDay4 = week[tommorow_4.getDay()];

    document.querySelector(".city").textContent =`Weather in ${name} on ${currentDay}`;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").textContent = description;
    document.querySelector(".temp").textContent = temp + "°C";
    document.querySelector(".humidity").textContent = "Humidity: " + humidity + "%";
    document.querySelector(".wind").textContent = "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";


    document.querySelector(".first .day-name").textContent = forecastDay1;
    document.querySelector(".first .day-temp").textContent = data.list[6].main.temp + "°C";
    document.querySelector(".first .day-icon").src =
    "https://openweathermap.org/img/wn/" + `${data.list[6].weather[0].icon}` + ".png";
    
    document.querySelector(".second .day-name").textContent = forecastDay2;
    document.querySelector(".second .day-temp").textContent = data.list[14].main.temp + "°C";
    document.querySelector(".second .day-icon").src =
    "https://openweathermap.org/img/wn/" + `${data.list[14].weather[0].icon}` + ".png";

    document.querySelector(".third .day-name").textContent = forecastDay3;
    document.querySelector(".third .day-temp").textContent = data.list[22].main.temp + "°C";
    document.querySelector(".third .day-icon").src =
    "https://openweathermap.org/img/wn/" + `${data.list[22].weather[0].icon}` + ".png";

    document.querySelector(".fourth .day-name").textContent = forecastDay4;
    document.querySelector(".fourth .day-temp").textContent = data.list[30].main.temp + "°C";
    document.querySelector(".fourth .day-icon").src =
    "https://openweathermap.org/img/wn/" + `${data.list[30].weather[0].icon}` + ".png";
        
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
