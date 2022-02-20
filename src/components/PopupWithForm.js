import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor({ selectorPopup, functionPopupForm: handleFormSubmit }) {
      super({ selectorPopup })
      this._handleFormSubmit = handleFormSubmit
      this._selectorPopupForm = this._selectorPopup.querySelector('.popup__form')
      
    }

    _getInputValues() {
      this._inputList = this._selectorPopup.querySelectorAll('.popup_input')
      this._formValues = {}
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value
      })
      return this._formValues
    }

    setEventListeners() {
      super.setEventListeners()
      this._selectorPopupForm.addEventListener('submit', (e) => {
        e.preventDefault()
        this._handleFormSubmit()
        this.close()
      })
    }

    close() {
    super.close()
    this._selectorPopupForm.reset()
    }
}