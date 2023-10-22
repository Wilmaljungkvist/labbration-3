const template = document.createElement('template')
template.innerHTML = `
<div class="container">
    <h1>Addition inställningar</h1>
    <form>
    <br><label>Hur många termer vill du ha? </label>
    <input id='numberChoose' name="numberChoose" type="number" min="2" value="2">
    <br><label>Hur många rundor?</label>
    <input id='numberRounds' name="numberRounds" type="number" min="1" value="1">
    <br><label>Högsta numret att addera med?</label>
    <input id='numberHigh' name="numberHigh" type="number" value="0">
    <br><label>Lägsta numret att addera med?</label>
    <input id='numberLow' name="numberLow" type="number" value="0">
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
    this.setEventListener()
   }

   setEventListener() {
    this.#submitButton.addEventListener('click', () => { this.getAdditionSetting() })
   }

   loadExternalCss() {
    const link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href', '/css/styles.css')
        this.shadowRoot.appendChild(link)
    }

    /**
     * Get the settings to the addition. 
     * Throws an error if highest number is smaller than lowest number. 
     */
    getAdditionSetting() {
      const numbers = this.shadowRoot.querySelector('#numberChoose').value
      const rounds = this.shadowRoot.querySelector('#numberRounds').value
      const highestNumber = this.shadowRoot.querySelector('#numberHigh').value

      const lowestNumber = this.shadowRoot.querySelector('#numberLow')

      const minValue = Number.parseInt(highestNumber) - 1
      this.#handleHighestLowestNumber(minValue, lowestNumber, rounds)

      if(this.#handleErrors(lowestNumber.value, highestNumber)) {
      this.dispatchAdditionSettingsEvent(numbers, rounds, highestNumber, lowestNumber.value)
      } 
    }

    #handleHighestLowestNumber(minValue, lowestNumber) {
      lowestNumber.setAttribute('min', minValue)
    }

    /**
     * Dispatches the event with the addition settings. 
     */
    dispatchAdditionSettingsEvent (numbers, rounds, highestNumber, lowestNumber) {
      const event = new CustomEvent('start-addition-game', {
        detail: { numbers: numbers, rounds: rounds, high: highestNumber, low: lowestNumber },
        bubbles: true,
        composed: true,
      })
      this.dispatchEvent(event)
    }

    /**
     * Throws error if the smallest number is greater than the bigger number.
     */
    #handleErrors(lowest, highest, rounds) {
      if(lowest > highest) {
        throw new Error('The highest number must greater than the lowest!')
      } else if (rounds < 1) {
        throw new Error('The rounds needs to be 1 or bigger.')
      } else {
        return true
      }
    }
})