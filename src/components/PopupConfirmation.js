import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({handleConfirmation}, popupSelector) {
    super(popupSelector);
    this._handleConfirmation = handleConfirmation;
    this._form = this._popup.querySelector('.form');
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleConfirmation();
      this.close();
    });
    super.setEventListeners();
  }
  open(deleteCard) {
    this.deleteCard = deleteCard;
    super.open();
  }
  close() {
    super.close();
  }
}
