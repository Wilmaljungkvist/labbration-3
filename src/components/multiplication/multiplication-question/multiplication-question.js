import { NumberGenerator, ArrayGenerator } from "slumpgenerator";

const template = document.createElement('template');
template.innerHTML = `
  <style>
    .container {
    width: 100%;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    text-align: center; 
}

button {
    margin: 20px; 
    background-color: #ff66b2;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #ff3385;
}
</style>
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

customElements.define('multiplication-question', class extends HTMLElement {
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
      this.table = 0
      this.scoreCount = 0
      this.high = 0
      this.low = 0
  }

  initialize(table, rounds, high, low) {
    this.totalRounds = Number.parseInt(rounds)
    this.table = Number.parseInt(table)
    this.high = Number.parseInt(high)
    this.low = Number.parseInt(low)
    this.currentRound = 0
    this.startRound()
}


  startRound() {
    this.input.value = ''
    if (this.currentRound < this.totalRounds) {
      this.generateNewQuestion(this.table)
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
        const event = new CustomEvent('multiply-start', {
          bubbles: true,
          composed: true,
          })
        this.dispatchEvent(event)
        console.log('Disatches event!')
      })

      this.label.textContent = 'Bra jobbat! Vad vill du göra nu?'
      this.input.remove()
      this.submit.remove()
    }
  }


  generateNewQuestion(table) {
      const num1 = Number.parseInt(table)
      const num2 = this.numberGenerator.getRandomInt(this.low, (this.high + 1))

    this.correctAnswer = num1 * num2
    this.h1.textContent = `What is ${num1} x ${num2}?`
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