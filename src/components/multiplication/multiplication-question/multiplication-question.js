import { NumberGenerator, ArrayGenerator } from 'slumpgenerator'

const template = document.createElement('template')
template.innerHTML = `
<div class="container">
  <p>Poäng: 0</p>
    <h1></h1>
    <form>
    <label for="answer">Skriv ditt svar: </label>
    <input id='numberAnswer' name="answer" type="number">
    <button type="submit" id="submit">Svara</button>
</form>
  <div>
`

customElements.define('multiplication-question', class extends HTMLElement {
  #h1
  #userAnswer
  #score
  #correctAnswer
  #currentRound
  #totalRounds
  #table
  #currentScore
  #high
  #low

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

      this.numberGenerator = new NumberGenerator()
      this.arrayGenerator = new ArrayGenerator()

      this.#loadExternalCss()
      this.#initializeVariables()
  }

  #loadExternalCss() {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', '/css/styles.css')
    this.shadowRoot.appendChild(link)
  }

  #initializeVariables() {
    this.#h1 = this.shadowRoot.querySelector('h1')
    this.#userAnswer = this.shadowRoot.querySelector('#numberAnswer')
    this.#score = this.shadowRoot.querySelector('p')
    this.#correctAnswer = 0
    this.#currentRound = 1
    this.#currentScore = 0
  }

  initializeSettings(table, rounds, high, low) {
    this.#table = Number.parseInt(table, 10)
    this.#totalRounds = Number.parseInt(rounds, 10)
    this.#high = Number.parseInt(high, 10)
    this.#low = Number.parseInt(low, 10)
    this.#startRound()
}


  #startRound() {
    this.#userAnswer.value = ''
    if (this.#currentRound <= this.#totalRounds) {
      this.#generateNewQuestion(this.#table)
    } else {
      this.#handleGameOver()
    }
  }

  #handleGameOver() {
    const container = this.shadowRoot.querySelector('.container')
    this.#h1.textContent = 'Slut på frågor'

    const restartButton = document.createElement('button')
    container.appendChild(restartButton)
    restartButton.textContent = 'Köra igen?'

    const homeButton = document.createElement('button')
    container.appendChild(homeButton)
    homeButton.textContent = 'Gå till hemskärm?'

    homeButton.addEventListener('click', () => {
      this.dispatchHomeEvent()
    })

    restartButton.addEventListener('click', () => {
      this.dispatchMultiplyStartEvent()
    })

    this.shadowRoot.querySelector('label').textContent = 'Bra jobbat! Vad vill du göra nu?'
    this.#userAnswer.remove()
    this.shadowRoot.querySelector('#submit').remove()
  }

  /**
   * Dispatches event that says that the multiplication game should start over. 
   */
  dispatchMultiplyStartEvent() {
    const event = new CustomEvent('multiply-start', {
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(event)
  }

  /**
   * Dispatches event that directs the client to the home page. 
   */
  dispatchHomeEvent() {
    const event = new CustomEvent('home-start', {
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(event)
  }

  #generateNewQuestion(table) {
    const firstNumberToMultiply = Number.parseInt(table)
    const secondNumberToMultiply = this.numberGenerator.getRandomInt(this.#low, (this.#high + 1))

    this.#correctAnswer = firstNumberToMultiply * secondNumberToMultiply
    this.#h1.textContent = `Vad är ${firstNumberToMultiply} x ${secondNumberToMultiply}?`
}

#handleUserAnswer() {
  const correctMessages = [
    'Korrekt, bra jobbat!',
    'De va rätt, snyggt!',
    'Ding ding, ett poäng till dig', 
    'Bra gissat!',
    'Du har helt rätt!',
    'Du har verkligen koll.',
    'Mitt i prick!'
  ]
  const wrongMessages = [
    'Fel!',
    'Tyvärr så va det fel. ',
    'Bra försök, men svaret är fel.',
    'Fel! :(',
    'Fel! :|'
  ]
  const indexCorrect = this.arrayGenerator.getRandomArrayIndex(correctMessages)
  const indexWrong = this.arrayGenerator.getRandomArrayIndex(wrongMessages)

  const userAnswer = parseInt(this.#userAnswer.value)
  if (userAnswer === this.#correctAnswer) {
    this.#h1.textContent = correctMessages[indexCorrect]
    this.#currentScore += 1
  } else {
    this.#h1.textContent = wrongMessages[indexWrong]
  }
  this.#updateScore()
}

#updateScore() {
  this.#score.textContent = 'Poäng: ' + this.#currentScore + '/' + (this.#currentRound)
}

connectedCallback() {
  const form = this.shadowRoot.querySelector('form')
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.#handleUserAnswer()

      setTimeout(() => {
        this.#currentRound += 1
        this.#startRound()
      }, 1000)
    })
  }
})