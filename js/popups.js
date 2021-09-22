
// функция открытия попапа
// function openPopup(popup){
//   popup.classList.add('popup_active');
//   document.addEventListener('keydown', closeByEsc);
// }

// функция закрытия попапа
// function closePopup(popup) {
//   popup.classList.remove('popup_active');
//   document.removeEventListener('keydown',closeByEsc)
// }

// функция закрытия попапа по esc
// function closeByEsc(evt) {
//   if (evt.key === 'Escape') {
//     const popup = document.querySelector('.popup_active')
//     closePopup(popup);
//   }
// }

// функция открытия попапа добавления нового элемента
// function openAddCardPopup(){
//   openPopup(popupAddCard);
//   formAddCard.reset();
//   formAddCardValidator.resetPopupValidationState()
// }

// функция открытия попапа редактирования профиля
// function openEditProfilePopup(){
//   openPopup(popupEditProfile)
//   fieldName.value = currentName.textContent;
//   fieldDescription.value = currentDescription.textContent;
//   formEditProfileValidator.resetPopupValidationState()
// }


// добавление слушателей на кнопку закрытия попапов
// closeButtons.forEach(function (button) {
//   const popup = button.closest('.popup')
//   button.addEventListener('click', function(evt) {closePopup(popup)});
// })
