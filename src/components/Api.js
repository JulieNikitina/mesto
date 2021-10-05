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
}
