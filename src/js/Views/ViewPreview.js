import icons from 'url:../../img/icons.svg';

import { View } from './View.js';

class viewPreview extends View {
  _parentElement = '';

  _markup() {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
      <a class="preview__link ${
        this._data.id === id ? 'preview__link--active' : ''
      }" href="#${this._data.id}">
        <figure class="preview__fig">
          <img src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80" alt="${
            this._data.title
          }" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${this._data.title}</h4>
          <p class="preview__publisher">${this._data.publisher} bla</p>
          <div class="preview__user-generated ">
          test
            <svg>
            <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
        
      </a>
    </li>`;
  }
}
export default new viewPreview();
//   this._data.key ? '' : 'hidden'
