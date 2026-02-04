class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // renders all initial items
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // adds ONE DOM element to the container
  addItem(element) {
    this._container.append(element);
  }
}

export default Section;


