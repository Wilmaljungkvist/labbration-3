import '../math-choose/index.js'

const template = document.createElement('template')
template.innerHTML = `
<div>
<math-choose></math-choose>
  </div>
`

customElements.define('math-application',
  class extends HTMLElement {
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

        this.mathChoose = this.shadowRoot.querySelector('math-choose')
    }
  }
)