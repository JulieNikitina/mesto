import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, photoSelector, photoCaption) {
    super(popupSelector);
    this._popupPhoto = document.querySelector(photoSelector);
    this._popupPhotoCapture = document.querySelector(photoCaption);
  }
  open(name, link, ) {
    this._popupPhotoCapture.textContent = name;
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
    super.open();
  }
}
