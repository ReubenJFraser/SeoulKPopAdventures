class TextButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    async connectedCallback() {
      const style = document.createElement('style');
      try {
        // Update this path if needed (e.g., "/dist/buttons-all.css")
        const response = await fetch('/dist/buttons-all.css');
        if (!response.ok) {
          throw new Error('Failed to load buttons-all.css');
        }
        const cssText = await response.text();
        style.textContent = cssText;
      } catch (error) {
        console.error(error);
        // Fallback inline styles
        style.textContent = `
          .text-button {
            color: #333;
          }
        `;
      }
  
      const button = document.createElement('button');
      button.classList.add('text-button');
      button.textContent = this.getAttribute('label') || 'Text Button';
  
      if (this.hasAttribute('disabled')) {
        button.disabled = true;
      }
  
      this.shadowRoot.append(style, button);
    }
  }
  
  customElements.define('text-button', TextButton);
  
  