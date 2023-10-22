const template = document.createElement('template');
template.innerHTML = `
<div class="container">
    <h1>Addition inställningar</h1>
    <form>
    <br><label>Hur många termer vill du ha? </label>
    <input id='numberChoose' name="numberChoose" type="number" min="2">
    <br><label>Hur många rundor?</label>
    <input id='numberRounds' name="numberRounds" type="number" min="1">
    <br><label>Högsta numret att addera med?</label>
    <input id='numberHigh' name="numberHigh" type="number">
    <br><label>Lägsta numret att addera med?</label>
    <input id='numberLow' name="numberLow" type="number">
    <button type="submit">Skicka</button>
</form>
  <div>
`

customElements.define('addition-choose', 

class extends HTMLElement {
  #submitButton
  
    constructor() {
      super()
  
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
  
        this.#submitButton = this.shadowRoot.querySelector('button')

        this.loadExternalCss()
        this.submitAdditionSetting()
        this.setEventListener()
   }

   setEventListener() {
    this.#submitButton.addEventListener('click', () => { this.submitAdditionSetting() })
   }

   loadExternalCss() {
    const link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href', '../../../public/css/styles.css')
        this.shadowRoot.appendChild(link)
  }

  submitAdditionSetting() {
      const numbers = this.shadowRoot.querySelector('#numberChoose').value
      const rounds = this.shadowRoot.querySelector('#numberRounds').value
      const highestNumber = this.shadowRoot.querySelector('#numberHigh').value
      const lowestNumber = this.shadowRoot.querySelector('#numberLow')
      const minValue = Number.parseInt(highestNumber) - 1
      this.handleHighestLowestNumber(minValue, lowestNumber)

      if(lowestNumber.value <= highestNumber) {
      this.dispatchStartAddition(numbers, rounds, highestNumber, lowestNumber.value)
      } else {
        throw new Error('The highest number must greater than the lowest!')
      }

    }

    handleHighestLowestNumber(minValue, lowestNumber) {
      lowestNumber.setAttribute('min', minValue)
    }

    dispatchStartAddition (numbers, rounds, highestNumber, lowestNumber) {
      const event = new CustomEvent('start-addition-game', {
        detail: { numbers: numbers, rounds: rounds, high: highestNumber, low: lowestNumber },
        bubbles: true,
        composed: true,
      })
      this.dispatchEvent(event)
    }
})