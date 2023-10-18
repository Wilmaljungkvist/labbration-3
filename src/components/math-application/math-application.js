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

button[type="submit"]:hover {
    background-color: #ff3385;
}
</style>
<div class="container">
    <h1>Vad vill du öva på?</h1>
    <form>
        <button>Multiplikation</button>
        <button>Addition</button>
        <button>Subtraktion</button>
</form>
  <div>
`

customElements.define('math-application',
  class extends HTMLElement {
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }
  }
)