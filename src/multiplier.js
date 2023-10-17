export class Multiplication {
    constructor() {
        this.numberAnswer = document.querySelector('#numberAnswer')
        this.answerForm = document.querySelector('#answerForm')
        this.heading = document.querySelector('h1')

        this.answerForm.addEventListener('submit', this.handleSubmit.bind(this))
    }

    handleSubmit(event) {
        event.preventDefault()
        const inputValue = this.numberAnswer.value
        this.heading.textContent = "Your Answer: " + inputValue
    }
}