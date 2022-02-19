export class Section {
    constructor({ items, renderer }, container) {
      this._items = items
      this._renderer = renderer

      this._container = container
    }

    setItems() {
      this._items.forEach(item => {
        this._renderer(item)
      })
    }

    addItem(element) {
      this._container.append(element);
    }
}