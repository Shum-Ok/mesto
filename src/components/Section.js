export class Section {
    constructor({ items, renderer }, container) {
      this._items = items // передаем пропис
      this._renderer = renderer

      this._container = document.querySelector(container)
    }

    setItems() {
      this._items.then((cards) => {
        cards.forEach(card => {
          this._renderer(card)
        })
      })
    }
    
    addItemServer(element) {
      this._container.append(element); //.append/prepend(element);
    }

    addItemUser(element) {
      this._container.prepend(element); //.append/prepend(element);
    }
}