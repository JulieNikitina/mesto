export {
  openPopup,
  closePopup,
  openAddCardPopup,
  openEditProfilePopup,
  fieldName,
  fieldDescription,
  formAddCard,
  formEditProfile,
  popupAddCard,
  popupEditProfile,
  popupPhotoView,
  popupPhotoCapture,
  popupPhoto
}
import {FormValidator} from "./classes/FormValidator.js";

// попапы
const popups = document.querySelectorAll('.popup');

// попап редактирования
const popupEditProfile = document.querySelector('#profileForm');

// форма редактирования
const formEditProfile = popupEditProfile.querySelector('.form');

// получение текущих значений имени и описания профиля
const currentName = document.querySelector('.profile__name');
const currentDescription = document.querySelector('.profile__description');

// поля формы редактирования профиля
const fieldName = formEditProfile.querySelector('#name-input');
const fieldDescription = formEditProfile.querySelector('#description-input');

// попап добавления
const popupAddCard = document.querySelector('#addCardForm');

// форма добавления
const formAddCard = popupAddCard.querySelector('.form')

// попап просмотра фото
const popupPhotoView = document.querySelector('#viewPhoto');

// фото и описание в попапе просмотра фото
const popupPhoto = popupPhotoView.querySelector('.popup__photo');
const popupPhotoCapture = popupPhotoView.querySelector('.popup__photo-caption');

// кнопки закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close-button');

// параметры валидации
const currentParams = {
  formSelector: '.form',
  inputSelector: '.form__input-field',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input-field_error',
  errorClass: 'form__input-error_active'
}

// создание объектов валидатора
const formEditProfileValidator = new FormValidator(formEditProfile, currentParams);
formEditProfileValidator.enableValidation()

const formAddCardValidator = new FormValidator(formAddCard, currentParams);
formAddCardValidator.enableValidation()

// функция открытия попапа
function openPopup(popup){
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closeByEsc);
}

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown',closeByEsc)
}

// функция закрытия попапа по esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_active')
    closePopup(popup);
  }
}

// функция открытия попапа добавления нового элемента
function openAddCardPopup(){
  openPopup(popupAddCard);
  formAddCard.reset();
  formAddCardValidator.resetPopupValidationState()
}

// функция открытия попапа редактирования профиля
function openEditProfilePopup(){
  openPopup(popupEditProfile)
  fieldName.value = currentName.textContent;
  fieldDescription.value = currentDescription.textContent;
  formEditProfileValidator.resetPopupValidationState()
}

// функция закрытия попапа по клику на оверлей
function closeOverlay(evt){
  if (evt.target===evt.currentTarget) {
    closePopup(evt.currentTarget)
  }
}

// добавление слушателей закрытия на попапы
popups.forEach(function (popup){
  popup.addEventListener('click', closeOverlay)
})

// добавление слушателей на кнопку закрытия попапов
closeButtons.forEach(function (button) {
  const popup = button.closest('.popup')
  button.addEventListener('click', function(evt) {closePopup(popup)});
})
