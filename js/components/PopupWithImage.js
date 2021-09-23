import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(name, link) {
    this._popupPhoto = document.querySelector('.popup__photo');
    this._popupPhotoCapture = document.querySelector('.popup__photo-caption');
    this._popupPhotoCapture.textContent = name;
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
    super.open();
  }
}
