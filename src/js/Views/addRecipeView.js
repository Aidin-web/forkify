import { View } from './View.js';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _addRecipeWindow = document.querySelector('.add-recipe-window');
  _btnCloseModal = document.querySelector('.btn--close-modal');
  _btnOpenModal = document.querySelector('.nav__btn--add-recipe');
  _message = 'Success!!! ✔✔✔';
  constructor() {
    super();
    this.addHandlerRecipe();
    this.hideHandlerRecipe();
  }

  _toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._addRecipeWindow.classList.toggle('hidden');
  }

  addHandlerRecipe() {
    this._btnOpenModal.addEventListener('click', this._toggleWindow.bind(this));
    this._parentElement;
  }
  hideHandlerRecipe() {
    this._btnCloseModal.addEventListener(
      'click',
      this._toggleWindow.bind(this)
    );
    this._overlay.addEventListener('click', this._toggleWindow.bind(this));
  }

  handleAddRecipe(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      const dataArr = [...new FormData(this._parentElement)];

      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}
export default new addRecipeView();
