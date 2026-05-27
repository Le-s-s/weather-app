import dom from "./dom.js";
import api from "./api.js";

const handler = (function () {
  const start = function () {
    dom.createDom();
    dom.watchInput(async (zipCode) => {
      try {
        const apiObj = api.weatherJson(zipCode);
        dom.loading(apiObj);

        
        const tempData = api.findData(await apiObj);
        const displayData = new api.dataObject(tempData);
        console.log(displayData);
        const display = document.querySelector(".display");
        display.innerHTML = "";
        dom.injectApi(displayData);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return { start };
})();

export default handler;
