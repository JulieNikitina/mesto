// исходный массив карточек
const arshan = new URL('../images/elements/elements-arshan.JPG', import.meta.url);
const bbt = new URL('../images/elements/elements-bbt.JPG', import.meta.url);
const mamay = new URL('../images/elements/elements-mamay.JPG', import.meta.url)
const tazherany = new URL('../images/elements/elements-tazherany.JPG', import.meta.url)
const aya = new URL('../images/elements/elements-aya.JPG', import.meta.url)
const olkhon = new URL('../images/elements/elements-olkhon.JPG', import.meta.url)

export const initialCards = [
  {
    name: 'Аршан',
    link: arshan
  },
  {
    name: 'Большая Байкальская Тропа',
    link: bbt
  },
  {
    name: 'Мамай',
    link: mamay
  },
  {
    name: 'Тажеранские степи',
    link: tazherany
  },
  {
    name: 'Бухта Ая',
    link: aya
  },
  {
    name: 'Ольхон',
    link: olkhon
  },
];

// параметры валидации
export const currentParams = {
  formSelector: '.form',
  inputSelector: '.form__input-field',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input-field_error',
  errorClass: 'form__input-error_active'
}

// форма редактирования
export const formEditProfile = document.querySelector('#profileForm').querySelector('.form');

// форма добавления
export const formAddCard = document.querySelector('#addCardForm').querySelector('.form');

// кнопка редактирования профиля
export const editButton = document.querySelector('.profile__edit-button');

// кнопка добавления нового элемента
export const addButton = document.querySelector('.profile__add-button');

// получение текущих значений имени и описания профиля
export const userInfoSelectors = {nameSelector:'.profile__name', descriptionSelector:'.profile__description'};

// поля формы редактирования профиля
export const fieldName = document.querySelector('#name-input');
export const fieldDescription = document.querySelector('#description-input');

// селекторы
export const ELEMENTS_CONTAINER_SELECTOR = '.elements'
export const CARD_TEMPLATE_SELECTOR = '#element-template'
export const POPUP_WITH_PHOTO_SELECTOR = '#viewPhoto'
export const POPUP_EDIT_FORM_SELECTOR = '#profileForm'
export const POPUP_ADD_CARD_FORM_SELECTOR = '#addCardForm'
export const POPUP_PHOTO_SELECTOR = '.popup__photo'
export const POPUP_PHOTO_CAPTION_SELECTOR = '.popup__photo-caption'
