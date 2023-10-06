/* const */
// Массив из объектов стандартных карточек
export const initialCards = [
  {
    name: 'Воронеж',
    link: 'https://static.tildacdn.com/tild3062-3332-4562-b961-353139363065/4061-voronezh-admira.jpg',
  },
  {
    name: 'Хабаровск',
    link: 'https://alarmtrade.ru/wp-content/uploads/2020/11/8747.jpg',
  },
  {
    name: 'Воицкий Падун',
    link: 'https://avatars.mds.yandex.net/get-zen_doc/2442582/pub_5f23bcaae0739b7429bc0ef2_5f23be46b85040691c389331/scale_1200',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
]

// Объект конфигураций влидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  errorClass: 'popup__error_visible',
}

export const elements = document.querySelector('.elements') //контейнер для отображения карточек
export const template = document.querySelector('.template').content // template заготовка карточки

// Для popup'а добавления карточки
export const addButton = document.querySelector('.add-button')
export const popupTypeCard = document.querySelector('.popup_type_card')
export const inputCardName = popupTypeCard.querySelector(
  '.popup__input_card_name'
)
export const inputCardUrl = popupTypeCard.querySelector(
  '.popup__input_card_url'
)
export const addCardForm = popupTypeCard.querySelector('.popup__form')
export const deleteCard = popupTypeCard.querySelector('.element__delete')

// Для popup'a открытой карточки
export const popupImage = document.querySelector('.popup_type_image')
export const imgUrl = document.querySelector('.popup__image-url')
export const imgName = document.querySelector('.popup__image-name')

// Для popup'a профайла
export const popupTypeEdit = document.querySelector('.popup_type_edit')
export const editProfile = document.querySelector('.edit-profile')
export const nameInput = document.querySelector('.popup__input_string_name')
export const jobInput = document.querySelector('.popup__input_string_jop')
export const profileForm = popupTypeEdit.querySelector('.popup__form')

// Для popup'a смены аватара
export const avatarButton = document.querySelector('.profile__avatar-button')
export const popupAvavtarEdit = document.querySelector(
  '.popup_type_edit-avatar'
)
export const avatarForm = popupAvavtarEdit.querySelector('.popup__form')
export const inputAvatarUrl = popupAvavtarEdit.querySelector(
  '.popup__input_avatar_url'
)
