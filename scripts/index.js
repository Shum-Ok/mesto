import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js' 

/* const */
// Массив из объектов стандартных карточек
const initialCards = [
  {
    name: 'Воронеж',
    link: 'https://static.tildacdn.com/tild3062-3332-4562-b961-353139363065/4061-voronezh-admira.jpg'
  },
  {
    name: 'Хабаровск',
    link: 'https://alarmtrade.ru/wp-content/uploads/2020/11/8747.jpg'
  },
  {
    name: 'Воицкий Падун',
    link: 'https://avatars.mds.yandex.net/get-zen_doc/2442582/pub_5f23bcaae0739b7429bc0ef2_5f23be46b85040691c389331/scale_1200'
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
  },
];

// Объект конфигураций влидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  errorClass: 'popup__error_visible',
}

const elements = document.querySelector('.elements'); //контейнер для отображения карточек
const template = document.querySelector('.template').content; // template заготовка карточки

// Для popup'а добавления карточки
const addButton = document.querySelector('.add-button');
const popupTypeCard = document.querySelector('.popup_type_card');
const inputCardName = popupTypeCard.querySelector('.popup__input_card_name'); 
const inputCardUrl = popupTypeCard.querySelector('.popup__input_card_url'); 
const closeButtonCard = popupTypeCard.querySelector('.popup__close-button');
const addCardForm = popupTypeCard.querySelector('.popup__form');

// Для popup'a открытой карточки
const popupImage = document.querySelector('.popup_type_image');
const imgUrl = document.querySelector('.popup__image-url');
const imgName = document.querySelector('.popup__image-name');
const closeButtonImage = popupImage.querySelector('.popup__close-button'); 

// Для popup'a профайла
const popupTypeEdit = document.querySelector('.popup_type_edit');
const editProfile = document.querySelector('.edit-profile');
const closeProfileButton = popupTypeEdit.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__input_string_name');
const jobInput = document.querySelector('.popup__input_string_jop');
const userName = document.querySelector('.profile__user-name');
const userJop = document.querySelector('.profile__user-jop');
const profileForm = popupTypeEdit.querySelector('.popup__form');

// Константы валидиции для форм
const formValidProfile = new FormValidator(validationConfig, profileForm)
const formValidCard = new FormValidator(validationConfig, addCardForm)


/* Function */
// Функция создания карточки
function createNewCard(e) {
  e.preventDefault();
  const card = new Card({name: inputCardName.value, link: inputCardUrl.value}, template, handleCardClick);
  elements.append(card.createCard())
  closePopup(popupTypeCard);
  formValidCard.resetValidation()
}

// Функция проходит по массиву, создает карточки для каждого элемента и возвражает на страницу
function displayCards(cards) {
  cards.forEach(item => {
    const card = new Card(item, template, handleCardClick);
    elements.append(card.createCard())
  })
}

// открывает popup карточки
function handleCardClick(name, link) { 
  // открываем попап универсальной функцией, которая навешивает обработчик Escape внутри себя
  imgUrl.src = link; // устанавливаем ссылку в атрибут src для тега img  
  imgUrl.alt = name; // устанавливаем текст в атрибут alt для тега img
  imgName.textContent = name; // устанавливаем текст в тег h1
  openPopup(popupImage); // открывает попап с картинкой
};

// Профайл
function openPopupProfile() {
  openPopup(popupTypeEdit);
  nameInput.value = userName.textContent;
  jobInput.value = userJop.textContent;
  formValidProfile.resetValidation()
};
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value; // Получите значение полей из свойства value
  userJop.textContent = jobInput.value;
  closePopup(popupTypeEdit);
};

// Открытие popup'оф
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEscape);
  document.addEventListener('mousedown', clickOverlay);
}

// Закрытие popup'оф
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEscape);
  document.removeEventListener('mousedown', clickOverlay);
}
function pressEscape (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};
function clickOverlay (evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  };
};

/* Запуск функций */
// Запуск метода валидации для каждой из форм
formValidProfile.enableValidation()
formValidCard.enableValidation()

// Запуск функции создания карточек для массива с заготовками
displayCards(initialCards)

/* EventListeners */
// Popup добавления нового места
addCardForm.addEventListener('submit', createNewCard);
addButton.addEventListener('click', () => openPopup(popupTypeCard)); // открывает popup добавления места
closeButtonCard.addEventListener('click', () => closePopup(popupTypeCard)); // закрывает popup длбавления места

// Popup открытой карточки
closeButtonImage.addEventListener('click', () => closePopup(popupImage));

// Профайл
editProfile.addEventListener('click', openPopupProfile);
closeProfileButton.addEventListener('click', () => closePopup(popupTypeEdit));
profileForm.addEventListener('submit', handleProfileFormSubmit);