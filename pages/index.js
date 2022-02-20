/* imports */
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js' 
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js' 
import { PopupWithForm } from '../components/PopupWithForm.js' 
import { UserInfo } from '../components/UserInfo.js'

// Раскоментировать при сборке WebPack'ом
// import '../pages/index.css'

// /* const */
import {
  initialCards,
  validationConfig,
  elements,
  template,
  addButton,
  popupTypeCard,
  inputCardName,
  inputCardUrl,
  addCardForm,
  popupImage,
  imgUrl,
  imgName,
  popupTypeEdit,
  editProfile,
  nameInput,
  jobInput,
  profileForm,
} from '../utils/constants.js'


// Константы классов валидиции для форм
const formValidProfile = new FormValidator(validationConfig, profileForm)
const formValidCard = new FormValidator(validationConfig, addCardForm)

// константа класса юзерФормы
const userData = new UserInfo({ name: '.profile__user-name', info: '.profile__user-jop', })

// константа класса реализации карточки в DOM
const cardSection = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, template, handleCardClick)
      const cardElenent = card.createCard()
      cardSection.addItem(cardElenent)
      },
    }, 
    elements)

// константы под классов popup'а
const popupCardImg = new PopupWithImage({ selectorPopup: popupImage }, imgUrl, imgName)
const popupCardAdd = new PopupWithForm({ 
      selectorPopup: popupTypeCard,
      functionPopupForm: () => {
        const card = new Card({name: inputCardName.value, link: inputCardUrl.value}, template, handleCardClick);
        elements.append(card.createCard())
      }
    })
const popupProfileEdit = new PopupWithForm({ 
      selectorPopup: popupTypeEdit, 
      functionPopupForm: () => {
        userData.setUserInfo({ name: nameInput.value, info: jobInput.value, })
      }})

/* Function */
// открывает popup создание новой карточки
function openPopupCard() {
  popupCardAdd.open()
  inputCardName.value = ''
  inputCardUrl.value = ''
  formValidCard.resetValidation()
}

// открывает popup карточки
function handleCardClick(name, link) {
  popupCardImg.open(name, link);
};

// Профайл
function openPopupProfile() {
  popupProfileEdit.open();
  const newUserData = userData.getUserInfo();
  nameInput.value = newUserData.name;
  jobInput.value = newUserData.info;
  formValidProfile.resetValidation()
};

/* Запуск функций */
// Запуск метода валидации для каждой из форм
formValidProfile.enableValidation()
formValidCard.enableValidation()

// Реализания карточек
cardSection.setItems()

/* EventListeners */
// Popup добавления нового места
addButton.addEventListener('click', () => openPopupCard()); // открывает popup добавления места
popupCardAdd.setEventListeners() // закрывает popup'a добавления места

// Popup открытой карточки
popupCardImg.setEventListeners() // закрывает popup'a открытой карточки

// Профайл
editProfile.addEventListener('click', () => openPopupProfile());
popupProfileEdit.setEventListeners() // закрытие popup'a профиля