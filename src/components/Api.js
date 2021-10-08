export default class Api {
  constructor(params) {
    this._params = params;
    this._queryParams = {};
    this._queryParams.headers = this._params.headers
  }

  getInitialCards() {
    return fetch(`${this._params.baseRoute}/cards`, this._queryParams)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUserInfo() {
    return fetch(`${this._params.baseRoute}/users/me`, this._queryParams)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
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
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка  патч инфы: ${res.status}`);
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
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка  патч фотки: ${res.status}`);
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
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка пост карточки: ${res.status}`);
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
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка лайк карточки: ${res.status}`);
        });
    } else {
      const queryParams = {
        method: 'DELETE',
        headers: this._queryParams.headers
      }
      return fetch(`${this._params.baseRoute}/cards/likes/${id}`, queryParams)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка удаление лайка карточки: ${res.status}`);
        });
    }
  }
  deleteCard(id) {
    const queryParams = {
      method: 'DELETE',
      headers: this._queryParams.headers
    }
    return fetch(`${this._params.baseRoute}/cards/${id}`, queryParams)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка делейт карточки: ${res.status}`);
      });
  }


}
