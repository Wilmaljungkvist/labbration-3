import { NumberGenerator } from 'slumpgenerator'

export class Multiplication {

    constructor() {
        this.numberGenerator = new NumberGenerator
        this.numberAnswer = document.querySelector('#numberAnswer')
        this.answerForm = document.querySelector('#answerForm')
        this.heading = document.querySelector('h1')

        this.answerForm.addEventListener('submit', this.handleSubmit.bind(this))
    }

    handleSubmit(event) {
        event.preventDefault()
        const inputValue = this.numberAnswer.value
        this.heading.textContent = this.numberGenerator.getRandomInt(Number.parseInt(inputValue), (Number.parseInt(inputValue) + 10))
    }
}