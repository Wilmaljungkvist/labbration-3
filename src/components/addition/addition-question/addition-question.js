import { NumberGenerator, ArrayGenerator } from 'slumpgenerator'

const template = document.createElement('template')
template.innerHTML = `
<div class="container">
  <p>Poäng: 0</p>
    <h1></h1>
    <form>
    <label for="answer">Skriv ditt svar: </label>
    <input id='numberAnswer' name="answer" type="number">
    <button type="submit" id="submit">Skicka</button>
</form>
  <div>
`

customElements.define('addition-question', class extends HTMLElement {
  #h1
  #userAnswer
  #score
  #correctAnswer
  #currentRound
  #currentScore
  #totalRounds
  #numbers
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

 
  initializeSettings(numbers, rounds, high, low) {
    this.#totalRounds = Number.parseInt(rounds)
    this.#numbers = Number.parseInt(numbers)
    this.#high = Number.parseInt(high)
    this.#low = Number.parseInt(low)
    this.#startRound()
  }


  #startRound() {
    this.#userAnswer.value = ''
    if (this.#currentRound <= this.#totalRounds) {
      this.#generateNewQuestion(this.#numbers)
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
      this.dispatchAdditionStartEvent()
    })
    
    this.shadowRoot.querySelector('label').textContent = 'Bra jobbat! Vad vill du göra nu?'
    this.#userAnswer.remove()
    this.shadowRoot.querySelector('#submit').remove()
  }

  /**
   * Dispatches event that says that the addition game should start over. 
   */
  dispatchAdditionStartEvent() {
    const event = new CustomEvent('addition-start', {
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


  #generateNewQuestion(numbers) { 
    const numbersToAdd = this.arrayGenerator.getRandomArray(this.#low, (this.#high + 1), numbers)
    let question = 'Vad är '

    for (let i = 0; i < numbersToAdd.length; i++) {
      question += numbersToAdd[i]
      if (i < (numbersToAdd.length - 1)) {
        question += ' + '
      } 
    }

    this.#h1.textContent = question
    this.#correctAnswer = numbersToAdd.reduce((acc, num) => acc + num, 0)
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