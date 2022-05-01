import { View } from './View.js';

class ViewSearch extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your input. Please try again!';
  _message = '';

  handleEvent(handler) {
    const search = document.querySelector('.search');

    search.addEventListener('submit', e => {
      e.preventDefault();
      const searchResult = search.querySelector('.search__field');
      handler(searchResult.value);
      searchResult.value = '';
      searchResult.blur();
    });
  }
  _markup() {
    return this._data.map(this._generateMarkup).join('');
  }
  _generateMarkup(recipe) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
      <a class="preview__link ${
        recipe.id === id ? 'preview__link--active' : ''
      }" href="#${recipe.id}">
        <figure class="preview__fig">
          <img src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80" alt="${
            recipe.title
          }" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${recipe.title}</h4>
          <p class="preview__publisher">${recipe.publisher}</p>
          
        </div>
      </a>
    </li>`;
  }
}
export default new ViewSearch();
