import "./style.css";

const dom = (function () {
  const createDom = function () {

    const body = document.querySelector("body");

    const container = document.createElement("div");
    container.classList.add("container");

    const ui = document.createElement("div");
    ui.classList.add("ui");

    const address = document.createElement("input");
    address.type = "text"

    const button = document.createElement("button");
    button.type = "button"
    button.textContent = "Search"

    const display = document.createElement("div");
    display.classList.add("display");

    ui.appendChild(address)
    ui.appendChild(button)
    container.appendChild(ui)
    container.appendChild(display)
    body.appendChild(container);
  };

  return { createDom };
})();

export default dom;
