const template = document.createElement('template')
template.innerHTML = `

<div class="container">
    <h1>Vill du öva på?</h1>
    <form>
        <button>multiplikation</button>
        <button>addition</button>
        <button>subtraktion</button>
</form>
  <div>
`

customElements.define('math-application',
  class extends HTMLElement {
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }
  }
)