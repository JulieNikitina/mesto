// контейнер с карточками
const elementsContainer = document.querySelector('.elements');
// шаблон элемента-карточки
const elementTemplate = document.querySelector('#element-template').content;
// кнопка редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
// кнопка добавления нового элемента
const addButton = document.querySelector('.profile__add-button');

// попапы
const popups = document.querySelectorAll('.popup');

// попап редактирования
const popupEdit = document.querySelector('#profileForm');
// форма редактирования
const editForm = popupEdit.querySelector('.form');
// получение текущих значений имени и описания профиля
const currentName = document.querySelector('.profile__name');
const currentDescription = document.querySelector('.profile__description');
// поля формы редактирования профиля
const fieldName = editForm.querySelector('#name-input');
const fieldDescription = editForm.querySelector('#description-input');

// попап добавления
const popupAdd = document.querySelector('#addCardForm');
// форма добавления
const addForm = popupAdd.querySelector('.form')
// поля формы добавления элемента
const fieldTitle = addForm.querySelector('#title-input');
const fieldLink = addForm.querySelector('#url-input');

// попап просмотра фото
const popupPhotoView = document.querySelector('#viewPhoto');
// фото и описание в попапе просмотра фото
const popupPhoto = popupPhotoView.querySelector('.popup__photo');
const popupPhotoCapture = popupPhotoView.querySelector('.popup__photo-caption');

// кнопки закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close-button');

// шаблон карточки
const templateCard = elementTemplate.querySelector('.element');

// функция создания карточки
function createCard(name, link){
  const elementCard = templateCard.cloneNode(true);
  const cardPhoto = elementCard.querySelector('.element__photo')
  elementCard.querySelector('.element__title').textContent = name;
  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardPhoto.addEventListener('click', openPhotoViewPopup);
  elementCard.querySelector('.element__basket-button').addEventListener('click', deleteCard);
  elementCard.querySelector('.element__like-button').addEventListener('click', addLike);
  return elementCard;
}

// функция добавления элемента в контейнер
function addCard(container, element){
  container.prepend(element);
}

// функция добавления новой карточки на страницу
function addNewCard(evt) {
  evt.preventDefault();
  addCard(elementsContainer, createCard(fieldTitle.value, fieldLink.value));
  closePopup(popupAdd);
  addForm.reset()
}

// функция удаления элемента со страницы
function deleteCard(evt) {
  const targetCard = evt.target.closest('.element');
  targetCard.remove();
}

// функция добавления/удаления лайка
function addLike(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

// функция открытия попапа
function openPopup(popup){
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closeByEsc);
}

// функция открытия попапа добавления нового элемента
function openAddCardPopup(){
  openPopup(popupAdd);
  fieldTitle.value = "";
  fieldLink.value = "";
  validateOpenPopup(popupAdd, currentParams);
}

// функция открытия попапа редактирования профиля
function openProfilePopup(){
  openPopup(popupEdit)
  fieldName.value = currentName.textContent;
  fieldDescription.value = currentDescription.textContent;
  validateOpenPopup(popupEdit, currentParams);
}

// функция валидации открываемого попапа
function validateOpenPopup(popup, validationParam){
  const inputList = Array.from(popup.querySelectorAll(validationParam.inputSelector));
  const submitButton = popup.querySelector(validationParam.submitButtonSelector);
  inputList.forEach(function (inputElement){
    hideInputError(popup, inputElement, currentParams);
  })
  toggleButtonState(inputList,submitButton, validationParam.inactiveButtonClass);
}

// функция открытия попапа просмотра фото
function openPhotoViewPopup(evt){
  openPopup(popupPhotoView)
  popupPhotoCapture.textContent = evt.target.alt;
  popupPhoto.src = evt.target.src;
  popupPhoto.alt = evt.target.alt;
}

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown',closeByEsc)
}

// функция закрытия попапа по клику на оверлей
function closeOverlay(evt, popup){
  if (evt.target===popup) {
    closePopup(popup)
  }
}

// функция закрытия попапа по esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_active')
    closePopup(popup);
  }
}

// функция изменения данных профиля пользователя
function changeName(evt) {
  evt.preventDefault();
  currentName.textContent = fieldName.value;
  currentDescription.textContent = fieldDescription.value;
  closePopup(popupEdit);
}

// добавление слушателей закрытия на попапы
popups.forEach(function (popup){
  popup.addEventListener('click', function (evt) {closeOverlay(evt, popup)})
})

// добавление слушателей на кнопку закрытия попапов
closeButtons.forEach(function (button) {
  const popup = button.closest('.popup')
  button.addEventListener('click', function(evt) {closePopup(popup)});
})

editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', openAddCardPopup);

editForm.addEventListener('submit', changeName);
addForm.addEventListener('submit', addNewCard);

