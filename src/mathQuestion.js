export class MathQuestion {
    constructor() {
        this.question = ''
        this.correctAnswer = 0
    }

    generateNewQuestion() {
        const num1 = Math.floor(Math.random() * 10)
        const num2 = Math.floor(Math.random() * 10)

        this.correctAnswer = num1 * num2
        this.question = `What is ${num1} x ${num2}?`
    }
}