
import '../math-choose/index.js'
import '../multiplication/multiplication-question/index.js'
import '../multiplication/multiplication-choose/index.js'
import '../addition/addition-question/index.js'
import '../addition/addition-choose/index.js'


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

    this.#handleStartEvents()
    this.#handleSelectedEvents()
  }

  /**
   * Listening for starting the diffrent questions or returning home. 
   */
  #handleStartEvents() {
    this.addEventListener('multiply-start', () => {
        this.#showMultiplicationSettings()
      })

    this.addEventListener('addition-start', () => {
        this.#showAdditionSettings()
    })

    this.addEventListener('home-start', () => {
        this.#showMathChoose()
    })
  }

  /**
   * Listening for when multiplication or addition is selected in math-choose. 
   */
  #handleSelectedEvents() {
    this.mathChoose.addEventListener('multiplication-selected', () => {
        this.#showMultiplicationSettings()
      })
  
      this.mathChoose.addEventListener('addition-selected', () => {
        this.#showAdditionSettings()
      })
  }


  #showMathChoose() {
    this.#clearShadowDOM()
    const mathChoose = document.createElement('math-choose')
    this.shadowRoot.appendChild(mathChoose)
  }


  #showMultiplicationSettings() {
    this.#clearShadowDOM()
    const multiplicationChoose = document.createElement('multiplication-choose')
    multiplicationChoose.addEventListener('start-multiplication-game', (event) => {
      const table = event.detail.table
      const rounds = event.detail.rounds
      const highestNumber = event.detail.high
      const lowestNumber = event.detail.low
      this.#showMultiplicationQuestion(table, rounds, highestNumber, lowestNumber)
    })
    this.shadowRoot.appendChild(multiplicationChoose)
  }

  #showMultiplicationQuestion(table, rounds, highestNumber, lowestNumber) {
    this.#clearShadowDOM()

    const multiplicationDivisionQuestion = document.createElement('multiplication-question')

    multiplicationDivisionQuestion.initialize(table, rounds, highestNumber, lowestNumber)

    this.shadowRoot.appendChild(multiplicationDivisionQuestion)
  }

  #showAdditionSettings() {
    this.#clearShadowDOM()
    const additionChoose = document.createElement('addition-choose')
    this.shadowRoot.appendChild(additionChoose)
    additionChoose.addEventListener('start-addition-game', (event) => {
      const numbers = event.detail.numbers
      const rounds = event.detail.rounds
      const high = event.detail.high
      const low = event.detail.low
      this.#showAdditionQuestion(numbers, rounds, high, low)
    })
  }

  #showAdditionQuestion(numbers, rounds, high, low) {
    this.#clearShadowDOM()
    const additionQuestion = document.createElement('addition-question')
    additionQuestion.initializeSettings(numbers, rounds, high, low)
    this.shadowRoot.appendChild(additionQuestion)
  }

  #clearShadowDOM() {
    this.shadowRoot.innerHTML = ''
  }
})
