import "./style.css";

const dom = (function () {
  const createDom = function () {
    const body = document.querySelector("body");

    const container = document.createElement("div");
    container.classList.add("container");

    const ui = document.createElement("div");
    ui.classList.add("ui");

    const address = document.createElement("input");
    address.type = "text";

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Search";

    const display = document.createElement("div");
    display.classList.add("display");

    ui.appendChild(address);
    ui.appendChild(button);
    container.appendChild(ui);
    container.appendChild(display);
    body.appendChild(container);
  };
  const watchInput = function (weatherJson) {
    const button = document.querySelector("button");
    const input = document.querySelector("input");

    console.log(input.textContent);
    button.addEventListener("click", (event) => {
      if (input !== "") {
        return weatherJson(input.value);
      } else {
        return Error;
      }
    });
  };

  const injectApi = function (obj) {
    const display = document.querySelector(".display");

    Object.keys(obj).forEach((key) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const title = document.createElement("h3");
      title.textContent = key;

      card.appendChild(title);

      const value = obj[key];
      
      if (value === null) {
        const text = document.createElement("h2");
        text.textContent = "null";
        card.appendChild(text);
      
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === "object") {
            injectApi(item);
          } else {
            const text = document.createElement("h2");
            text.textContent = `${value}`;
            card.appendChild(text)
          }
        });
      } else if (typeof value === "object" && value !== null) {
        injectApi(value);
      } else {
        const text = document.createElement("h2");
        text.textContent = `${value}`;
        card.appendChild(text)
      }
      display.appendChild(card);
    });
  };

  return { createDom, watchInput, injectApi };
})();

export default dom;
