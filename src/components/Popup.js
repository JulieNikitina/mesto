export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
  }
  _handleKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _closeOverlay= (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close()
    }
  }

  open() {
    this._popup.classList.add('popup_active');
    document.addEventListener('keydown',  this._handleKeyDown)
  }

  close = () => {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown',  this._handleKeyDown)

  }

  setEventListeners() {
    this._popup.addEventListener('click', this._closeOverlay);
    this._popupCloseButton.addEventListener('click', this.close);
  }
}
