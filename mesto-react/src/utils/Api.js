// импорты
import apiAuthorizationToken from "./apiAuthorizationToken";

// константа с Апи запросами
class Api {
  constructor({ link, headers }) {
    this._link = link;
    this._headers = headers;
  }

  // Метод обработки ответа сервера 
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }

  // Метод получения данных пользователей
  getUserData() {
    return fetch(`${this._link}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
      return this._checkResponse(res);
    });
  }

  // Метод инициализации карточек сервера 
  getInitialCards() {
    return fetch(`${this._link}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
      return this._checkResponse(res);
    });
  }

  // Метод отправки данных пользователя
  editUserProfile(userName, userAbout) {
    return fetch(`${this._link}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ 
        name: userName,
        about: userAbout, 
      }),
    })
    .then((res) => {
      return this._checkResponse(res);
    });
  }

  // Добавление новой карточки
  addNewCard(photoName, link) {
    console.log(this._headers);
    return fetch(`${this._link}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ 
        name: photoName,
        link: link, 
      }),
    })
    .then((res) => {
      return this._checkResponse(res);
    });
  }
  
  // Удаление карочки
  deleteCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  // Лайк карточки
  setCardLike(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._link}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => {
        return this._checkResponse(res);
      });
    } else {
      return fetch(`${this._link}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        return this._checkResponse(res);
      });
    }
  }

  // Аватар(короля) поля фотографии
  updateAvatar(avatarLink) {
    return fetch(`${this._link}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({avatar: avatarLink.avatar}),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const api = new Api(apiAuthorizationToken)

// экспорт
export default api
