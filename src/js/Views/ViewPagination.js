import { View } from './View.js';
import icons from 'url:../../img/icons.svg';

class ViewPagination extends View {
  _parentElement = document.querySelector('.pagination');

  _markup() {
    const currentPage = this._data.currentPage;
    const numOfPages = Math.ceil(
      this._data.searchResults.length / this._data.numPerPage
    );

    if (currentPage === 1 && numOfPages > 1) {
      return this._renderPaginationUp(currentPage);
    } else if (currentPage === numOfPages && currentPage > 1) {
      return this._renderPaginationDown(currentPage);
    } else if (numOfPages > 1) {
      return (
        this._renderPaginationUp(currentPage) +
        this._renderPaginationDown(currentPage)
      );
    }
  }

  // _renderPagination(currentPage, numOfPages) {
  //   let markup;

  //   this._clear();

  //   if (currentPage === 1 && numOfPages > 1) {
  //     markup = this._renderPaginationUp(currentPage);
  //   } else if (currentPage === numOfPages && currentPage > 1) {
  //     markup = this._renderPaginationDown(currentPage);
  //   } else if (numOfPages > 1) {
  //     markup =
  //       this._renderPaginationUp(currentPage) +
  //       this._renderPaginationDown(currentPage);
  //   }
  //   markup && this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // }
  _renderPaginationDown(currentPage) {
    return `
            <button class="btn--inline pagination__btn--prev" data-page='${
              +currentPage - 1
            }'">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${+currentPage - 1}</span>
              </button>
              `;
  }
  _renderPaginationUp(currentPage) {
    return `
            <button class="btn--inline pagination__btn--next" data-page='${
              +currentPage + 1
            }'>
              <span>Page ${+currentPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>
              `;
  }
  handleEvent(handler) {
    this._parentElement.addEventListener('click', e => {
      const nextCurrentPage = e.target.closest('.btn--inline').dataset.page;

      handler(+nextCurrentPage);
    });
  }
}

export default new ViewPagination();
