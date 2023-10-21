const template = document.createElement('template');
template.innerHTML = `
<div class="container">
    <h1>Multiplikation inställningar</h1>
    <form>
    <br><label>Vilken multiplikationstabell vill du öva på?</label>
    <input id='numberChoose' name="numberChoose" type="number">
    <br><label>Hur många rundor?</label>
    <input id='numberRounds' name="numberRounds" type="number" min="1">
    <br><label>Högsta numret att multiplicera med?</label>
    <input id='numberHigh' name="numberHigh" type="number">
    <br><label>Lägsta numret att multiplicera med?</label>
    <input id='numberLow' name="numberLow" type="number">
    <button type="submit">Skicka</button>
</form>
  <div>
`

customElements.define('multiplication-choose', 
class extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

      this.loadExternalCss()

      this.submitButton = this.shadowRoot.querySelector('button')

      this.submitMultiplicationSettings()
 }

 submitMultiplicationSettings() {
  this.submitButton.addEventListener('click', () => {
    this.multiplicationTable = this.shadowRoot.querySelector('#numberChoose').value
    this.numberOfRounds = this.shadowRoot.querySelector('#numberRounds').value
    this.numberHigh = this.shadowRoot.querySelector('#numberHigh').value
    this.numberLow = this.shadowRoot.querySelector('#numberLow').value
    this.dispatchStartMultiplicationEvent()
})
 }

 dispatchStartMultiplicationEvent() {
  const event = new CustomEvent('start-multiplication-game', {
    detail: { table: this.multiplicationTable, rounds: this.numberOfRounds, high: this.numberHigh, low: this.numberLow },
    bubbles: true,
    composed: true,
  })
  this.dispatchEvent(event)
 }

 loadExternalCss() {
  const link = document.createElement('link')
      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('href', '../../../public/css/styles.css')
      this.shadowRoot.appendChild(link)
}
})