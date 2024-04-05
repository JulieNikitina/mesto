// параметры валидации
export const currentParams = {
  formSelector: '.form',
  inputSelector: '.form__input-field',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input-field_error',
  errorClass: 'form__input-error_active'
}

// получение текущих значений имени и описания профиля
export const userInfoSelectors = {nameSelector: '.profile__name', descriptionSelector: '.profile__description'};

// селекторы
export const ELEMENTS_CONTAINER_SELECTOR = '.elements';
export const CARD_TEMPLATE_SELECTOR = '#element-template';
export const POPUP_WITH_PHOTO_SELECTOR = '#viewPhoto';
export const POPUP_EDIT_FORM_SELECTOR = '#profileForm';
export const POPUP_PHOTO_PROFILE_SELECTOR = '#profileImageForm';
export const POPUP_ADD_CARD_FORM_SELECTOR = '#addCardForm';
export const POPUP_DELETE_CARD_SELECTOR = '#deleteImagePopup';
export const POPUP_PHOTO_SELECTOR = '.popup__photo';
export const POPUP_PHOTO_CAPTION_SELECTOR = '.popup__photo-caption';

// параметры для Api
export const BASE_ROUTE = 'https://mesto.nomoreparties.co/v1/cohort-28';
export const TOKEN = '0760ddfd-b432-4756-af57-8cde608b855b';

// параметры авторизации
export const AUTORIZATION_PARAMS = {
  baseRoute: BASE_ROUTE,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
}
