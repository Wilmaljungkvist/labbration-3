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
    constructor() {
      super()
  
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

        this.loadExternalCss()
  
        this.submitButton = this.shadowRoot.querySelector('button')

        this.submitAdditionSetting()
   }

   loadExternalCss() {
    const link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href', '../../../public/css/styles.css')
        this.shadowRoot.appendChild(link)
  }

  submitAdditionSetting() {
    this.submitButton.addEventListener('click', () => {
      this.numbersAdd = this.shadowRoot.querySelector('#numberChoose').value
      this.numberOfRounds = this.shadowRoot.querySelector('#numberRounds').value
      this.numberHigh = this.shadowRoot.querySelector('#numberHigh').value
      this.numberLow = this.shadowRoot.querySelector('#numberLow').value
      this.dispatchStartAddition()
  }
    )}

    dispatchStartAddition () {
      const event = new CustomEvent('start-addition-game', {
        detail: { numbers: this.numbersAdd, rounds: this.numberOfRounds, high: this.numberHigh, low: this.numberLow },
        bubbles: true,
        composed: true,
      })
      this.dispatchEvent(event)
    }
})