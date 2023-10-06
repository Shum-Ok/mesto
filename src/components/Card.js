export class Card {
  constructor(
    elementCard,
    templateCard,
    functionCardClick,
    openPopupDeleteCard,
    handelLikeClick,
    userId
  ) {
    this._elementCardName = elementCard.name
    this._elementCardLink = elementCard.link
    this._elementCardCountLikes = elementCard.likes
    this._elementCardId = elementCard._id
    this._elementCardUserId = elementCard.owner._id
    this._userId = userId

    this._templateCard = templateCard.querySelector('.element')
    this._functionCardClick = functionCardClick
    this._openPopupDeleteCard = openPopupDeleteCard
    this._handelLikeClick = handelLikeClick

    //this._removeItem = this._removeItem.bind(this)
  }

  _createView() {
    this._templateView = this._templateCard.cloneNode(true) //склонировали то что внутри карточки
  }

  deleteCard() {
    this._templateView.remove()
    this._templateView = null
  }

  isLiked() {
    const isLikeUser = this._elementCardCountLikes.find(
      (user) => user._id === this._userId
    )
    return isLikeUser
  }

  setLikes(countLikes) {
    this._cardLiked = this._templateView.querySelector('.element__heart')
    this._elementCardCountLikes = countLikes
    this._countLikes = this._templateView.querySelector('.element__heart-count')
    this._countLikes.textContent = this._elementCardCountLikes.length

    this._cardLikedActive = 'element__heart-active'
    if (this.isLiked()) {
      this._cardLiked.classList.add(this._cardLikedActive)
    } else {
      this._cardLiked.classList.remove(this._cardLikedActive)
    }
  }

  _addEventListeners() {
    this._cardLiked.addEventListener('click', () =>
      this._handelLikeClick(this._elementCardId)
    )
    this._cardRemove.addEventListener('click', () =>
      this._openPopupDeleteCard(this._elementCardId)
    )
    this._cardImg.addEventListener('click', () =>
      this._functionCardClick(this._elementCardName, this._elementCardLink)
    )
  }

  createCard() {
    this._createView()
    this.setLikes(this._elementCardCountLikes)

    this._cardRemove = this._templateView.querySelector('.element__delete')
    this._cardTitle = this._templateView.querySelector('.element__title')
    this._cardImg = this._templateView.querySelector('.element__photo')

    this._cardTitle.textContent = this._elementCardName
    this._cardImg.src = this._elementCardLink
    this._cardImg.alt = this._elementCardName

    if (this._elementCardUserId === this._userId) {
      this._cardRemove.classList.add('element__delete_visible')
    }

    this._addEventListeners()
    return this._templateView
  }
}
