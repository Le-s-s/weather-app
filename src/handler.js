import dom from "./dom.js";
import api from "./api.js";

const handler = (function () {
  const start = function () {
    dom.createDom();
    dom.watchInput(async (zipCode) => {
      const apiObj = await api.weatherJson(zipCode);
      dom.injectApi(apiObj);
    });
  };

  return { start };
})();

export default handler;
