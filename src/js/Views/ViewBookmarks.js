import { View } from './View.js';
import viewPreview from './viewPreview.js';

class ViewBookmarks extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it 🔥:)';
  _message = '';

  bookmarkHandler(handler) {
    window.addEventListener('load', handler);
  }

  _markup() {
    return this._data.map(b => viewPreview.render(b, false)).join('');
  }
}
export default new ViewBookmarks();
