import Api from "../components/Api";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirmation from "../components/PopupConfirmation";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

import {
  currentParams,
  userInfoSelectors,
  POPUP_PHOTO_SELECTOR,
  POPUP_PHOTO_CAPTION_SELECTOR,
  POPUP_WITH_PHOTO_SELECTOR,
  ELEMENTS_CONTAINER_SELECTOR,
  POPUP_EDIT_FORM_SELECTOR,
  POPUP_ADD_CARD_FORM_SELECTOR,
  POPUP_PHOTO_PROFILE_SELECTOR,
  POPUP_DELETE_CARD_SELECTOR,
  CARD_TEMPLATE_SELECTOR,
  AUTORIZATION_PARAMS,
} from "../utils/constants.js";

import "./index.css";

// формы
const formEditPhotoProfile = document.querySelector('#profileImageForm').querySelector('.form');
const formEditProfile = document.querySelector('#profileForm').querySelector('.form');
const formAddCard = document.querySelector('#addCardForm').querySelector('.form');

// кнопки
const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

// поля формы редактирования профиля
const fieldName = document.querySelector('#name-input');
const fieldDescription = document.querySelector('#description-input');

// аватар
const profilePhoto = document.querySelector('.profile__photo');
export const profilePhotoOverlay = document.querySelector('.profile__photo-block');


// функция создания карточки
function createCard(item, popupPhoto, popupDeletePhoto){
  const card = new Card({
    data: item,
    handleCardClick: (name, link) => {
      popupPhoto.open(name, link)
    },
    handleDeleteIconClick: (cardID, card) => {
      popupDeletePhoto.open(cardID, card)
    },
    handleLikeButtonClick: (id, isLiked, handleResult) => {
      api.handleLikeButton(id, isLiked)
        .then((result) => {
          handleResult(result)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, userInfo.getID(), CARD_TEMPLATE_SELECTOR);
  return card;
}

// создание экземпляра класса информации о пользователе
const userInfo = new UserInfo(userInfoSelectors);

// создания секции контента
const cardListSection = new Section({
  renderer: (item) => {
    const card = createCard(item, popupPhotoView, popupDeleteCard)
    const cardElement = card.generateCard();
    cardListSection.addItem(cardElement)
  }
}, ELEMENTS_CONTAINER_SELECTOR);

// создание Api
const api = new Api(AUTORIZATION_PARAMS);

// заполнение массива карточек и инфы о юзере данными с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([resultUserInfo, resultInitialCards]) => {
    userInfo.setUserInfo(resultUserInfo.name, resultUserInfo.about, resultUserInfo.avatar, resultUserInfo._id);
    cardListSection.renderItems(resultInitialCards.reverse()); })
  .catch((err) => {
    console.log(err);
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
    const buttonText = popupEditProfilePhoto.submitButton.textContent;
    popupEditProfilePhoto.submitButton.textContent = "Сохранение..."
    api.patchUserPhoto(formData.photo)
      .then((result) => {
        profilePhoto.src = result.avatar;
        popupEditProfilePhoto.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfile.submitButton.textContent = buttonText;
      });
  }
}, POPUP_PHOTO_PROFILE_SELECTOR);

// создание попапа редактирования профиля
const popupEditProfile = new PopupWithForm({
  validator: formEditProfileValidator,
  handleFormSubmit: (formData) => {
    const buttonText = popupEditProfile.submitButton.textContent;
    popupEditProfile.submitButton.textContent = "Сохранение..."
    api.patchUserInfo(formData.name, formData.description)
      .then((result) => {
        userInfo.setUserInfo(result.name, result.about, result.avatar);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfile.submitButton.textContent = buttonText;
      });
  }
}, POPUP_EDIT_FORM_SELECTOR);

// создание попапа добавления нового элемента
const popupAddCard = new PopupWithForm({
  validator: formAddCardValidator,
  handleFormSubmit: (formData) => {
    const buttonText = popupEditProfilePhoto.submitButton.textContent;
    popupAddCard.submitButton.textContent = "Сохранение..."
    api.addNewCard(formData)
      .then((result) => {
        const card = createCard(result, popupPhotoView, popupDeleteCard)
        const cardElement = card.generateCard();
        cardListSection.addItem(cardElement);
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddCard.submitButton.textContent = buttonText;
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
  handleConfirmation: (cardID, card) => {
    const buttonText = popupEditProfilePhoto.submitButton.textContent;
    popupDeleteCard.submitButton.textContent = "Удаление...";
    api.deleteCard(cardID)
      .then((result) => {
        card.remove();
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupDeleteCard.submitButton.textContent = buttonText;
      });
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

popupPhotoView.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfilePhoto.setEventListeners();
popupDeleteCard.setEventListeners();
