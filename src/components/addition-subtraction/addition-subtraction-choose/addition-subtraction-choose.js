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
    margin: 20px; 
    background-color: #ff66b2;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
}

input {
    display: block;
    margin-top: 5px;
    width: 100%;
}

button[type="submit"]:hover {
    background-color: #ff3385;
}
</style>
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
  
        this.submitButton = this.shadowRoot.querySelector('button')
  
       this.submitButton.addEventListener('click', () => {
          const numbersAdd = this.shadowRoot.querySelector('#numberChoose').value;
          const numberOfRounds = this.shadowRoot.querySelector('#numberRounds').value;
          const numberHigh = this.shadowRoot.querySelector('#numberHigh').value;
          const numberLow = this.shadowRoot.querySelector('#numberLow').value;
          const event = new CustomEvent('start-addition-game', {
            detail: { numbers: numbersAdd, rounds: numberOfRounds, high: numberHigh, low: numberLow },
            bubbles: true,
            composed: true,
          })
          this.dispatchEvent(event)
    })
   }
})