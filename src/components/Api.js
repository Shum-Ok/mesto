const onError = res => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject('Произошла ошибка')
}

export class Api {
    constructor({ url, headers }) {  // передаем url API и заголовок
      this._url = url
      this._headers = headers
    }

    getAllData() {
      return Promise.all([this.getInitialCards(), this.getUser()])
    }

    getUser() { // загружаем имя пользователя
      return fetch(
        `${this._url}users/me`, 
        { 
          headers: this._headers
        }
      )
        .then(onError)
    }

    setUserInfo(name, about) { // запрос на изменение данных пользователя метод PATCH
      return fetch(
        `${this._url}users/me`, 
        {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name,
            about,
          })
        })
        .then(onError)
    }

    getInitialCards() { // получить карточки метотд GET
      return fetch(
        `${this._url}cards`, 
        { 
          headers: this._headers
        }
      )
        .then(onError)
    }

    createCard(card) { // создать карточку метотд POST
      return fetch(
        `${this._url}cards`, 
        { 
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: card.name,
            link: card.link,
          }) 
        })
        .then(onError)
    }

    deleteCard(id) { // удалить карточку метотд DELETE
      return fetch(
        `${this._url}cards/${id}`, 
        { 
          method: 'DELETE',
          headers: this._headers,
        })
        .then(onError)
    }

    deleteLike(id) { // удалить карточку метотд DELETE
      return fetch(
        `${this._url}cards/${id}/likes`, 
        { 
          method: 'DELETE',
          headers: this._headers,
        })
        .then(onError)
    }

    addLike(id) { // удалить карточку метотд DELETE
      return fetch(
        `${this._url}cards/${id}/likes`, 
        { 
          method: 'PUT',
          headers: this._headers,
        })
        .then(onError)
    }

    setUserAvatar(avatar) { // запрос на изменение аватара пользователя, метод PATCH
      return fetch(
        `${this._url}users/me/avatar`, 
        {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar
          }),
        })
        .then(onError)
    }
}