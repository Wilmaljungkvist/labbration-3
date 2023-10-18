import '../math-choose/index.js'
import '../multiplication-question/index.js'
import '../addition-question/index.js'
import '../subtraction-question/index.js'

const template = document.createElement('template');
template.innerHTML = `
  <div>
    <math-choose></math-choose>
  </div>
`

customElements.define('math-application', class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true));

    this.mathChoose = this.shadowRoot.querySelector('math-choose')

    this.mathChoose.addEventListener('multiplication-selected', () => {
      this.shadowRoot.innerHTML = ''
      const multiplicationQuestion = document.createElement('multiplication-question')
      this.shadowRoot.appendChild(multiplicationQuestion)
    })

    this.mathChoose.addEventListener('addition-selected', () => {
        this.shadowRoot.innerHTML = ''
        const additionQuestion = document.createElement('addition-question')
        this.shadowRoot.appendChild(additionQuestion)
      })

      this.mathChoose.addEventListener('subtraction-selected', () => {
        this.shadowRoot.innerHTML = ''
        const subtractionQuestion = document.createElement('subtraction-question')
        this.shadowRoot.appendChild(subtractionQuestion)
      })
  }
})
