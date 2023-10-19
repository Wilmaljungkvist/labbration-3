
import '../math-choose/index.js'
import '../multiplication/multiplication-question/index.js'
import '../multiplication/multiplication-choose/index.js'
import '../addition/addition-question/index.js'
import '../subtraction/subtraction-question/index.js'
import '../multiplication/multiplication-question/index.js'


const template = document.createElement('template')
template.innerHTML = `
  <div>
    <math-choose></math-choose>
  </div>
`

customElements.define('math-application', class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

    this.mathChoose = this.shadowRoot.querySelector('math-choose')

    this.mathChoose.addEventListener('multiplication-selected', () => {
      this.showMultiplicationChoose()
    })

    this.mathChoose.addEventListener('addition-selected', () => {
      this.showAdditionQuestion()
    })

    this.mathChoose.addEventListener('subtraction-selected', () => {
      this.showSubtractionQuestion()
    })

    this.addEventListener('multiply-start', () => {
        this.showMultiplicationChoose()
      })

      this.addEventListener('home-start', () => {
        this.homeScreen()
      })
  }

  homeScreen() {
    this.clearShadowDOM()
    const homeScreen = document.createElement('math-choose')
    this.shadowRoot.appendChild(homeScreen)
  }

  showMultiplicationChoose() {
    this.clearShadowDOM()
    const multiplicationChoose = document.createElement('multiplication-choose')
    multiplicationChoose.addEventListener('start-multiplication-game', (event) => {
      const table = event.detail.table
      const rounds = event.detail.rounds
      this.showMultiplicationQuestion(table, rounds)
    })
    this.shadowRoot.appendChild(multiplicationChoose)
  }

  showMultiplicationQuestion(table, rounds) {
    this.clearShadowDOM()
    const multiplicationQuestion = document.createElement('multiplication-question')
    multiplicationQuestion.initialize(table, rounds)
    this.shadowRoot.appendChild(multiplicationQuestion)
  }

  showAdditionQuestion() {
    this.clearShadowDOM()
    const additionQuestion = document.createElement('addition-question')
    this.shadowRoot.appendChild(additionQuestion)
  }

  showSubtractionQuestion() {
    this.clearShadowDOM()
    const subtractionQuestion = document.createElement('subtraction-question')
    this.shadowRoot.appendChild(subtractionQuestion)
  }

  clearShadowDOM() {
    this.shadowRoot.innerHTML = ''
  }
})
