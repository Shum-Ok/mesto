import { Popup } from '../components/Popup.js'

export class PopupWithImage extends Popup {
  constructor({ selectorPopup }, imgUrl, imgName) {
    super({ selectorPopup })
    this._imgUrl = imgUrl
    this._imgName = imgName
  }

  open(name, link) {
    this._imgUrl.src = link
    this._imgUrl.alt = name
    this._imgName.textContent = name

    super.open()
  }
}
