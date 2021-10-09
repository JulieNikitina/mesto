export default class Api {
  constructor(params) {
    this._params = params;
    this._queryParams = {};
    this._queryParams.headers = this._params.headers
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._params.baseRoute}/cards`, this._queryParams)
      .then(res => {
        return this._getResponseData(res)
      });
  }

  getUserInfo() {
    return fetch(`${this._params.baseRoute}/users/me`, this._queryParams)
      .then(res => {
        return this._getResponseData(res)
      });
  }

  patchUserInfo(name, about) {
    const queryParams = {
      method: 'PATCH',
      headers: this._queryParams.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }
    return fetch(`${this._params.baseRoute}/users/me`, queryParams)
      .then(res => {
        return this._getResponseData(res)
      });
  }

  patchUserPhoto(link) {
    const queryParams = {
      method: 'PATCH',
      headers: this._queryParams.headers,
      body: JSON.stringify({
        avatar: link,
      })
    }
    return fetch(`${this._params.baseRoute}/users/me/avatar`, queryParams)
      .then(res => {
        return this._getResponseData(res)
      });
  }

  addNewCard(card) {
    const queryParams = {
      method: 'POST',
      headers: this._queryParams.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    }
    return fetch(`${this._params.baseRoute}/cards`, queryParams)
      .then(res => {
        return this._getResponseData(res)
      });
  }

  deleteCard(id) {
    const queryParams = {
      method: 'DELETE',
      headers: this._queryParams.headers
    }
    return fetch(`${this._params.baseRoute}/cards/${id}`, queryParams)
      .then(res => {
        return this._getResponseData(res)
      });
  }

  handleLikeButton(id, isLiked) {
    if (!isLiked) {
      const queryParams = {
        method: 'PUT',
        headers: this._queryParams.headers
      }
      return fetch(`${this._params.baseRoute}/cards/likes/${id}`, queryParams)
        .then(res => {
          return this._getResponseData(res)
        });
    } else {
      const queryParams = {
        method: 'DELETE',
        headers: this._queryParams.headers
      }
      return fetch(`${this._params.baseRoute}/cards/likes/${id}`, queryParams)
        .then(res => {
          return this._getResponseData(res)
        });
    }
  }
}
