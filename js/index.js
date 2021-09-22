import {Card} from "./classes/Card.js";
import {
  addButton,
  CARD_TEMPLATE_SELECTOR,
  currentParams,
  editButton,
  FieldDescription,
  FieldName,
  initialCards,
  userInfoSelectors
} from "./utils/constants.js";
import Section from "./classes/Section.js";
import PopupWithForm from "./classes/PopupWithForm.js";

import {
  formAddCard,
  formEditProfile,

} from "./utils/constants.js";
import {FormValidator} from "./classes/FormValidator.js";
import PopupWithImage from "./classes/PopupWithImage.js";
import UserInfo from "./classes/UserInfo.js";

// создание экземпляра класса информации о пользователе
const userInfo = new UserInfo(userInfoSelectors);

// заполнение страницы исходным массивом
const cardListSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: (name, link) => {
        popupPhotoView.open(name, link)
      }
    }, CARD_TEMPLATE_SELECTOR);
    const cardElement = card.generateCard();
    cardListSection.addItem(cardElement)
  }
}, '.elements');

// создание объектов валидатора
const formEditProfileValidator = new FormValidator(formEditProfile, currentParams);
formEditProfileValidator.enableValidation()

const formAddCardValidator = new FormValidator(formAddCard, currentParams);
formAddCardValidator.enableValidation()

// создание попапа редактирования профиля
const popupEditProfile = new PopupWithForm({
  validator: formEditProfileValidator,
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData.name, formData.description)
  }
}, '#profileForm');

// создание попапа добавления нового элемента
const popupAddCard = new PopupWithForm({
  validator: formAddCardValidator,
  handleFormSubmit: (formData) => {
    const card = new Card({
      data: formData,
      handleCardClick: (name, link) => {
        popupPhotoView.open(name, link)
      }
    }, CARD_TEMPLATE_SELECTOR);
    const cardElement = card.generateCard();
    cardListSection.addItem(cardElement);
  }
}, '#addCardForm');

// попап просмотра фото
const popupPhotoView = new PopupWithImage('#viewPhoto');

// слушатель на кнопке редактирования профиля
editButton.addEventListener('click', () => {
  popupEditProfile.open();
  const info = userInfo.getUserInfo();
  FieldName.value = info.name
  FieldDescription.value = info.description;
});

// слушатель на кнопке добавления новой карточки
addButton.addEventListener('click', () => {
  popupAddCard.open()
});

cardListSection.renderItems();
popupPhotoView.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();

