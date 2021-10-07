export default class Card {
  constructor({data, handleCardClick, handleDeleteIconClick, handleLikeButtonClick}, myID, cardSelector) {
    this._name = data.name;
    this._imageLink = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this._cardSelector = cardSelector;
    this._myID = myID

    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLike = handleLikeButtonClick;

    this._isLiked = false;
    this._isMy = false;
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
    console.log(this._id)
    this._handleDeleteIconClick(this._id);
  }
  // _deleteCard() {
  //   this._element.remove();
  // }
  _toggleLike() {
   this._likeButton.classList.toggle('element__like-button_active');
  }

  _setEventListeners() {
    this._photo.addEventListener('click', () => {
      this._openPhotoViewPopup();
    });
    if (this._myCard()) {
      this._deleteButton.addEventListener('click', () => {
      this._handleDeletePhoto();
    });}
    this._likeButton.addEventListener('click', () => {
      this._handleLike(this._id);
      this._toggleLike();
    });
  }
  generateCard () {
    this._myCard()
    this._element = this._getTemplate();
    this._photo = this._element.querySelector('.element__photo');
    this._deleteButton = this._element.querySelector('.element__basket-button');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeCounter = this._element.querySelector('.element__like-count');
    if (!this._myCard()) {
      // удалить иконку из разметки если карточка чужая
      this._deleteButton.remove();
    }
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._likeCounter.textContent = this._likes.length;
    this._photo.src = this._imageLink;
    this._photo.alt = this._name;
    return this._element;
  }
  _like () {
    this._isLiked = !this._isLiked
  }
  _myCard () {
    if (this._myID === this._owner) {
      return true
    }
  }
}
