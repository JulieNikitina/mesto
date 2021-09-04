import {openPopup, popupPhotoView, popupPhotoCapture, popupPhoto} from "./index.js";

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._imageLink = data.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }
  _openPhotoViewPopup(){
    openPopup(popupPhotoView)
    popupPhotoCapture.textContent = this._name;
    popupPhoto.src = this._imageLink;
    popupPhoto.alt = this._name;
  }
  _deleteCard() {
    this._element.remove();
  }
  _toggleLike() {
   this._likeButton.classList.toggle('element__like-button_active');
  }
  _setEventListeners() {
    this._photo.addEventListener('click', () => {
      this._openPhotoViewPopup();
    });
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });
  }
  generateCard () {
    this._element = this._getTemplate();
    this._photo = this._element.querySelector('.element__photo');
    this._deleteButton = this._element.querySelector('.element__basket-button');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._photo.src = this._imageLink;
    this._photo.alt = this._name;
    return this._element;
  }
}
