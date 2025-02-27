class FilledTonalButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    async connectedCallback() {
      const style = document.createElement('style');
      try {
        // Change "/dist/buttons-all.css" if needed to match your actual path
        const response = await fetch('/dist/buttons-all.css');
        if (!response.ok) {
          throw new Error('Failed to load buttons-all.css');
        }
        const cssText = await response.text();
        style.textContent = cssText;
      } catch (error) {
        console.error(error);
        style.textContent = `
          .filled-tonal-button {
            background: #EEE;
            color: #333;
          }
        `;
      }
  
      const button = document.createElement('button');
      button.classList.add('filled-tonal-button');
      button.textContent = this.getAttribute('label') || 'Tonal Button';
  
      if (this.hasAttribute('disabled')) {
        button.disabled = true;
      }
  
      // Attach the style + button to the shadow root
      this.shadowRoot.append(style, button);
    }
  }
  
  customElements.define('filled-tonal-button', FilledTonalButton);
  
  