/** List with all loaded micro frontend web components */
const registeredMf = [];

/** global root element to which the loaded web components are attached */
const wrapper = document.getElementById("component-wrapper");

/** Mounts the Foo Micro Frontend */
async function mountFoo() {
  const templateName = await loadMicroFrontend("foo", "./FooCustomElement.js");

  unmountAllMfs();
  mountMf(templateName);
}

/** Mounts the Bar Micro Frontend */
async function mountBar() {
  const templateName = await loadMicroFrontend("bar", "./BarCustomElement.js");

  unmountAllMfs();
  mountMf(templateName);
}

/**
 * Generic function to lazy load a micro frontend.
 * Return immediately if the component is already loaded
 *
 * @returns the name of the template which the micro-frontend can be loaded
 */
async function loadMicroFrontend(name, urlpath) {
  const templateName = `${name}-component`;

  if (registeredMf.includes(templateName)) {
    return templateName;
  }

  const MicroFrontend = await import(urlpath);
  // append class to global customElements
  customElements.define(templateName, MicroFrontend.default);
  registeredMf.push(templateName);

  return templateName;
}

function mountMf(templateName) {
    const template = document.createElement(templateName);
    wrapper.appendChild(template);
}

/** Unmount all micro frontends */
function unmountAllMfs() {
  while (wrapper.firstChild) {
    wrapper.removeChild(wrapper.firstChild);
  }
}
