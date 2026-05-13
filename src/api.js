const api = (function () {
  const weatherJson = async function (zipCode) {
    try {
      const weatherApi = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${zipCode}/2020-10-19T13:00:00?key=GHJBCBFE4W95FGR7QYMFGVN9F`
      );
      const weatherData = await weatherApi.text();
      console.log(weatherData)
      const weatherObject = JSON.parse(weatherData);
      return weatherObject;
    } catch (error) {
      console.error(error);
    }
  };

  return { weatherJson };
})();

export default api;
