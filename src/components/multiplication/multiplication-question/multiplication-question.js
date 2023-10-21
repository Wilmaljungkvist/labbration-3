import { NumberGenerator, ArrayGenerator } from "slumpgenerator";

const template = document.createElement('template');
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
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

      this.numberGenerator = new NumberGenerator()
      this.arrayGenerator = new ArrayGenerator()

      this.loadExternalCss()

      this.initializeVariables()
  }

  loadExternalCss() {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', '../../../public/css/styles.css')
    this.shadowRoot.appendChild(link)
  }

  initializeVariables() {
    this.h1 = this.shadowRoot.querySelector('h1')
    this.form = this.shadowRoot.querySelector('form')
    this.numberAnswer = this.shadowRoot.querySelector('#numberAnswer')
    this.score = this.shadowRoot.querySelector('p')
    this.label = this.shadowRoot.querySelector('label')
    this.submit = this.shadowRoot.querySelector('#submit')
    this.container = this.shadowRoot.querySelector('.container')
    this.correctAnswer = 0
    this.currentRound = 1
    this.totalRounds = 0
    this.table = 0
    this.scoreCount = 0
    this.high = 0
    this.low = 0
  }

  initialize(table, rounds, high, low) {
    this.totalRounds = Number.parseInt(rounds, 10)
    this.table = Number.parseInt(table, 10)
    this.high = Number.parseInt(high, 10)
    this.low = Number.parseInt(low, 10)
    this.startRound()
}


  startRound() {
    this.numberAnswer.value = ''
    if (this.currentRound <= this.totalRounds) {
      this.generateNewQuestion(this.table)
    } else {
      this.handleGameOver()
    }
  }

  handleGameOver() {
    this.h1.textContent = 'Slut på frågor'
      const restartButton = document.createElement('button')
      this.container.appendChild(restartButton)
      restartButton.textContent = 'Köra igen?'
      const homeButton = document.createElement('button')
      this.container.appendChild(homeButton)
      homeButton.textContent = 'Gå till hemskärm?'

      homeButton.addEventListener('click', () => {
        this.dispatchHomeEvent()
      })

      restartButton.addEventListener('click', () => {
        this.dispatchMultiplyStartEvent()
      })

      this.label.textContent = 'Bra jobbat! Vad vill du göra nu?'
      this.numberAnswer.remove()
      this.submit.remove()
  }

  dispatchMultiplyStartEvent() {
    const event = new CustomEvent('multiply-start', {
      bubbles: true,
      composed: true,
      })
      this.dispatchEvent(event)
  }

  dispatchHomeEvent() {
    const event = new CustomEvent('home-start', {
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(event)
  }

  generateNewQuestion(table) {
    const firstNumberToMultiply = Number.parseInt(table)
    const secondNumberToMultiply = this.numberGenerator.getRandomInt(this.low, (this.high + 1))

    this.correctAnswer = firstNumberToMultiply * secondNumberToMultiply
    this.h1.textContent = `Vad är ${firstNumberToMultiply} x ${secondNumberToMultiply}?`
}

handleUserAnswer() {
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
  const userAnswer = parseInt(this.shadowRoot.querySelector('#numberAnswer').value)
  if (userAnswer === this.correctAnswer) {
    this.h1.textContent = correctMessages[indexCorrect]
    this.scoreCount += 1
  } else {
    this.h1.textContent = wrongMessages[indexWrong]
  }
  this.updateScore()
}

updateScore() {
  this.score.textContent = 'Poäng: ' + this.scoreCount + '/' + (this.currentRound)
}

connectedCallback() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.handleUserAnswer()

      setTimeout(() => {
        this.currentRound += 1
        this.startRound()
      }, 1000)
    })
  }
})