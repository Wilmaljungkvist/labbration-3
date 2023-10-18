const template = document.createElement('template');
template.innerHTML = `
  <div class="container">
    <h1> Kör subtraktion </h1>
  </div>
`

customElements.define('subtraction-question', class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }
})