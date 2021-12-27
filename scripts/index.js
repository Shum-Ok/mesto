import { Card } from './card.js'; 
import { FormValidator } from './FormValidator.js';

const formValidators = {};
const editProfile = document.querySelector('.edit-profile'); //переменная открыть редактирование профиля
const userName = document.querySelector('.profile__user-name'); //переменная касса имени профиля на странице
const userJop = document.querySelector('.profile__user-jop'); //переменная касса работы на странице
const popupTypeEdit = document.querySelector('.popup_type_edit'); // Ключ для popup'а редактирования профиля
const nameInput = document.querySelector('.popup__input_string_name'); // Ключ для строки профиля в popup'е
const jobInput = document.querySelector('.popup__input_string_jop'); // Ключ для строки профиля в popup'е
const closeProfileButton = popupTypeEdit.querySelector('.popup__close-button'); //переменная закрыть popup редактирования Профиля
const profileForm = popupTypeEdit.querySelector('.popup__form'); // Кнопка сохранить в popup'е профиля

const addButton = document.querySelector('.add-button'); // переменная кнопки добавления "Места" 
const popupTypeCard = document.querySelector('.popup_type_card'); // Ключ для popup'а добавлядения места
const inputCardName = popupTypeCard.querySelector('.popup__input_card_name'); // Ключ для строки профиля в popup'е
const inputCardUrl = popupTypeCard.querySelector('.popup__input_card_url'); // Ключ для строки профиля в popup'е
const closeButtonCard = popupTypeCard.querySelector('.popup__close-button'); //переменная закрыть popup редактирования "Места"
const addCardForm = popupTypeCard.querySelector('.popup__form'); // Форма popup'а в редактировании профиля
const saveButtonCards = addCardForm.querySelector('.popup__save-button'); // нашли кнопку "Создать" в popup'пе создания карточки

const imgUrl = document.querySelector('.popup__image-url'); // класс тега img в попапе открывающей картинку карточки
const imgName = document.querySelector('.popup__image-name'); // класс тега h1 в попапе открывающей картинку карточки

const popupImage = document.querySelector('.popup_type_image');
const closeButtonImage = popupImage.querySelector('.popup__close-button');

const elements = document.querySelector('.elements'); // нашли секцию для отображения карточек в html

const template = document.querySelector('.template'); // нашли шаблон/заготовку для создания карточки

const initialCards = [ // массив со стандартными карточками при открытии страници
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


// Функция для создания новой карточки
function createCard(item) {
  const card = new Card(item, template, handleCardClick); // Создается новая карточка и записывается в переменную
  // Создаём карточку и возвращаем наружу
  return card.generateCard(); // возвращаем публичную функцию из класса Card
};

// Создания карточки через class 
const newCard = (cardInfo) => {
  const card = new Card(cardInfo, template, handleCardClick);
  const cardItem = card.creatCard();
  elements.prepend(cardItem);
};

// Функция открытия popup'а , дописывает класс
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEscape);
  document.addEventListener('mousedown', clickOverlay);
};
  
//функция закрытия popup'а , удаляет класс
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEscape);
  document.removeEventListener('mousedown', clickOverlay);
};

// функция закрытия popup'а при нажатии на 'Esc'
function pressEscape (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

// функция закрытия popup'а при клике вне зоны попапа
function clickOverlay (evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  };
};


function openPopupProfile() {
  openPopup(popupTypeEdit);
  nameInput.value = userName.textContent;
  jobInput.value = userJop.textContent;
};

// вызывается функция при нажатии на сохранить в форме профиля 
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // сбрасывает стандартное повидение(что бы не перезагружалась страница после нажатия)
  userName.textContent = nameInput.value; // Записывает значение полей input'ов попапа в контекста в странице HTML 
  userJop.textContent = jobInput.value;
  closePopup(popupTypeEdit); //вызывает функцию закрытия попапа
};

// Функция вызывается при нажитии на кнопку "Создать" в попапе добавления карточек
function handleCardFormSubmit(evt) {
  evt.preventDefault(); //сбрасывает стандартное поведение(не перезагружается страница после нажатия)
  const element = createCard({ name: inputCardName.value, link: inputCardUrl.value });
  prependCard(element);
  inputCardName.value = ''; // очещаем поля для следующего открытия
  inputCardUrl.value = '';
  closePopup(popupTypeCard);
  //toggleButtonState(addCardForm, saveButtonCards, 'popup__save-button_disabled');
}

addButton.addEventListener('click', () => openPopup(popupTypeCard)); // открывает popup добавления места
editProfile.addEventListener('click', openPopupProfile); // слушатель при клике на кнопку 'редактировать профиль'
closeProfileButton.addEventListener('click', () => closePopup(popupTypeEdit));
closeButtonImage.addEventListener('click', () => closePopup(popupImage));
closeButtonCard.addEventListener('click', () => closePopup(popupTypeCard)); // закрывает popup длбавления места
profileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleCardFormSubmit);


// функция добавления карточки в DOM
const prependCard = (cardElement) => {
  elements.prepend(cardElement);
};

// функция клика по карточке
function handleCardClick(name, link) {
  // открываем попап универсальной функцией, которая навешивает обработчик Escape внутри себя
  imgUrl.src = link; // устанавливаем ссылку в атрибут src для тега img  
  imgUrl.alt = name; // устанавливаем текст в атрибут alt для тега img
  imgName.textContent = name; // устанавливаем текст в тег h1
  openPopup(popupImage); // открывает попап с картинкой
};

// проход по масиву карточек и добавление карточек
initialCards.forEach((item) => {
  const card = createCard(item);
  prependCard(card); // запускаем функцию добавления карточки в DOM
});

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // вот тут в объект записываем под именем формы
    formValidators[ formElement.name ] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);