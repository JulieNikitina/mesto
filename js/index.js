export { openPopup, popupPhotoView, popupPhotoCapture, popupPhoto }
import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

// контейнер с карточками
const elementsContainer = document.querySelector('.elements');
// шаблон элемента-карточки
const elementTemplate = document.querySelector('#element-template').content;
// кнопка редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
// кнопка добавления нового элемента
const addButton = document.querySelector('.profile__add-button');

// попапы
const popups = document.querySelectorAll('.popup');

// попап редактирования
const popupEdit = document.querySelector('#profileForm');
// форма редактирования
const editForm = popupEdit.querySelector('.form');
// получение текущих значений имени и описания профиля
const currentName = document.querySelector('.profile__name');
const currentDescription = document.querySelector('.profile__description');
// поля формы редактирования профиля
const fieldName = editForm.querySelector('#name-input');
const fieldDescription = editForm.querySelector('#description-input');

// попап добавления
const popupAdd = document.querySelector('#addCardForm');
// форма добавления
const addForm = popupAdd.querySelector('.form')
// поля формы добавления элемента
const fieldTitle = addForm.querySelector('#title-input');
const fieldLink = addForm.querySelector('#url-input');

// попап просмотра фото
const popupPhotoView = document.querySelector('#viewPhoto');
// фото и описание в попапе просмотра фото
const popupPhoto = popupPhotoView.querySelector('.popup__photo');
const popupPhotoCapture = popupPhotoView.querySelector('.popup__photo-caption');

// кнопки закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close-button');

// исходный массив карточек
const initialCards = [
  {
    name: 'Аршан',
    link: './images/elements/elements-arshan.JPG'
  },
  {
    name: 'Большая Байкальская Тропа',
    link: './images/elements/elements-bbt.JPG'
  },
  {
    name: 'Мамай',
    link: './images/elements/elements-mamay.JPG'
  },
  {
    name: 'Тажеранские степи',
    link: './images/elements/elements-tazherany.JPG'
  },
  {
    name: 'Бухта Ая',
    link: './images/elements/elements-aya.JPG'
  },
  {
    name: 'Ольхон',
    link: './images/elements/elements-olkhon.JPG'
  },
];

// параметры валидации
const currentParams = {
  formSelector: '.form',
  inputSelector: '.form__input-field',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input-field_error',
  errorClass: 'form__input-error_active'
}

// функция добавления элемента в контейнер
function addCard(element){
  const card = new Card(element, '#element-template');
  elementsContainer.prepend(card.generateCard());
}

// заполнение страницы исходным массивом
initialCards.forEach(function (element) {
  addCard(element);

})

// функция добавления новой карточки на страницу
function addNewCard(evt) {
  evt.preventDefault();
  const element = {name: fieldTitle.value, link: fieldLink.value};
  addCard(element);
  closePopup(popupAdd);
  addForm.reset()
}

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
  openPopup(popupAdd);
  fieldTitle.value = "";
  fieldLink.value = "";
  const formValidator = new FormValidator(popupAdd, currentParams)
  formValidator.validateOpenPopup()
}

// функция открытия попапа редактирования профиля
function openProfilePopup(){
  openPopup(popupEdit)
  fieldName.value = currentName.textContent;
  fieldDescription.value = currentDescription.textContent;
  const formValidator = new FormValidator(popupEdit, currentParams)
  formValidator.validateOpenPopup()
}

// функция закрытия попапа по клику на оверлей
function closeOverlay(evt){
  if (evt.target===evt.currentTarget) {
    closePopup(evt.currentTarget)
  }
}

// функция изменения данных профиля пользователя
function changeName(evt) {
  evt.preventDefault();
  currentName.textContent = fieldName.value;
  currentDescription.textContent = fieldDescription.value;
  closePopup(popupEdit);
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

// создание объектов валидатора
function enableFormValidation(){
  const formList = document.querySelectorAll(currentParams.formSelector);
  formList.forEach(function (form) {
    const formValidator = new FormValidator(form, currentParams);
    formValidator.enableValidation();
  })
}

editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', openAddCardPopup);

editForm.addEventListener('submit', changeName);
addForm.addEventListener('submit', addNewCard);

enableFormValidation();
