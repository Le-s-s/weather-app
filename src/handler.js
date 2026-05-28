import dom from "./dom.js";
import api from "./api.js";

const handler = (function () {
  let currentZip = "";

  const fetchWeather = async function () {
    if (!currentZip) return;

    try {
      const apiObj = api.weatherJson(currentZip);

      dom.loading(apiObj);

      const tempData = api.findData(await apiObj);

      const displayData = new api.dataObject(tempData);

      console.log(displayData);

      dom.injectApi(displayData);
    } catch (error) {
      console.log(error);
    }
  };

  const start = function () {
    dom.createDom();

    dom.watchInput((zipCode) => {
      currentZip = zipCode;

      fetchWeather();
    });

    setInterval(() => {
      fetchWeather();
    }, 30000);
  };

  return { start };
})();

export default handler;
