const hideInputError = (formElement, inputElement, config) => {
  const { inputErrorClass, errorClass, } = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass} ) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.valid) {
      hideInputError(formElement, inputElement, config);
  } else {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
  }
}

const toggleButtonState = (formElement, buttonElement, inactiveButtonClass) => {
  const isFormValid = formElement.checkValidity();
  buttonElement.disabled = !isFormValid;
  buttonElement.classList.toggle(inactiveButtonClass, !isFormValid)
}

const setEventListeners = (formElement, config) => {
  const {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
  } = config
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(formElement, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, { errorClass, inputErrorClass });
        toggleButtonState(formElement, buttonElement, inactiveButtonClass);
    });
});
  };

  const enableValidation = (config) => {
    const { formSelector, ...props } = config;
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, props);
    })
};