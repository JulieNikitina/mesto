let closeButton = document.querySelector('.profile-form__toggle');
let editButton = document.querySelector('.profile__edit-button');

let editForm = document.querySelector('.profile-form__form')

let popup = document.querySelector('.profile-form');

let currencyName = document.querySelector('.profile__name');
let currencyDescription = document.querySelector('.profile__description');

let fieldName = document.getElementById('profileName');
let fieldDescription = document.getElementById('profileDescription');

function popupOpen() {
  popup.classList.add('profile-form_active');
  fieldName.value = currencyName.textContent;
  fieldDescription.value = currencyDescription.textContent;
}

function popupClose() {
  popup.classList.remove('profile-form_active');
}

function changeName(evt) {
  evt.preventDefault();
  currencyName.textContent = fieldName.value;
  currencyDescription.textContent = fieldDescription.value;
  popupClose();
}


editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
editForm.addEventListener('submit', changeName);

