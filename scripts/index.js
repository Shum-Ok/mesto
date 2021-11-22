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

const elements = document.querySelector('.elements');
const template = document.querySelector('.template'); // переменная блока карточки
const initialCards = [
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

const createCard = (item) => {
  const newCard = template.content.querySelector('.element').cloneNode(true);
  newCard.querySelector('.element__title').textContent = item.name;
  newCard.querySelector('.element__photo').src = item.link;
  newCard.querySelector('.element__photo').alt = item.name;

  const buttonDeleteCard = newCard.querySelector('.element__delete');
  const buttonLike = newCard.querySelector('.element__heart');

  buttonDeleteCard.addEventListener('click', deleteCard);
  function likeCard() {
    buttonLike.classList.toggle('element__heart-active');
  }
  buttonLike.addEventListener('click', likeCard);

  function openPhoto(photo) {
    openPopup(popupImage);
    photo.querySelector('.popup__image-url').src = item.link;
    photo.querySelector('.popup__image-url').alt = item.name;
    photo.querySelector('.popup__image-name').textContent = item.name;
  }

  newCard
    .querySelector('.element__photo')
    .addEventListener('click', () => openPhoto(popupImage));

  return newCard;
};

const popupImage = document.querySelector('.popup_type_image');
const closeButtonImage = popupImage.querySelector('.popup__close-button');
const result = initialCards.map((item) => {
  return createCard(item);
});


function openPopup(popup) {
  popup.classList.add('popup_opened');
}
  
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopupProfile() {
  openPopup(popupTypeEdit);
  nameInput.value = userName.textContent;
  jobInput.value = userJop.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value; // Получите значение полей из свойства value
  userJop.textContent = jobInput.value;
  closePopup(popupTypeEdit);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  elements.prepend(
    createCard({ name: inputCardName.value, link: inputCardUrl.value })
  );
  inputCardName.value = '';
  inputCardUrl.value = ''; 
  closePopup(popupTypeCard);
}

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

closeButtonCard.addEventListener('click', () => closePopup(popupTypeCard)); // закрывает popup длбавления места
addButton.addEventListener('click', () => openPopup(popupTypeCard)); // открывает popup добавления места
editProfile.addEventListener('click', openPopupProfile);
closeProfileButton.addEventListener('click', () => closePopup(popupTypeEdit));
profileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleCardFormSubmit);
closeButtonImage.addEventListener('click', () => closePopup(popupImage));
elements.append(...result);