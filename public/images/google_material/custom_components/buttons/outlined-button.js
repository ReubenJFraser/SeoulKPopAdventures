class OutlinedButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    async connectedCallback() {
      const style = document.createElement("style");
  
      try {
        // Fetch your single aggregated buttons-all.css
        const response = await fetch("/dist/buttons-all.css");
        if (!response.ok) {
          throw new Error("Failed to load buttons-all.css");
        }
        const cssText = await response.text();
        style.textContent = cssText;
      } catch (error) {
        console.error(error);
        // Fallback: minimal inline styles
        style.textContent = `
          .outlined-button {
            border: 1px solid #aaa;
            color: #aaa;
            background-color: transparent;
          }
        `;
      }
  
      const button = document.createElement("button");
      button.classList.add("outlined-button");
      button.textContent = this.getAttribute("label") || "Outlined Button";
  
      if (this.hasAttribute("disabled")) {
        button.disabled = true;
      }
  
      // Attach <style> + <button> to the shadow root
      this.shadowRoot.append(style, button);
    }
  }
  
  customElements.define("outlined-button", OutlinedButton);
  
  