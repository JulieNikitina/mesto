import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({handleConfirmation}, popupSelector) {
    super(popupSelector);
    this._handleConfirmation = handleConfirmation;
    this._form = this._popup.querySelector('.form');
    this.submitButton  = this._form.querySelector('.form__submit-button');
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleConfirmation(this.cardID, this.card);
    });
    super.setEventListeners();
  }

  open(cardID, card) {
    this.cardID = cardID;
    this.card = card;
    this.submitButton.focus();
    super.open();
  }

  close() {
    super.close();
  }
}
