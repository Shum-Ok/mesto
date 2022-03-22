export class FormValidator {
  constructor(config, form) {
    this._config = config
    this._form = form
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector)
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`) // нашли id span елемента
    inputElement.classList.remove(this._config.inputErrorClass)
    errorElement.classList.remove(this._config.errorClass)
    errorElement.textContent = '' 
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`) // нашли id span елемента
    inputElement.classList.add(this._config.inputErrorClass)
    errorElement.classList.add(this._config.errorClass)
    errorElement.textContent = inputElement.validationMessage
  }

  _toggleButtonState() {
    const isFormValid = this._form.checkValidity()
    this._buttonElement.classList.toggle(this._config.inactiveButtonClass, !isFormValid)
    this._buttonElement.disabled = !isFormValid
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement)
    } else {
      this._showInputError(inputElement)
    }
  }

  _setEventListeners() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault() // сбрасывает перезагрузку страници при отправке формы
    })
    this._inputList = this._form.querySelectorAll(this._config.inputSelector)

    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement) // вызывает метод "спраять" для каждого input элемента 
    })
    this._toggleButtonState()
  }

  enableValidation() {
    this._setEventListeners()
  }
}