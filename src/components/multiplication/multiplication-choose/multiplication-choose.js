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

     this.submitButton.addEventListener('click', () => {
        const multiplicationTable = this.shadowRoot.querySelector('#numberChoose').value;
        const numberOfRounds = this.shadowRoot.querySelector('#numberRounds').value;
        const numberHigh = this.shadowRoot.querySelector('#numberHigh').value;
        const numberLow = this.shadowRoot.querySelector('#numberLow').value;
        const event = new CustomEvent('start-multiplication-game', {
          detail: { table: multiplicationTable, rounds: numberOfRounds, high: numberHigh, low: numberLow },
          bubbles: true,
          composed: true,
        })
        this.dispatchEvent(event)
  })
 }

 loadExternalCss() {
  const link = document.createElement('link')
      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('href', '../../../public/css/styles.css')
      this.shadowRoot.appendChild(link)
}
})