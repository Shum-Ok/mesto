export class UserInfo {
  constructor({ name: nameUser, info: infoUser }) {
    this._nameUser = document.querySelector(nameUser)
    this._infoUser = document.querySelector(infoUser)
  }

  getUserInfo() {
    const dataUser = {
      name: this._nameUser.textContent,
      info: this._infoUser.textContent,
    }
    return dataUser
  }

  setUserInfo({ name, info }) {
    this._nameUser.textContent = name
    this._infoUser.textContent = info
  }
}