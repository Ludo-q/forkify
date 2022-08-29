import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPage);

    // Page 1 and there are other pages
    if (currPage === 1 && numPage > 1) {
      return this._generateMarkupButton(currPage + 1, 'next');
    }
    // Last page
    if (currPage === numPage && numPage > 1) {
      return this._generateMarkupButton(currPage - 1, 'prev');
    }
    // Others page
    if (currPage < numPage) {
      return `
        ${this._generateMarkupButton(currPage - 1, 'prev')}
        ${this._generateMarkupButton(currPage + 1, 'next')}
      `;
    }

    // Page 1 and there are NO other pages
    return '';
  }

  _generateMarkupButton(page, goTo) {
    return `
      <button
        data-goto=${page} 
        class="btn--inline pagination__btn--${goTo}">
          <svg class="search__icon">
            <use 
              href="${icons}#icon-arrow-${goTo === 'prev' ? 'left' : 'right'}">
            </use>
          </svg>
          <span>Page ${page}</span>
      </button>
    `;
  }
}

export default new PaginationView();
