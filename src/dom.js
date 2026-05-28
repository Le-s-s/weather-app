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
    const page = document.querySelectorAll("*");
    const card = document.createElement("div");
    card.classList.add(`weather`);
    card.classList.add(`card`);
    const h1 = document.createElement("h1");
    h1.textContent = `Current weather`;
    card.appendChild(h1);
    display.appendChild(card);
    Object.keys(obj).forEach(async (key) => {
      if (typeof obj[key] !== "object") {
        const value = obj[key];
        const h2 = document.createElement("h2");
        if (key === "temp") {
          h2.textContent = `The  current temperature is ${value}F`;
          let feel = "";
          if (value > 65) {
            page.forEach((element) => {
              feel = "hot";
              element.classList.add(`${feel}`);
              element.classList.remove("cold");
            });
          } else {
            page.forEach((element) => {
              feel = "cold";
              element.classList.add(`${feel}`);
              element.classList.remove("hot");
            });
          }
          if (
            display.classList.contains("hot") ||
            display.classList.contains("cold")
          ) {
            const image = document.createElement("img");
            const returnImage = getImage(feel);

            console.log(typeof returnImage);
            image.src = await returnImage;
            display.appendChild(image);
            image.classList.add(`${feel}`);

            card.classList.add(`${feel}`);
          }
        }
        if (key === "precipprob") {
          h2.textContent = `Chance of precipitation is ${value}%`;
        }
        if (key === "conditions") {
          h2.textContent = `The sky is ${value}`;
        }
        if (key === "description") {
          h2.textContent = `${value}`;
        }

        card.appendChild(h2);
      }
    });
  };
  const getImage = async function (eClass) {
    const icon = await import(`./icons/${eClass}.svg`);

    return icon.default;
  };
  const loading = async function (promise) {
    const display = document.querySelector(".display");

    display.innerHTML = "";

    const message = document.createElement("h1");
    message.textContent = "Loading";
    display.appendChild(message);

    if (promise instanceof Promise) {
      console.log("is promise");

      await promise;

      message.remove();
    }
  };
  return { createDom, watchInput, injectApi, getImage, loading };
})();

export default dom;
