const api = (function () {
  const dataObject = function (data) {
    const possibleKeys = ["temp", "conditions", "precipprob", "description"];
    
    // Using arrow function here preserves the correct 'this' context
    Object.keys(data).forEach((key) => {
      const value = data[key];
      
      if (possibleKeys.includes(key)) {
        // Dynamically assign the value to its matching key name (e.g., this.temp, this.conditions)
        // If the value is an array, take the first element; otherwise, take the value itself
        this[key] = Array.isArray(value) ? value[0] : value;
      }
    });
    this.data = data;
  };

  const weatherJson = async function (zipCode) {
    try {
      const weatherApi = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${zipCode}/2020-10-19T13:00:00?key=GHJBCBFE4W95FGR7QYMFGVN9F`
      );
      const weatherData = await weatherApi.text();
      console.log(weatherData);
      const weatherObject = JSON.parse(weatherData);
      return weatherObject;
    } catch (error) {
      console.error(error);
    }
  };
  const findData = function (
    apiJson,
    weatherArray = { temp: [], conditions: [], precipprob: [], description: [] }
  ) {
    if (!apiJson || typeof apiJson !== "object") return weatherArray;
    //weatherArray.temp = [];

    Object.keys(apiJson).forEach((key) => {
      const value = apiJson[key];
      const possibleKeys = ["temp", "conditions", "precipprob", "description"];
      possibleKeys.forEach((keyCon) => {
        if (key === keyCon) {
          weatherArray[`${key}`].push(value);
        }
      });

      if (value === null) {
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === "object") {
            findData(item, weatherArray);
          } else {
            //check if temp data
            // use object creator on it
            // add object to array
          }
        });
      } else if (typeof value === "object" && value !== null) {
        findData(value, weatherArray);
      } else {
        //check if temp data
        // use object creator on it
        // add object to array
      }
      //check if temp data
      // use object creator on it
      // add object to array
    });

    return weatherArray;
  };
  return { weatherJson, findData, dataObject };
})();

export default api;
