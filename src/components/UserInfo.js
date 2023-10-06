export class UserInfo {
  constructor({ name: nameUser, about: aboutUser, avatar: avatarUser }) {
    this._nameUser = document.querySelector(nameUser)
    this._aboutUser = document.querySelector(aboutUser)
    this._avatarUser = document.querySelector(avatarUser)
  }

  getUserInfo() {
    const dataUser = {
      name: this._nameUser.textContent,
      about: this._aboutUser.textContent,
    }
    return dataUser
  }

  setUserInfo(name, about) {
    this._nameUser.textContent = name
    this._aboutUser.textContent = about
  }

  setUserAvatar(avatar) {
    this._avatarUser.src = avatar
  }
}
