class FilledButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    async connectedCallback() {
      const style = document.createElement('style');
      try {
        // Update this path to wherever Vite outputs buttons-all.css
        const response = await fetch('/dist/buttons-all.css');
        if (!response.ok) {
          throw new Error('Failed to load buttons-all.css');
        }
        const cssText = await response.text();
        style.textContent = cssText;
      } catch (error) {
        console.error(error);
        // Fallback: minimal inline styles
        style.textContent = `
          .filled-button {
            background: #CCC;
            color: #333;
          }
        `;
      }
  
      const button = document.createElement('button');
      button.classList.add('filled-button');
      button.textContent = this.getAttribute('label') || 'Filled Button';
  
      if (this.hasAttribute('disabled')) {
        button.disabled = true;
      }
  
      // Attach style + button to the shadow root
      this.shadowRoot.append(style, button);
    }
  }
  
  customElements.define('filled-button', FilledButton);
  
  