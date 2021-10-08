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
  TOKEN, BASE_ROUTE, profilePhoto, CARD_TEMPLATE_SELECTOR,
} from "../utils/constants.js";

import "./index.css";
import PopupWithConfirmation from "../components/PopupConfirmation";
import Api from "../components/Api";
import Card from "../components/Card";

// создание карточки
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
          console.log(err); // выведем ошибку в консоль
        });
    }
  }, userInfo.getID(), CARD_TEMPLATE_SELECTOR);
  return card;
}

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

api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result.name, result.about, result.avatar, result._id)
    console.log(result._id)
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
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
      console.log(result)
      cardListSection.renderItems(result)
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
    const buttonText = popupEditProfile.submitButton.textContent;
    popupEditProfilePhoto.submitButton.textContent = "Сохранение..."
    api.patchUserPhoto(formData.photo)
      .then((result) => {
        profilePhoto.src = result.avatar;
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
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
        userInfo.setUserInfo(result.name, result.about, result.avatar)
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
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
        cardListSection.addItem(cardElement)
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
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
        console.log(result)
        card.remove();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
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

