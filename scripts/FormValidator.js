export class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;

        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
    };

    //   const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass} ) => {
    //     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    //     inputElement.classList.add(inputErrorClass);
    //     errorElement.textContent = errorMessage;
    //     errorElement.classList.add(errorClass);
    //   };
    _showInputError (inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._config.errorClass);
    };

    // const hideInputError = (formElement, inputElement, config) => {
    //     const { inputErrorClass, errorClass, } = config;
    //     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    //     inputElement.classList.remove(inputErrorClass);
    //     errorElement.classList.remove(errorClass);
    //     errorElement.textContent = '';
    //  }
    _hideInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`); // элемент ошибки
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = ''; // Очищаем текст.
    };

    //   const checkInputValidity = (formElement, inputElement, config) => {
    //     if (inputElement.validity.valid) {
    //         hideInputError(formElement, inputElement, config);
    //     } else {
    //         showInputError(formElement, inputElement, inputElement.validationMessage, config);
    //     }
    //   }
    _isValid = (inputElement) => {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        };
    };

    //   const toggleButtonState = (formElement, buttonElement, inactiveButtonClass) => {
    //     const isFormValid = formElement.checkValidity();
    //     buttonElement.disabled = !isFormValid;
    //     buttonElement.classList.toggle(inactiveButtonClass, !isFormValid)
    //   }
    // Функция принимает массив полей ввода
    // и элемент кнопки, состояние которой нужно менять
    _toggleButtonState = () => {
        const isFormValid = this._form.checkValidity(); // Проверяем, валидность формы.
        this._submitButton.disabled = !isFormValid; // Если форма невалидна, то присваиваем свойству disabled кнопки значение true
        this._submitButton.classList.toggle(this._config.inactiveButtonClass, !isFormValid); // Если форма невалидна, добавляем кнопке класс
    };

//   const setEventListeners = (formElement, config) => {
//     const {
//         inputSelector,
//         submitButtonSelector,
//         inactiveButtonClass,
//         inputErrorClass,
//         errorClass
//     } = config
//     const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//     const buttonElement = formElement.querySelector(submitButtonSelector);
//     toggleButtonState(formElement, buttonElement, inactiveButtonClass);
//     inputList.forEach((inputElement) => {
//       inputElement.addEventListener('input', () => {
//           checkInputValidity(formElement, inputElement, { errorClass, inputErrorClass });
//           toggleButtonState(formElement, buttonElement, inactiveButtonClass);
//       });
//   });
//   };
    _setEventListeners = () => {
        this._toggleButtonState(); // проверяем состояние кнопки

        this._inputList.forEach((inputElement) => { // Обойдём все элементы полученной коллекции
            inputElement.addEventListener('input', () => { // каждому полю добавим обработчик события input
                this._isValid(inputElement); // вызавим функцию _isValid, передаем ей форму и проверяемый элемент
                this._toggleButtonState(); // чтобы проверять его при изменении любого из полей
            });
        });
    };

    //     const enableValidation = (config) => {
    //       const { formSelector, ...props } = config;
    //       const formList = Array.from(document.querySelectorAll(formSelector));
    //       formList.forEach((formElement) => {
    //           formElement.addEventListener('submit', (evt) => {
    //               evt.preventDefault();
    //           });
    //           setEventListeners(formElement, props);
    //       })
    //   };
    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };

    resetValidation() {
        this._form.reset();
        this._inputList.forEach((inputElement), () => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    };
};