// Работа с выводом карточек элементов
const elementsContainer = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

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

function addCard(element){
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  elementCard.querySelector('.element__title').textContent = element.name;
  elementCard.querySelector('.element__photo').src = element.link;
  elementCard.querySelector('.element__photo').alt = element.name;
  elementsContainer.prepend(elementCard);
}

initialCards.forEach(function (element) {
  addCard(element);
})

// Работа с формой редактирования профиля
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');

// находим нужные попапы

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

function changeName(evt) {
  evt.preventDefault();
  currentName.textContent = fieldName.value;
  currentDescription.textContent = fieldDescription.value;
  closePopup(evt);
}

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


