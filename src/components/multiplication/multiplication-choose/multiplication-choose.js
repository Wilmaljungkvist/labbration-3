const template = document.createElement('template');
template.innerHTML = `
  <style>
    .container {
    width: 100%;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    text-align: center; 
}

button {
    background-color: #ff66b2;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
}

button[type="submit"]:hover {
    background-color: #ff3385;
}
</style>
<div class="container">
    <h1>Multiplikation inställningar</h1>
    <form>
    <label> Vilken multiplikationstabell vill du öva på?</label>
    <input id='numberChoose' name="numberChoose" type="number">
    <label> Hur många rundor?</label>
    <input id='numberRounds' name="numberRounds" type="number" min="1">
    <label> Vilket vill du ha som högsta numret att multiplicera med?</label>
    <input id='numberRounds' name="numberRounds" type="number">
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

      this.submitButton = this.shadowRoot.querySelector('button')

     this.submitButton.addEventListener('click', () => {
        const multiplicationTable = this.shadowRoot.querySelector('#numberChoose').value;
        const numberOfRounds = this.shadowRoot.querySelector('#numberRounds').value;
        const event = new CustomEvent('start-multiplication-game', {
          detail: { table: multiplicationTable, rounds: numberOfRounds },
          bubbles: true,
          composed: true,
        })
        this.dispatchEvent(event)
  })
 }
})