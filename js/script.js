let closeButton = document.querySelector('.profile-form__toggle');
let editButton = document.querySelector('.profile__edit-button');

let editForm = document.querySelector('.profile-form__form')

let popup = document.querySelector('.profile-form');

let currentName = document.querySelector('.profile__name');
let currentDescription = document.querySelector('.profile__description');

let fieldName = document.getElementById('profileName');
let fieldDescription = document.getElementById('profileDescription');

function popupOpen() {
  popup.classList.add('profile-form_active');
  fieldName.value = currentName.textContent;
  fieldDescription.value = currentDescription.textContent;
}

function popupClose() {
  popup.classList.remove('profile-form_active');
}

function changeName(evt) {
  evt.preventDefault();
  currentName.textContent = fieldName.value;
  currentDescription.textContent = fieldDescription.value;
  popupClose();
}


editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
editForm.addEventListener('submit', changeName);

