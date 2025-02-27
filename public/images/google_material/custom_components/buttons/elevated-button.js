// elevated-button.js
class ElevatedButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    async connectedCallback() {
      // Create a <style> element
      const style = document.createElement("style");
  
      // Fetch the compiled "buttons-all.css" from your build output
      try {
        // If your build places it in /dist, update this path as needed
        const response = await fetch("/dist/buttons-all.css");
        if (!response.ok) {
          throw new Error("Failed to load buttons-all.css");
        }
        const cssText = await response.text();
        style.textContent = cssText;
      } catch (error) {
        console.error(error);
        // Fallback: inline minimal styles
        style.textContent = `
          .elevated-button {
            background-color: #EEE;
            color: #333;
          }
        `;
      }
  
      // Create the <button> and apply .elevated-button
      const button = document.createElement("button");
      button.classList.add("elevated-button");
      button.textContent = this.getAttribute("label") || "Button";
  
      // If "disabled" attribute is present, set disabled state
      if (this.hasAttribute("disabled")) {
        button.disabled = true;
      }
  
      // Attach the style + button to the shadow root
      this.shadowRoot.append(style, button);
    }
  }
  
  customElements.define("elevated-button", ElevatedButton);
  

