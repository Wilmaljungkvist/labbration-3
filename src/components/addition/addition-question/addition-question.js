import { NumberGenerator, ArrayGenerator } from "slumpgenerator";

const template = document.createElement('template');
template.innerHTML = `
<div class="container">
  <p>Score: 0</p>
    <h1></h1>
    <form>
    <label for="answer">Please write your answer: </label>
    <input id='numberAnswer' name="answer" type="number" placeholder="Write and press enter">
    <button type="submit" id="submit">Submit</button>
</form>
  <div>
`

customElements.define('addition-question', class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

      const css = document.createElement('link')
        css.setAttribute('rel', 'stylesheet')
        css.setAttribute('href', '../../../public/css/styles.css')
        this.shadowRoot.appendChild(css)

      this.numberGenerator = new NumberGenerator()
      this.arrayGenerator = new ArrayGenerator()
      this.loadExternalCss('../../../public/css/styles.css')
      this.h1 = this.shadowRoot.querySelector('h1')
      this.form = this.shadowRoot.querySelector('form')
      this.input = this.shadowRoot.querySelector('#numberAnswer')
      this.score = this.shadowRoot.querySelector('p')
      this.label = this.shadowRoot.querySelector('label')
      this.submit = this.shadowRoot.querySelector('#submit')
      this.container = this.shadowRoot.querySelector('.container')
      this.correctAnswer = 0
      this.currentRound = 0
      this.totalRounds = 0
      this.numbers = 0
      this.scoreCount = 0
      this.high = 0
      this.low = 0
  }

  loadExternalCss(path) {
    const link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href', '../../../public/css/styles.css')
        this.shadowRoot.appendChild(css)
  }

  initialize(numbers, rounds, high, low) {
    this.totalRounds = Number.parseInt(rounds)
    this.numbers = Number.parseInt(numbers)
    this.high = Number.parseInt(high)
    this.low = Number.parseInt(low)
    this.startRound()
}


  startRound() {
    this.input.value = ''
    if (this.currentRound < this.totalRounds) {
      this.generateNewQuestion(this.numbers)
    } else {
      this.h1.textContent = 'Slut på frågor'
      const restartButton = document.createElement('button')
      this.container.appendChild(restartButton)
      restartButton.textContent = 'Köra igen?'
      const homeButton = document.createElement('button')
      this.container.appendChild(homeButton)
      homeButton.textContent = 'Gå till hemskärm?'

      homeButton.addEventListener('click', () => {
        const event = new CustomEvent('home-start', {
          bubbles: true,
          composed: true,
        })
        this.dispatchEvent(event)
      })

      restartButton.addEventListener('click', () => {
        const event = new CustomEvent('addition-start', {
          bubbles: true,
          composed: true,
          })
        this.dispatchEvent(event)
      })

      this.label.textContent = 'Bra jobbat! Vad vill du göra nu?'
      this.input.remove()
      this.submit.remove()
    }
  }


  generateNewQuestion(numbers) { 
    const numbersToAdd = this.arrayGenerator.getRandomArray(this.low, (this.high + 1), numbers)
    let question = 'What is '
    for (let i = 0; i < numbersToAdd.length; i++) {
      question += numbersToAdd[i]
      if (i < (numbersToAdd.length - 1)) {
        question += ' + '
      } 
    }
    this.h1.textContent = question
    this.correctAnswer = numbersToAdd.reduce((acc, num) => acc + num, 0)
}

connectedCallback() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault()
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
        this.score.textContent = 'Poäng: ' + this.scoreCount + '/' + (this.currentRound + 1)
      } else {
        this.h1.textContent = wrongMessages[indexWrong]
        this.score.textContent = 'Poäng: ' + this.scoreCount + '/' + (this.currentRound + 1)
      }

      setTimeout(() => {
        this.currentRound += 1
        this.startRound()
      }, 1000)
    })
  }
})