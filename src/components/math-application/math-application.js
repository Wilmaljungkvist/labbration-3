
import '../math-choose/index.js'
import '../multiplication/multiplication-question/index.js'
import '../multiplication/multiplication-choose/index.js'
import '../addition/addition-question/index.js'


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
      this.showAdditionChoose()
    })

    this.mathChoose.addEventListener('subtraction-selected', () => {
      this.showSubtractionQuestion()
    })

    this.mathChoose.addEventListener('division-selected', () => {
        this.showDivisionQuestion()
      })

    this.addEventListener('multiply-start', () => {
        this.showMultiplicationChoose()
      })

      this.addEventListener('home-start', () => {
        this.homeScreen()
      })

    this.addEventListener('addition-start', () => {
        this.showAdditionChoose()
    })
  }

  homeScreen() {
    this.clearShadowDOM()
    const homeScreen = document.createElement('math-choose')
    this.shadowRoot.appendChild(homeScreen)
  }

  showMultiplicationChoose() {
    this.clearShadowDOM()
    const multiplicationChoose = document.createElement('multiplication-division-choose')
    const multiplication = 'multiplication'
    multiplicationChoose.addEventListener('multiplication-division-game', (event) => {
      const table = event.detail.table
      const rounds = event.detail.rounds
      const high = event.detail.high
      const low = event.detail.low
      this.showMultiplicationQuestion(table, rounds, high, low, multiplication)
    })
    this.shadowRoot.appendChild(multiplicationChoose)
  }

  showMultiplicationQuestion(table, rounds, high, low, diviOrMulti) {
    this.clearShadowDOM()
    const multiplicationDivisionQuestion = document.createElement('multiplication-question')
    multiplicationDivisionQuestion.initialize(table, rounds, high, low, diviOrMulti)
    this.shadowRoot.appendChild(multiplicationDivisionQuestion)
  }

  showAdditionChoose() {
    this.clearShadowDOM()
    const additionChoose = document.createElement('addition-choose')
    additionChoose.addEventListener('start-addition-game', (event) => {
        const numbers = event.detail.numbers
        const rounds = event.detail.rounds
        const high = event.detail.high
        const low = event.detail.low
        this.showAdditionQuestion(numbers, rounds, high, low)
    })
    this.shadowRoot.appendChild(additionChoose)
  }

  showAdditionQuestion(numbers, rounds, high, low) {
    this.clearShadowDOM()
    const additionQuestion = document.createElement('addition-question')
    additionQuestion.initialize(numbers, rounds, high, low)
    this.shadowRoot.appendChild(additionQuestion)
  }

  showSubtractionQuestion() {
    this.clearShadowDOM()
    const subtractionQuestion = document.createElement('addition-question')
    this.shadowRoot.appendChild(subtractionQuestion)
  }

  showDivisionChoose() {
    this.clearShadowDOM()
    const divisionChoose = document.createElement('multiplication-division-choose')
    const division = 'division'
    divisionChoose.addEventListener('multiplication-division-game', (event) => {
      const table = event.detail.table
      const rounds = event.detail.rounds
      const high = event.detail.high
      const low = event.detail.low
      this.showMultiplicationQuestion(table, rounds, high, low, division)
    })
    this.shadowRoot.appendChild(divisionChoose)
  }

  clearShadowDOM() {
    this.shadowRoot.innerHTML = ''
  }
})
