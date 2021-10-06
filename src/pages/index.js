import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

import {
  addButton,
  currentParams,
  editButton,
  fieldDescription,
  fieldName,
  userInfoSelectors,
  formAddCard,
  formEditProfile,
  POPUP_PHOTO_SELECTOR,
  POPUP_PHOTO_CAPTION_SELECTOR,
  POPUP_WITH_PHOTO_SELECTOR,
  ELEMENTS_CONTAINER_SELECTOR,
  POPUP_EDIT_FORM_SELECTOR,
  POPUP_ADD_CARD_FORM_SELECTOR,
  POPUP_PHOTO_PROFILE_SELECTOR,
  formEditPhotoProfile,
  profilePhotoOverlay,
  POPUP_DELETE_CARD_SELECTOR,
  TOKEN, BASE_ROUTE, profilePhoto,
} from "../utils/constants.js";

import {createCard} from "../utils/utils.js";

import "./index.css";
import PopupWithConfirmation from "../components/PopupConfirmation";
import Api from "../components/Api";

// создание экземпляра класса информации о пользователе
const userInfo = new UserInfo(userInfoSelectors);

// создание Api
const api = new Api({
  baseRoute: BASE_ROUTE,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
});

// заполнение страницы исходным массивом
const cardListSection = new Section({
  renderer: (item) => {
    const card = createCard(item, popupPhotoView, popupDeleteCard)
    const cardElement = card.generateCard();
    cardListSection.addItem(cardElement)
  }
}, ELEMENTS_CONTAINER_SELECTOR);

api.getInitialCards()
  .then((result) => {
      cardListSection.renderItems(result)
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result.name, result.about, result.avatar)
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


// создание объектов валидатора
const formEditProfileValidator = new FormValidator(formEditProfile, currentParams);
formEditProfileValidator.enableValidation()

const formAddCardValidator = new FormValidator(formAddCard, currentParams);
formAddCardValidator.enableValidation()

const formEditProfileImageValidator = new FormValidator(formEditPhotoProfile, currentParams);
formEditProfileImageValidator.enableValidation()

// создание попапа редактирования фото профиля
const popupEditProfilePhoto = new PopupWithForm({
  validator: formEditProfileImageValidator,
  handleFormSubmit: (formData) => {
    profilePhoto.src = formData.photo;
  }
}, POPUP_PHOTO_PROFILE_SELECTOR);

// создание попапа редактирования профиля
const popupEditProfile = new PopupWithForm({
  validator: formEditProfileValidator,
  handleFormSubmit: (formData) => {
    api.patchUserInfo(formData.name, formData.description)
      .then((result) => {
        userInfo.setUserInfo(formData.name, formData.description, profilePhoto.src)
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
}, POPUP_EDIT_FORM_SELECTOR);

// создание попапа добавления нового элемента
const popupAddCard = new PopupWithForm({
  validator: formAddCardValidator,
  handleFormSubmit: (formData) => {
    //TODO надо ли вставлять в разметку на странице до обновления??
    // const card = createCard(formData, popupPhotoView, popupDeleteCard)
    // const cardElement = card.generateCard();
    api.addNewCard(formData)
      .then((result) => {
        console.log(result)
        //TODO надо ли вставлять в разметку на странице до обновления??
        // cardListSection.addItem(cardElement)
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
}, POPUP_ADD_CARD_FORM_SELECTOR);

// создание попапа просмотра фото
const popupPhotoView = new PopupWithImage(
  POPUP_WITH_PHOTO_SELECTOR,
  POPUP_PHOTO_SELECTOR,
  POPUP_PHOTO_CAPTION_SELECTOR
);

// создание попапа удаления карточки
const popupDeleteCard = new PopupWithConfirmation({
  handleConfirmation: () => {
    console.log("hola")
  }
}, POPUP_DELETE_CARD_SELECTOR);

// слушатель на кнопке редактирования профиля
editButton.addEventListener('click', () => {
  popupEditProfile.open();
  const info = userInfo.getUserInfo();
  fieldName.value = info.name
  fieldDescription.value = info.description;
});

// слушатель на кнопке добавления новой карточки
addButton.addEventListener('click', () => {
  popupAddCard.open()
});

// слушатель на оверлее фото профиля
profilePhotoOverlay.addEventListener('click', () => {
  popupEditProfilePhoto.open()
});

// cardListSection.renderItems();
popupPhotoView.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfilePhoto.setEventListeners();
popupDeleteCard.setEventListeners();

