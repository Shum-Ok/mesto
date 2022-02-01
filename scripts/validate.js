// функция спрятать ошибки заполнения полей если валидна
const hideInputError = (formElement, inputElement, config) => {
  const { inputErrorClass, errorClass, } = config
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`) // нашли id span елемента
  inputElement.classList.remove(inputErrorClass)
  errorElement.classList.remove(errorClass)
  errorElement.textContent = ''
}

// функция показать ошибки заполения полей если НЕ валидна
const showInputError = (formElement, inputElement, config) => {
  const { inputErrorClass, errorClass, } = config
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`) // нашли id span елемента
  inputElement.classList.add(inputErrorClass)
  errorElement.classList.add(errorClass)
  errorElement.textContent = inputElement.validationMessage
}

// функция проверки кнопки на валидность
const toggleButtonState = (formElement, buttonElement, config) => {
  const { inactiveButtonClass, } = config
  const isFormValid = formElement.checkValidity()
  buttonElement.classList.toggle(inactiveButtonClass, !isFormValid)
  buttonElement.disabled = !isFormValid
}

// эта функция будет запускаться при вводе в поля input'ов
const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.valid) {
      hideInputError(formElement, inputElement, config)
  } else {
      showInputError(formElement, inputElement, config)
  }
}

const setEventListeners = (formElement, config) => {
  const { inputSelector, submitButtonSelector, } = config
  formElement.addEventListener('submit', (e) => {
    e.preventDefault() // сбрасывает перезагрузку страници при отправке формы
  })
  const inputList = Array.from(formElement.querySelectorAll(inputSelector))
  const buttonElement = formElement.querySelector(submitButtonSelector)
  toggleButtonState(formElement, buttonElement, config)
  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
          checkInputValidity(formElement, inputElement, config)
          toggleButtonState(formElement, buttonElement, config)
      })
  })
}

const enableValidation = (config) => {
  const { formSelector } = config // диструкторизация
  const forms = document.querySelectorAll(formSelector)
  forms.forEach((form) => {
    setEventListeners(form, config)
  })
}