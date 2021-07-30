// контейнер с карточками
const elementsContainer = document.querySelector('.elements');
// шаблон элемента-карточки
const elementTemplate = document.querySelector('#element-template').content;

// исходный массив элементов
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

// функция добавления элемента в контейнер
function addCard(element){
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  elementCard.querySelector('.element__title').textContent = element.name;
  elementCard.querySelector('.element__photo').src = element.link;
  elementCard.querySelector('.element__photo').alt = element.name;
  elementsContainer.prepend(elementCard);
}

//заполнение страницы исходным массивом элементов
initialCards.forEach(function (element) {
  addCard(element);
})

// функция удаления элемента из контейнера
function deleteCard(evt) {
  const targetCard = evt.target.closest('.element');
  console.log(targetCard)
  targetCard.remove();
}
// функция добавления лайка
function addLike(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

// Кнопки
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
const basketButtons = document.querySelectorAll('.element__basket-button');
const likeButtons = document.querySelectorAll('.element__like-button');

// Добавления слушателя и вызова функции удаления элемента
basketButtons.forEach(function (button) {
  button.addEventListener('click', deleteCard);
})

// Добавление слушателя и вызова функции лайка
likeButtons.forEach(function (button) {
  button.addEventListener('click', addLike);
})

// Работа с попапами

// попап редактирования
let popupEdit = document.getElementById('profileForm');
// форма редактирования
let editForm = popupEdit.querySelector('.form__form');
// кнопка закрытия в попапе редактирования
let closeEditFormButton = popupEdit.querySelector('.form__toggle');

// попап добавления
let popupAdd = document.getElementById('addCardForm');
// форма добавления
let addForm = popupAdd.querySelector('.form__form')
// кнопка закрытия в попапе добавления
let closeAddFormButton = popupAdd.querySelector('.form__toggle');

// получение текущих значений имени и описания профиля
let currentName = document.querySelector('.profile__name');
let currentDescription = document.querySelector('.profile__description');

// поля формы редактирования профиля
let fieldName = document.getElementById('profileName');
let fieldDescription = document.getElementById('profileDescription');

// поля формы добавления элемента
let fieldTitle = document.getElementById('placeTitle');
let fieldLink = document.getElementById('placeLink');


// открытие попапа
function openPopup(popup) {
  popup.classList.add('form_active');
  const popupID = popup.id;
  switch (popupID) {
    case 'profileForm':
      fieldName.value = currentName.textContent;
      fieldDescription.value = currentDescription.textContent;
      break
    case 'addCardForm':
      fieldTitle.placeholder = 'Название';
      fieldLink.placeholder = 'Ссылка на картинку';
      break
  }

}

// закрытие попапа
function closePopup(evt) {
  const popup = evt.target.closest('.form');
  popup.classList.remove('form_active');
}

// функция изменения данных профиля пользователя
function changeName(evt) {
  evt.preventDefault();
  currentName.textContent = fieldName.value;
  currentDescription.textContent = fieldDescription.value;
  closePopup(evt);
}

// функция добавления новой карточки на страницу
function addNewCard(evt) {
  evt.preventDefault();
  let newCard = {
    name : fieldTitle.value,
    link : fieldLink.value,
  }
  addCard(newCard);
  closePopup(evt);
}

editButton.addEventListener('click', function() {openPopup(popupEdit)});
addButton.addEventListener('click', function() {openPopup(popupAdd)});

closeEditFormButton.addEventListener('click', closePopup);
closeAddFormButton.addEventListener('click', closePopup);

editForm.addEventListener('submit', changeName);
addForm.addEventListener('submit', addNewCard);


