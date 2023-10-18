const template = document.createElement('template');
template.innerHTML = `
  <div class="container">
    <h1> Kör addition </h1>
  </div>
`

customElements.define('addition-question', class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }
})