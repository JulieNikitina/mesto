// Работа с формой редактирования профиля
let closeButton = document.querySelector('.profile-form__toggle');
let editButton = document.querySelector('.profile__edit-button');

let editForm = document.querySelector('.profile-form__form')

let popup = document.querySelector('.profile-form');

let currentName = document.querySelector('.profile__name');
let currentDescription = document.querySelector('.profile__description');

let fieldName = document.getElementById('profileName');
let fieldDescription = document.getElementById('profileDescription');

// Работа с выводом карточек элементов
const elementsContainer = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

const initialCards = [
  {
    name: 'Ольхон',
    link: './images/elements/elements-olkhon.JPG'
  },
  {
    name: 'Бухта Ая',
    link: './images/elements/elements-aya.JPG'
  },
  {
    name: 'Тажеранские степи',
    link: './images/elements/elements-tazherany.JPG'
  },
  {
    name: 'Мамай',
    link: './images/elements/elements-mamay.JPG'
  },
  {
    name: 'Большая Байкальская Тропа',
    link: './images/elements/elements-bbt.JPG'
  },
  {
    name: 'Аршан',
    link: './images/elements/elements-arshan.JPG'
  }
];

initialCards.forEach(function (element) {
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  elementCard.querySelector('.element__title').textContent = element.name;
  elementCard.querySelector('.element__photo').src = element.link;
  elementCard.querySelector('.element__photo').alt = element.name;
  elementsContainer.append(elementCard);
}
)

function openPopup() {
  popup.classList.add('profile-form_active');
  fieldName.value = currentName.textContent;
  fieldDescription.value = currentDescription.textContent;
}

function closePopup() {
  popup.classList.remove('profile-form_active');
}

function changeName(evt) {
  evt.preventDefault();
  currentName.textContent = fieldName.value;
  currentDescription.textContent = fieldDescription.value;
  closePopup();
}


editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
editForm.addEventListener('submit', changeName);

