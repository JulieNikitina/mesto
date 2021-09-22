// исходный массив карточек
export const initialCards = [
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
export const FieldName = document.querySelector('#name-input');
export const FieldDescription = document.querySelector('#description-input');

// селектор шаблона карточки
export const CARD_TEMPLATE_SELECTOR = '#element-template'

