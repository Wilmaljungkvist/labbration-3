import { NumberGenerator } from "slumpgenerator";

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
    background-color: #ff66b2;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
}

button[type="submit"]:hover {
    background-color: #ff3385;
}
</style>
<div class="container">
    <h1></h1>
    <form>
    <label for="answer">Please write your answer: </label>
    <input id='numberAnswer' name="answer" type="number" placeholder="Write and press enter">
    <button type="submit">Submit</button>
</form>
  <div>
`

customElements.define('multiplication-question', class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

      this.numberGenerator = new NumberGenerator()
      this.h1 = this.shadowRoot.querySelector('h1')
      this.form = this.shadowRoot.querySelector('form')
      this.correctAnswer = 0
      this.currentRound = 0
      this.totalRounds = 0
      this.table = 0
  }

  initialize(table, rounds) {
    this.totalRounds = Number.parseInt(rounds)
    this.table = Number.parseInt(table)

    const generateQuestionsForRound = (round) => {
        if (this.currentRound <= this.totalRounds) {
            this.generateNewQuestion(table, round)
        }
    }

    generateQuestionsForRound(1)
}


  generateNewQuestion(table, round) {
    let thisRound = Number.parseInt(round)
    console.log(thisRound)
    console.log(this.round)
      const num1 = Number.parseInt(table)
      const num2 = this.numberGenerator.getRandomInt(0, num1)

    this.correctAnswer = num1 * num2
    this.h1.textContent = `What is ${num1} x ${num2}?`
    this.round += 1
}

connectedCallback() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault()
      const userAnswer = parseInt(this.shadowRoot.querySelector('#numberAnswer').value)
      if (userAnswer === this.correctAnswer) {
        this.h1.textContent = 'Correct!'
      } else {
        this.h1.textContent = 'Incorrect. Try again.'
      }

      setTimeout(() => {
        this.initialize(this.table, this.totalRounds)
        this.currentRound += 1
      }, 1000)
    })
  }
})