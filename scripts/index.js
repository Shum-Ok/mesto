const popupElement = document.querySelector('.popup'); //переменная всего popup
const editProfile = document.querySelector('.edit-profile'); //переменная открыть редактирование профиля
const closeButton = document.querySelector('.popup__close-button'); //переменная закрыть редактирование
const saveButton = document.querySelector('.popup__save-button'); //переменная кнопки сохранить
const userName = document.querySelector('.profile__user-name'); //переменная касса имени профиля на странице
const userJop = document.querySelector('.profile__user-jop'); //переменная касса работы на странице

let nameInput = document.querySelector('.popup__user-name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__user-jop'); // Воспользуйтесь инструментом .querySelector()


function openPopup() {
	popupElement.classList.remove('popup_opened');
}

function closePopup() {
	popupElement.classList.add('popup_opened');
}

editProfile.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup)


// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
nameInput.value = userName.textContent;
jobInput.value = userJop.textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
	evt.preventDefault();

	// Получите значение полей из свойства value
	userName.textContent = nameInput.value;
	userJop.textContent = jobInput.value;

	closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 