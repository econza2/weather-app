const input = document.querySelector("input");

const searchButton = document.querySelector(".search-button");

const body = document.querySelector("body");

const infoDiv = document.createElement("div");
infoDiv.style.height = "1000px";
infoDiv.style.width = "1000px";
infoDiv.style.borderStyle = "solid";
infoDiv.style.borderColor = "red";
body.appendChild(infoDiv);

const noSearch = document.createElement("h1");
const invalidSearch = document.createElement("h1");
const cityName = document.createElement("h1");

const dateSelect = document.createElement("select");
dateSelect.setAttribute("name", "date");

const timeSelect = document.createElement("select");
timeSelect.setAttribute("name", "time");

const dateSelectLabel = document.createElement("label");
dateSelectLabel.textContent = "Select Date";

const timeSelectLabel = document.createElement("label");
timeSelectLabel.textContent = "SelectTime";

const conditionsDiv = document.createElement("div");

const cloudCover = document.createElement("div");
const cloudCoverLabel = document.createElement("label");
cloudCoverLabel.textContent = "Cloud Cover";
conditionsDiv.appendChild(cloudCoverLabel);
conditionsDiv.appendChild(cloudCover);

const conditions = document.createElement("div");
const conditionsLabel = document.createElement("label");
conditionsLabel.textContent = "Conditions";
conditionsDiv.appendChild(conditionsLabel);
conditionsDiv.appendChild(conditions);

const dew = document.createElement("div");
const dewLabel = document.createElement("label");
dewLabel.textContent = "Dew";
conditionsDiv.appendChild(dewLabel);
conditionsDiv.appendChild(dew);

const feelsLike = document.createElement("div");
const feelsLikeLabel = document.createElement("label");
feelsLikeLabel.textContent = "Feels Like";
conditionsDiv.appendChild(feelsLikeLabel);
conditionsDiv.appendChild(feelsLike);

const humidity = document.createElement("div");
const humidityLabel = document.createElement("label");
humidityLabel.textContent = "Humidity";
conditionsDiv.appendChild(humidityLabel);
conditionsDiv.appendChild(humidity);

const pressure = document.createElement("div");
const pressureLabel = document.createElement("label");
pressureLabel.textContent = "Pressure";
conditionsDiv.appendChild(pressureLabel);
conditionsDiv.appendChild(pressure);

const temp = document.createElement("div");
const tempLabel = document.createElement("label");
tempLabel.textContent = "Temperature";
conditionsDiv.appendChild(tempLabel);
conditionsDiv.appendChild(temp);

const windSpeed = document.createElement("div");
const windSpeedLabel = document.createElement("label");
windSpeedLabel.textContent = "Wind Speed";
conditionsDiv.appendChild(windSpeedLabel);
conditionsDiv.appendChild(windSpeed);

async function getWeatherData(input) {
  try {
    let response = await fetch(input, { mode: "cors" });
    let data = await response.json();
    let daysData = data.days;
    return daysData;
  } catch (error) {
    console.log(error);
    return ["INVALID", "DATA"];
  }
}

