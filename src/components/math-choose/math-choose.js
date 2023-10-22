const template = document.createElement('template')
template.innerHTML = `
<div class="container">
    <h1>Vad vill du öva på?</h1>
    <form>
        <button class="multiplication">Multiplikation</button>
        <button class="addition">Addition</button>
</form>
  <div>
`

customElements.define('math-choose',
  class extends HTMLElement {
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

        this.#loadExternalCss()

        this.#initializeVariables()

        this.dispatchAdditionEvent()
        this.dispatchMultiplicationEvent()
        // TODO: implement division and subtraction.
    }

    /**
     * Dispatch event if addition is selected. 
     */
    dispatchAdditionEvent() {
      this.addition.addEventListener('click', () => {
      const event = new Event('addition-selected', {bubbles: true, composed: true})
      this.dispatchEvent(event)
      })
    }

    /**
     * Dispatch event if multiplication is selected. 
     */
    dispatchMultiplicationEvent() {
      this.multiplication.addEventListener('click', () => {
        const event = new Event('multiplication-selected', {bubbles: true, composed: true})
        this.dispatchEvent(event)
      })
    }

    #initializeVariables() {
      this.multiplication = this.shadowRoot.querySelector('.multiplication')
      this.subtraction = this.shadowRoot.querySelector('.subtraction')
      this.addition = this.shadowRoot.querySelector('.addition')
      this.division = this.shadowRoot.querySelector('.division')
    }

    #loadExternalCss() {
      const link = document.createElement('link')
          link.setAttribute('rel', 'stylesheet')
          link.setAttribute('href', '../../../public/css/styles.css')
          this.shadowRoot.appendChild(link)
    }
  })