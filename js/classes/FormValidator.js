export class FormValidator {
  constructor(formElement, validationParams) {
    this._validationParams = validationParams;
    this._formElement = formElement;
  }

// функция проверки валидации и вызова отображения/скрытия ошибки
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

// функция отображения ошибки валидации
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationParams.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationParams.errorClass);
  };

// функция скрытия ошибки валидации
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationParams.inputErrorClass);
    errorElement.classList.remove(this._validationParams.errorClass);
    errorElement.textContent = '';
  };

// функция добавления слушателей и вызова функции проверки полей
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._validationParams.inputSelector));
    const buttonElement = this._formElement.querySelector(this._validationParams.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement, this._validationParams.inactiveButtonClass);
      });
    });
  };

// проверка валидности массива полей
  _hasInvalidInput(inputList) {
    return inputList.some(input => !input.validity.valid)
  };

// функция изменения состояни активности кнопки сохранения формы
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._validationParams.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._validationParams.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  // функция валидации открываемого попапа
  resetPopupValidationState() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._validationParams.inputSelector));
    const submitButton = this._formElement.querySelector(this._validationParams.submitButtonSelector);
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
    this._toggleButtonState(inputList,submitButton);
  }

// функция включения валидации
  enableValidation() {
    this._setEventListeners();
  };

}
