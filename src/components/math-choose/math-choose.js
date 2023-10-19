const template = document.createElement('template')
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

button:hover {
    background-color: #ff3385;
}
</style>
<div class="container">
    <h1>Vad vill du öva på?</h1>
    <form>
        <button class="multiplication">Multiplikation</button>
        <button class="addition">Addition</button>
        <button class="subtraction">Subtraktion</button>
</form>
  <div>
`

customElements.define('math-choose',
  class extends HTMLElement {
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

        this.multiplication = this.shadowRoot.querySelector('.multiplication')
        this.subtraction = this.shadowRoot.querySelector('.subtraction')
        this.addition = this.shadowRoot.querySelector('.addition')

        this.multiplication.addEventListener('click', () => {
          const event = new Event('multiplication-selected', {bubbles: true, composed: true})
          this.dispatchEvent(event)
        })

        this.addition.addEventListener('click', () => {
          const event = new Event('addition-selected', {bubbles: true, composed: true})
          this.dispatchEvent(event)
        })

        this.subtraction.addEventListener('click', () => {
          const event = new Event('subtraction-selected', {bubbles: true, composed: true})
          this.dispatchEvent(event)
        })
    }
  }
)