import {Card} from "./classes/Card.js";
import {initialCards} from "./initialCards.js";
import {
  closePopup,
  fieldDescription,
  fieldName,
  formAddCard,
  formEditProfile, openAddCardPopup, openEditProfilePopup,
  popupAddCard,
  popupEditProfile,
} from "./popups.js";

// контейнер с карточками
const elementsContainer = document.querySelector('.elements');

// кнопка редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
// кнопка добавления нового элемента
const addButton = document.querySelector('.profile__add-button');

// получение текущих значений имени и описания профиля
const currentName = document.querySelector('.profile__name');
const currentDescription = document.querySelector('.profile__description');

// поля формы добавления элемента
const fieldTitle = formAddCard.querySelector('#title-input');
const fieldLink = formAddCard.querySelector('#url-input');

// селектор шаблона карточки
const CARD_TEMPLATE_SELECTOR = '#element-template'

// функция создания карточки
function createCard(element, cardTemplateSelector) {
  return new Card(element, cardTemplateSelector);
}

// функция добавления элемента в контейнер
function addCard(element){
  const card = createCard(element, CARD_TEMPLATE_SELECTOR);
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
  closePopup(popupAddCard);
  formAddCard.reset()
}

// функция изменения данных профиля пользователя
function submitEditProfileForm(evt) {
  evt.preventDefault();
  currentName.textContent = fieldName.value;
  currentDescription.textContent = fieldDescription.value;
  closePopup(popupEditProfile);
}

editButton.addEventListener('click', openEditProfilePopup);
addButton.addEventListener('click', openAddCardPopup);

formEditProfile.addEventListener('submit', submitEditProfileForm);
formAddCard.addEventListener('submit', addNewCard);

