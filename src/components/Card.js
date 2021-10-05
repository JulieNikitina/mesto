export default class Card {
  constructor({data, handleCardClick, handleDeleteIconClick}, cardSelector) {
    this._name = data.name;
    this._imageLink = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
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
    this._handleCardClick(this._name, this._imageLink)
  }
  _handleDeletePhoto(){
    this._handleDeleteIconClick()
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
    // this._deleteButton.addEventListener('click', () => {
    //   this._deleteCard();
    // });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeletePhoto();
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
