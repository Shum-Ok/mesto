/* imports */
import { Api } from '../components/Api.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js' 
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js' 
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'

// Раскоментировать при сборке WebPack'ом
import '../pages/index.css'

 /* const */
import {
  validationConfig,
  template,
  addButton,
  inputCardName,
  inputCardUrl,
  addCardForm,
  imgUrl,
  imgName,
  editProfile,
  nameInput,
  jobInput,
  profileForm,
  avatarButton,
  avatarForm,
  inputAvatarUrl,
} from '../utils/constants.js'

let userId

const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-37/',
  headers: {
    authorization: '975e0bed-b421-4a9a-8ad5-c6281150f147',
    'Content-Type': 'application/json'
  }
})

api.getUser()
  .then((user) => { // получаем объект User'а
    userId = user._id
    userData.setUserInfo(user.name, user.about,) // вставляем из объекта User нужные данные, name и about
    userData.setUserAvatar(user.avatar)
  })
  .catch(err => console.log(err))

api.getInitialCards()
  .then((data) => {
    data.forEach((item) => {
      const card = cardCreate(item).createCard()
      cardSection.addItemServer(card)
    })
  })
  .catch(err => console.log(err))

// Константы классов валидиции для форм
const formValidProfile = new FormValidator(validationConfig, profileForm)
const formValidCard = new FormValidator(validationConfig, addCardForm)
const formValidAvatar = new FormValidator(validationConfig, avatarForm)


// константа класса юзерФормы
const userData = new UserInfo({ name: '.profile__user-name', about: '.profile__user-jop', avatar: '.profile__avatar'})

// константа класса реализации карточки в DOM
const cardSection = new Section({ 
  items: [],
  renderer: (item) => { 
    const card = cardCreate(item)
    return card
    }, 
  },  
  '.elements')

// константы под классы popup'а
const popupCardImg = new PopupWithImage({ selectorPopup: '.popup_type_image' }, imgUrl, imgName) 
const popupCardAdd = new PopupWithForm({  
  selectorPopup: '.popup_type_card', 
  functionPopupForm: (card) => {
    handleCardFormSubmit(card)
  } 
})
const popupProfileEdit = new PopupWithForm({  
  selectorPopup: '.popup_type_edit',  
  functionPopupForm: (data) => { 
    handleProfileFormSubmit(data) 
  }
})
const popupDeletion = new PopupWithForm({selectorPopup: '.popup_type_delete'})

const popupAvatarEdit = new PopupWithForm({  
  selectorPopup: '.popup_type_edit-avatar',  
  functionPopupForm: (avatar) => { 
    handleAvatarFormSubmit(avatar)
  }
})


/* Function */
// создание карточки
function cardCreate(item) { 
  const cardItem = new Card(
    item, 
    template, 
    handleCardClick,
    (id) => {
      console.log(`открылся попам удаления карточки`)
      popupDeletion.open()
      popupDeletion.changeSubmitHandler(() => {
        api.deleteCard(id)
          .then(res => {
            console.log(res)
            cardItem.deleteCard()
            popupDeletion.close()
          })
      })
    },
    (id) => {
      if (cardItem.isLiked()) {
        api.deleteLike(id)
        .then((res) => {
          cardItem.setLikes(res.likes)
        })
      } else {
        api.addLike(id)
        .then((res) => {
          cardItem.setLikes(res.likes)
        })
      }
    },
    userId,
    ) 
  return cardItem
}

// открывает popup'а 'создание новой карточки'
function openPopupCard() {
  popupCardAdd.renderLoading(false)
  popupCardAdd.open()
  inputCardName.value = ''
  inputCardUrl.value = ''
  formValidCard.resetValidation()
}

function openPopupAvatar() {
  popupAvatarEdit.renderLoading(false)
  popupAvatarEdit.open()
  inputAvatarUrl.value = ''
  formValidAvatar.resetValidation()
}

// обрабатыватываем отправку формы создания карточки
function handleCardFormSubmit(item) {
  popupCardAdd.renderLoading(true)
  api.createCard(item)
    .then((data) => {
      const card = cardCreate(data).createCard()
      cardSection.addItemUser(card)
      popupCardAdd.close()
    })
}

// обрабатыватываем клик по карточке
function handleCardClick(name, link) {
  popupCardImg.open(name, link);
};

// обрабатыватываем отправку формы замены аватара
function handleAvatarFormSubmit(link) {
  popupAvatarEdit.renderLoading(true)
  api.setUserAvatar(link.link)
    .then((res) =>{
      userData.setUserAvatar(res.avatar)
      popupAvatarEdit.close()
    })
    .catch(err => console.log(err, err.status))
}

// обрабатыватываем отправку формы профиля
function handleProfileFormSubmit(data) {
  const { name, about } = data
  popupProfileEdit.renderLoading(true)
  api.setUserInfo(name, about)
    .then((user) => {
      userData.setUserInfo(user.name, user.about)
      popupProfileEdit.close()
    })
}

// открывает popup редактирования профиля
function openPopupProfile() {
  popupProfileEdit.renderLoading(false)
  popupProfileEdit.open();
  const newUserData = userData.getUserInfo();
  nameInput.value = newUserData.name;
  jobInput.value = newUserData.about;
  formValidProfile.resetValidation()
};

/* Запуск функций */
// Запуск метода валидации для каждой из форм
formValidProfile.enableValidation()
formValidCard.enableValidation()
formValidAvatar.enableValidation()

/* EventListeners */
// Popup добавления нового места
addButton.addEventListener('click', () => openPopupCard()); // открывает popup добавления места
popupCardAdd.setEventListeners() // закрывает popup'a добавления места

// Popup удаления карточки
popupDeletion.setEventListeners() // для popup'а удаления карточки

// Popup открытой карточки
popupCardImg.setEventListeners() // закрывает popup'a открытой карточки

// Popup редактирования профиля
editProfile.addEventListener('click', () => openPopupProfile());
popupProfileEdit.setEventListeners() // закрытие popup'a профиля

// Popup обновления аватара
avatarButton.addEventListener('click', () => openPopupAvatar());
popupAvatarEdit.setEventListeners()