const spinner = document.getElementById('spinner');
const _search = document.getElementById('search');
const _weather = document.getElementById('weather');

let weather = {
  apiKey: "4101f6e872e244037bebbf13034c7732",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          spinner.style.display = "none";
          document.querySelector(".weather").classList.remove("hide"); // убрать если после ошибки надо пустое поле
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    spinner.style.display = "none";
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
    document.querySelector(".weather").classList.remove("hide");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);

  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
  document.querySelector(".weather").classList.add("hide");
  document.querySelector(".spinner").classList.add("show");
  spinner.style.display = "inline";
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search();
      document.querySelector(".weather").classList.add("hide");
      spinner.style.display = "inline";
    }
  });

weather.fetchWeather("Novosibirsk");