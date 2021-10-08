import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({validator, handleFormSubmit}, popupSelector) {
    super(popupSelector);
    this._validator = validator;
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    this.submitButton  = this._form.querySelector('.form__submit-button');
  }

  _getInputValues() {
    const inputList = Array.from(this._validator._formElement.querySelectorAll(this._validator._validationParams.inputSelector));
    this._element = {};
    inputList.forEach((input) => {
      this._element[input.name] = input.value;
    });
    return this._element;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._form.reset();
      this.close();
    });
    super.setEventListeners();
  }
  close() {
    super.close();
  }
  open() {
    this._form.reset();
    this._validator.resetPopupValidationState()
    super.open();
  }
}
