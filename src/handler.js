import dom from "./dom.js";
import api from "./api.js";

const handler = (function () {
  const start = function () {
    dom.createDom();
    dom.watchInput(async (zipCode) => {
      const apiObj = await api.weatherJson(zipCode);
      const tempData = api.findData(apiObj);
      const displayData = new api.dataObject(tempData);
      console.log(displayData);
      const display = document.querySelector(".display");
      display.innerHTML = "";
      dom.injectApi(displayData);
    });
  };

  return { start };
})();

export default handler;
