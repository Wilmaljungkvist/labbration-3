import { NumberGenerator } from 'slumpgenerator'
import { MathQuestion } from './mathQuestion'

export class Multiplication {

    constructor() {
        this.correct = document.querySelector('.correctAnswers')
        this.question = new MathQuestion()
        this.numberGenerator = new NumberGenerator()
        this.numberAnswer = document.querySelector('#numberAnswer')
        this.answerForm = document.querySelector('#answerForm')
        this.heading = document.querySelector('h1')
        this.p = document.querySelector('.correct')

        this.answerForm.addEventListener('submit', this.handleSubmit.bind(this))
        this.generateNewQuestion()
    }

    handleSubmit(event) {
        event.preventDefault()
        const inputValue = this.numberAnswer.value

        if (parseInt(inputValue) === this.question.correctAnswer) {
            this.p.textContent = 'Correct!'
            const score = Number.parseInt(this.correct.textContent)
            this.correct.textContent = (score + 1).toString()
        } else {
            this.p.textContent = 'Incorrect. Try again.'
        }
        this.numberAnswer.value = ''
        this.generateNewQuestion()
    }

    generateNewQuestion() {
        this.question.generateNewQuestion()
        this.heading.textContent = this.question.question
    }
}