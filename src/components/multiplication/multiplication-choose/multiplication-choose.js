const template = document.createElement('template');
template.innerHTML = `
<div class="container">
    <h1>Multiplikation inställningar</h1>
    <form>
    <br><label>Vilken multiplikationstabell vill du öva på?</label>
    <input id='numberChoose' name="numberChoose" type="number" value="1">
    <br><label>Hur många rundor?</label>
    <input id='numberRounds' name="numberRounds" type="number" min="1" value="1">
    <br><label>Högsta numret att multiplicera med?</label>
    <input id='numberHigh' name="numberHigh" type="number" value="0">
    <br><label>Lägsta numret att multiplicera med?</label>
    <input id='numberLow' name="numberLow" type="number" value="0">
    <button type="submit">Skicka</button>
</form>
  <div>
`

customElements.define('multiplication-choose', 
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
    this.#submitButton.addEventListener('click', () => { this.getMultiplicationSettings() })
   }

  loadExternalCss() {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', '../../../public/css/styles.css')
    this.shadowRoot.appendChild(link)
  }

  /**
   * Get settings to the multiplication.
   * Throws an error ig highest number is smaller than the lowest number. 
   */
  getMultiplicationSettings() {
  const multiplicationTable = this.shadowRoot.querySelector('#numberChoose').value
  const rounds = this.shadowRoot.querySelector('#numberRounds').value
  const highestNumber = this.shadowRoot.querySelector('#numberHigh').value

  const lowestNumber = this.shadowRoot.querySelector('#numberLow')

  const minValue = Number.parseInt(highestNumber) - 1
    this.#handleHighestLowestNumber(minValue, lowestNumber)

    if(this.#handleErrors(lowestNumber.value, highestNumber)) {
      this.dispatchStartMultiplicationEvent(multiplicationTable, rounds, highestNumber, lowestNumber.value)
    } 
  }

 #handleHighestLowestNumber(minValue, lowestNumber) {
  lowestNumber.setAttribute('min', minValue)
}

/**
 * Dispatches the event with the multiplication settings. 
 */
 dispatchStartMultiplicationEvent(table, rounds, high, low) {
  const event = new CustomEvent('start-multiplication-game', {
    detail: { table: table, rounds: rounds, high: high, low: low},
    bubbles: true,
    composed: true,
  })
  this.dispatchEvent(event)
 }


  /**
  * Throws error if the smallest number is greater than the bigger number.
  */
  #handleErrors(lowest, highest) {
    if(lowest > highest) {
      throw new Error('The highest number must greater than the lowest!')
    } else {
      return true
    }
  } 
})