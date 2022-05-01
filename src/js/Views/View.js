import icons from 'url:../../img/icons.svg';

export class View {
  _data;

  render(data, bla = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;

    const markup = this._markup();
    if (!bla) {
      return markup;
    }

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const markup = this._markup();
    const newDOM = document.createRange().createContextualFragment(markup);
    const newEl = Array.from(newDOM.querySelectorAll('*'));
    const currEl = Array.from(this._parentElement.querySelectorAll('*'));

    newEl.forEach((el, i) => {
      const currElement = currEl[i];

      if (
        !el.isEqualNode(currElement) &&
        el.firstChild?.nodeValue.trim() !== ''
      ) {
        currElement.textContent = el.textContent;
      }
      if (!el.isEqualNode(currElement)) {
        Array.from(el.attributes).forEach(attr =>
          currElement.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `
              <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
        <div>
          <svg>
            <use href=${icons}#icon-alert-triangle></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
          <div class="message">
            <div>
              <svg>
                <use href=${icons}#icon-smile></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
