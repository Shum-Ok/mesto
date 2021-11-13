const popupElement = document.querySelector('.popup'); //переменная всего popup
const editProfile = document.querySelector('.edit-profile'); //переменная открыть редактирование профиля
const closeButton = document.querySelector('.popup__close-button'); //переменная закрыть редактирование

const userName = document.querySelector('.profile__user-name'); //переменная касса имени профиля на странице
const userJop = document.querySelector('.profile__user-jop'); //переменная касса работы на странице

let nameInput = document.querySelector('.popup__input_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__input_jop'); // Воспользуйтесь инструментом .querySelector()

let formElement = document.querySelector('.popup__form'); // Находим форму в DOM


function openPopup() {
  popupElement.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userJop.textContent;
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value; // Получите значение полей из свойства value
  userJop.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»

editProfile.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);