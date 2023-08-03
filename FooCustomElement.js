export default class FooWebComponent extends HTMLElement {
  constructor() {
    super();
    
    // closed mode to forbid external javascript access
    const shadow = this.attachShadow({ mode: 'closed'});

    // create node and append it to the shadow-dom
    const paragraph = document.createElement("p");
    paragraph.appendChild(document.createTextNode("foo"));
    shadow.appendChild(paragraph);
  }
}