export default class UserInfo {
  constructor(data) {
    this._nameSelector = data.nameSelector;
    this._descriptionSelector = data.descriptionSelector;
    this._currentName = document.querySelector(this._nameSelector);
    this._currentDescription = document.querySelector(this._descriptionSelector);
  }

  getUserInfo() {
    this._infoObject = {name: this._currentName.textContent, description: this._currentDescription.textContent};
    return this._infoObject;
  }

  setUserInfo(name, description) {
    this._currentName.textContent = name;
    this._currentDescription.textContent = description;
  }
}

