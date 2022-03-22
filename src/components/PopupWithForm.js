import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor({ selectorPopup, functionPopupForm: handleFormSubmit }) {
      super({ selectorPopup })
      this._handleFormSubmit = handleFormSubmit
      this._popupForm = this._selectorPopup.querySelector('.popup__form')
      this._popupButtonForm = this._popupForm.querySelector('.popup__save-button')
    }

    _getInputValues() {
      this._inputList = this._popupForm.querySelectorAll('.popup__input')
      this._formValues = {}
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value
      })
      return this._formValues
    }

    _formSubmit() {
      this._handleFormSubmit(this._getInputValues())
    }

    changeSubmitHandler(newSubmitHandler) {
      this._handleFormSubmit = newSubmitHandler

    }

    setEventListeners() {
      super.setEventListeners()
      this._popupForm.addEventListener('submit', (e) => {
        e.preventDefault()
        this._formSubmit()
        //this.close()
      })
    }

    close() {
      super.close()
      this._popupForm.reset()
    }

    renderLoading(isLoading) {
      if (isLoading) {
        this._popupButtonForm.textContent = 'Сохранение...'
      } else {
        this._popupButtonForm.textContent = 'Отправить'
      }
    }
}