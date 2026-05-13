import dom from "./dom.js"
import api from "./api.js"

const handler = (function () {
    const start = function () {
        dom.createDom();
        dom.watchInput((zipCode) => {
            api.weatherJson(zipCode);
        });

    };

return { start };
})();

export default handler