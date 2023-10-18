const template = document.createElement('template');
template.innerHTML = `
  <div class="container">
    <h1> Kör multiplikation </h1>
  </div>
`

customElements.define('multiplication-question', class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }
})