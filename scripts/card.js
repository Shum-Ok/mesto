export class Card {
    constructor(data, cardTemplate, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardTemplate = cardTemplate; // создание самой разметки карточки
        this._handleCardClick = handleCardClick; // назвние функции записи данных в карточку
    };

    _getTemplate() {
        const cardItem = this._cardTemplate.content.querySelector('.element').cloneNode(true); // нашли и клонироввали шаблон карточки
        return cardItem;
    };

    generateCard() {
        this._card = this._getTemplate(); // записали разметку в приватное поле _card
        this._cardImage = this._card.querySelector('.element__photo'); // нашли картинку в карточке для записи данных

        // записываем данные
        this._cardImage.alt = this._name; // атрибут alt он же название "места"
        this._cardImage.src = this._link; // атрибут src она же ссылка на картинку "места"
        this._card.querySelector('.element__title').textContent = this._name; // записали в title названия места

        this._setEventListeners();
        return this._card; //вернули карточку
    };

    _setEventListeners() { // метод отбработчик или слушатель клика
        this._cardImage.addEventListener('click', () => { // запись данных по карточке
            this._handleCardClick(this._name, this._link);
        });

        this._card.querySelector('.element__heart').addEventListener('click', function(e) { // поставить лайк
            e.target.classList.toggle('element__heart-active');
        });

        this._card.querySelector('.element__delete').addEventListener('click', () => { // удалить карточку
            this._card.remove();
        });

    };
};