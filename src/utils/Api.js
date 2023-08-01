// импорты
import apiAuthorizationToken from "./apiAuthorizationToken";

// константа с Апи запросами
class Api {
  constructor({ link, headers }) {
    this._link = link;
    this._headers = headers;
  }

  // Метод обработки ответа сервера 
  _serverResponse(res) {
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
      return this._serverResponse(res);
    });
  }

  // Метод инициализации карточек сервера 
  getInitialCards() {
    return fetch(`${this._link}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
      return this._serverResponse(res);
    });
  }

  // Метод отправки данных пользователя
  editCustomProfile(userProfileInfo) {
    return fetch(`${this._link}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: userProfileInfo['userName'], about: userProfileInfo['userPosition'] }),
    })
    .then((res) => {
      return this._serverResponse(res);
    });
  }

  // Добавление новой карточки
  addNewCard(cardData) {
    console.log(this._headers);
    return fetch(`${this._link}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ 
        name: cardData['photoName'],
        link: cardData['link'], 
      }),
    })
    .then((res) => {
      return this._serverResponse(res);
    });
  }
  
  // Удаление карочки
  deleteCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._serverResponse(res);
    });
  }

  // Лайк карточки
  setCardLike(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._serverResponse(res);
    });
  }

  // Удаление лайка
  deleteCardLike(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._serverResponse(res);
    });
  }

  // Аватар(короля) поля фотографии
  updateAvatar(avatarLink) {
    return fetch(`${this._link}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({avatar: avatarLink.avatar}),
    }).then((res) => {
      return this._serverResponse(res);
    });
  }
}

const api = new Api(apiAuthorizationToken)

// экспорт
export default api
