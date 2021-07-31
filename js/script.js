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

// контейнер с карточками
const elementsContainer = document.querySelector('.elements');
// шаблон элемента-карточки
const elementTemplate = document.querySelector('#element-template').content;
// кнопка редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
// кнопка добавления нового элемента
const addButton = document.querySelector('.profile__add-button');

// попап редактирования
const popupEdit = document.getElementById('profileForm');
// форма редактирования
const editForm = popupEdit.querySelector('.form');
// кнопка закрытия в попапе редактирования
const closeEditFormButton = popupEdit.querySelector('.popup__close-button');
// получение текущих значений имени и описания профиля
const currentName = document.querySelector('.profile__name');
const currentDescription = document.querySelector('.profile__description');
// поля формы редактирования профиля
const fieldName = document.getElementById('profileName');
const fieldDescription = document.getElementById('profileDescription');

// попап добавления
const popupAdd = document.getElementById('addCardForm');
// форма добавления
const addForm = popupAdd.querySelector('.form')
// кнопка закрытия в попапе добавления
const closeAddFormButton = popupAdd.querySelector('.popup__close-button');
// поля формы добавления элемента
const fieldTitle = document.getElementById('placeTitle');
const fieldLink = document.getElementById('placeLink');

// попап просмотра фото
const popupPhotoView = document.getElementById('viewPhoto');
// кнопка закрытия в попапе просмотра фото
const closeViewPhotoButton = popupPhotoView.querySelector('.popup__close-button');
// фото и описание в попапе просмотра фото
const popupPhoto = popupPhotoView.querySelector('.popup__photo');
const popupPhotoCapture = popupPhotoView.querySelector('.popup__photo-caption');


// функция добавления элемента в контейнер
function addCard(element){
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  elementCard.querySelector('.element__title').textContent = element.name;
  elementCard.querySelector('.element__photo').src = element.link;
  elementCard.querySelector('.element__photo').alt = element.name;
  elementCard.querySelector('.element__photo').addEventListener('click', function(evt) {openPopup(popupPhotoView, evt)});
  elementCard.querySelector('.element__basket-button').addEventListener('click', deleteCard);
  elementCard.querySelector('.element__like-button').addEventListener('click', addLike);
  elementsContainer.prepend(elementCard);
}

//заполнение страницы исходным массивом элементов
initialCards.forEach(function (element) {
  addCard(element);
})

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

// функция удаления элемента со страницы
function deleteCard(evt) {
  let targetCard = evt.target.closest('.element');
  targetCard.remove();
}

// функция добавления/удаления лайка
function addLike(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

// функция открытия попапа
function openPopup(popup, evt) {
  popup.classList.add('popup_active');
  let popupID = popup.id;
  switch (popupID) {
    case 'profileForm':
      fieldName.value = currentName.textContent;
      fieldDescription.value = currentDescription.textContent;
      break
    case 'viewPhoto':
      popupPhotoCapture.textContent = evt.target.alt;
      popupPhoto.src = evt.target.src;
  }
}

// функция закрытия попапа
function closePopup(evt) {
  let popup = evt.target.closest('.popup');
  popup.classList.remove('popup_active');
}

// функция изменения данных профиля пользователя
function changeName(evt) {
  evt.preventDefault();
  currentName.textContent = fieldName.value;
  currentDescription.textContent = fieldDescription.value;
  closePopup(evt);
}

editButton.addEventListener('click', function(evt) {openPopup(popupEdit, evt)});
addButton.addEventListener('click', function(evt) {openPopup(popupAdd, evt)});

closeEditFormButton.addEventListener('click', closePopup);
closeAddFormButton.addEventListener('click', closePopup);
closeViewPhotoButton.addEventListener('click', closePopup)

editForm.addEventListener('submit', changeName);
addForm.addEventListener('submit', addNewCard);