let weatherDataArray = [];
let dateIndex = [];
let timeIndex = [];
searchButton.addEventListener("click", () => {
  let inputValue = input.value;
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputValue}?unitGroup=metric&key=9RLML7MGQF4AW58BKATZWF9WM&contentType=json`;

  getWeatherData(url).then((a) => {
    weatherDataArray[0] = a;
  });

  if (weatherDataArray.length === 1) {
    noSearch.textContent = "";
    if (weatherDataArray[0].length === 15) {
      invalidSearch.textContent = "";
      cityName.textContent = input.value.toUpperCase();
      cityName.style.color = "green";
      infoDiv.appendChild(cityName);
      infoDiv.appendChild(dateSelectLabel);
      infoDiv.appendChild(dateSelect);
      infoDiv.appendChild(timeSelectLabel);
      infoDiv.appendChild(timeSelect);
      infoDiv.appendChild(conditionsDiv);
      console.log(weatherDataArray);

      weatherDataArray[0].forEach((current, index) => {
        const option = document.createElement("option");
        option.textContent = `${current["datetime"]}`;
        dateSelect.appendChild(option);
      });

      for (let i = 0; i < 24; i++) {
        const hoursOption = document.createElement("option");
        hoursOption.textContent = `${weatherDataArray[0][0]["hours"][i]["datetime"]}`;
        timeSelect.appendChild(hoursOption);
        timeIndex.push(weatherDataArray[0][0]["hours"][i]["datetime"]);
        //console.log(timeIndex);
      }

      for (let i = 0; i < 15; i++) {
        dateIndex.push(weatherDataArray[0][i]["datetime"]);
        //console.log(dateIndex);
      }

      cloudCover.textContent = `${
        weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
          timeIndex.indexOf(timeSelect.value)
        ]["cloudcover"]
      }`;

      conditions.textContent = `${
        weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
          timeIndex.indexOf(timeSelect.value)
        ]["conditions"]
      }`;

      dew.textContent = `${
        weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
          timeIndex.indexOf(timeSelect.value)
        ]["dew"]
      }`;

      feelsLike.textContent = `${
        weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
          timeIndex.indexOf(timeSelect.value)
        ]["feelslike"]
      }`;

      humidity.textContent = `${
        weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
          timeIndex.indexOf(timeSelect.value)
        ]["humidity"]
      }`;

      pressure.textContent = `${
        weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
          timeIndex.indexOf(timeSelect.value)
        ]["pressure"]
      }`;

      temp.textContent = `${
        weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
          timeIndex.indexOf(timeSelect.value)
        ]["temp"]
      }`;

      windSpeed.textContent = `${
        weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
          timeIndex.indexOf(timeSelect.value)
        ]["windspeed"]
      }`;
    } else if (weatherDataArray[0].length === 2) {
      cityName.textContent = "";
      invalidSearch.textContent = "YOU HAVE ENTERED AN INVALID CITY";
      invalidSearch.style.color = "red";
      infoDiv.appendChild(invalidSearch);
    }
  }
});

if (weatherDataArray.length === 0) {
  noSearch.textContent =
    "YOU HAVE NOT SEARCHED ANY CITY TO DISPLAY THE WEATHER FOR";
  noSearch.style.color = "red";
  infoDiv.appendChild(noSearch);
}

dateSelect.addEventListener("change", () => {
  cloudCover.textContent = `${
    weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
      timeIndex.indexOf(timeSelect.value)
    ]["cloudcover"]
  }`;

  conditions.textContent = `${
    weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
      timeIndex.indexOf(timeSelect.value)
    ]["conditions"]
  }`;

  dew.textContent = `${
    weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
      timeIndex.indexOf(timeSelect.value)
    ]["dew"]
  }`;

  feelsLike.textContent = `${
    weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
      timeIndex.indexOf(timeSelect.value)
    ]["feelslike"]
  }`;

  humidity.textContent = `${
    weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
      timeIndex.indexOf(timeSelect.value)
    ]["humidity"]
  }`;

  pressure.textContent = `${
    weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
      timeIndex.indexOf(timeSelect.value)
    ]["pressure"]
  }`;

  temp.textContent = `${
    weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
      timeIndex.indexOf(timeSelect.value)
    ]["temp"]
  }`;

  windSpeed.textContent = `${
    weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
      timeIndex.indexOf(timeSelect.value)
    ]["windspeed"]
  }`;
});

timeSelect.addEventListener("change", () => {
  cloudCover.textContent = `${
    weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
      timeIndex.indexOf(timeSelect.value)
    ]["cloudcover"]
  }`;

  conditions.textContent = `${
    weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
      timeIndex.indexOf(timeSelect.value)
    ]["conditions"]
  }`;

  dew.textContent = `${
    weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
      timeIndex.indexOf(timeSelect.value)
    ]["dew"]
  }`;

  feelsLike.textContent = `${
    weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
      timeIndex.indexOf(timeSelect.value)
    ]["feelslike"]
  }`;

  humidity.textContent = `${
    weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
      timeIndex.indexOf(timeSelect.value)
    ]["humidity"]
  }`;

  pressure.textContent = `${
    weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
      timeIndex.indexOf(timeSelect.value)
    ]["pressure"]
  }`;

  temp.textContent = `${
    weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
      timeIndex.indexOf(timeSelect.value)
    ]["temp"]
  }`;

  windSpeed.textContent = `${
    weatherDataArray[0][dateIndex.indexOf(dateSelect.value)]["hours"][
      timeIndex.indexOf(timeSelect.value)
    ]["windspeed"]
  }`;
});
