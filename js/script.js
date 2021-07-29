// Работа с формой редактирования профиля

let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');


let editForm = document.querySelector('.form__form')


// находим нужные попапы
// попап редактирования
let popupEdit = document.getElementById('profileForm');
// кнопка закрытия в попапе
let closeEditFormButton = popupEdit.querySelector('.form__toggle');
// попап добавления
let popupAdd = document.getElementById('addCardForm');
// кнопка закрытия в попапе
let closeAddFormButton = popupAdd.querySelector('.form__toggle');


let currentName = document.querySelector('.profile__name');
let currentDescription = document.querySelector('.profile__description');

let fieldName = document.getElementById('profileName');
let fieldDescription = document.getElementById('profileDescription');



function openPopup(popup) {
  popup.classList.add('form_active');
  fieldName.value = currentName.textContent;
  fieldDescription.value = currentDescription.textContent;
}

function closePopup(event) {
  const popup = event.target.closest('.form');
  console.log(popup)
  popup.classList.remove('form_active');
}

function changeName(evt) {
  evt.preventDefault();
  currentName.textContent = fieldName.value;
  currentDescription.textContent = fieldDescription.value;
  closePopup();
}


editButton.addEventListener('click', function() {openPopup(popupEdit)});
addButton.addEventListener('click', function() {openPopup(popupAdd)});

closeEditFormButton.addEventListener('click', closePopup);
closeAddFormButton.addEventListener('click', closePopup);

editForm.addEventListener('submit', changeName);


