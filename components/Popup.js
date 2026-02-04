class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    // Escape key handler must be arrow function so "this" stays the class
    this._handleEscapeClose = (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    };
  }

  open() {
    this._popup.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscapeClose);
  }

  close() {
    this._popup.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  setEventListeners() {
    // close button
    const closeButton = this._popup.querySelector(".popup__close");
    closeButton.addEventListener("click", () => this.close());

    // overlay click (outside the form)
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}

export default Popup;
