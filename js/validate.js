// текущие параметры валидации
const currentParams = {
  formSelector: '.form',
  inputSelector: '.form__input-field',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input-field_error',
  errorClass: 'form__input-error_active'
}

// функция проверки валидации и вызова отображения/скрытия ошибки
function isValid(formElement, inputElement, validationParams){
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationParams);
  } else {
    hideInputError(formElement, inputElement, validationParams);
  }
};

// функция отображения ошибки валидации
function showInputError(formElement, inputElement, errorMessage, validationParams){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationParams.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationParams.errorClass);
};

// функция скрытия ошибки валидации
function hideInputError(formElement, inputElement,validationParams ){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationParams.inputErrorClass);
  errorElement.classList.remove(validationParams.errorClass);
  errorElement.textContent = '';
};

// функция добавления слушателей и вызова функции проверки полей
function setEventListeners(formElement, validationParams){
  const inputList = Array.from(formElement.querySelectorAll(validationParams.inputSelector));
  const buttonElement = formElement.querySelector(validationParams.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationParams);
      toggleButtonState(inputList, buttonElement, validationParams.inactiveButtonClass);

    });
  });
};

// проверка валидности массива полей
function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid)
};

// функция изменения состояни активности кнопки сохранения формы
function toggleButtonState(inputList, buttonElement, buttonInactiveClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(buttonInactiveClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(buttonInactiveClass);
    buttonElement.removeAttribute('disabled');
  }
};

// функция включения валидации
function enableValidation(validationParams) {
  const formList = Array.from(document.querySelectorAll(validationParams.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationParams);
  });
};

// вызов функции включения валидации на странице
enableValidation(currentParams);



