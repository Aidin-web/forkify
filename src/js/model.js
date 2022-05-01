import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { API_URL, KEY, NUM_PER_PAGE } from './config.js';
import { AJAX } from './helpers.js';
import ViewPagination from './Views/ViewPagination.js';

export const state = {
  recipe: {},
  searchKeyWord: '',
  searchResults: [],
  searchPages: 1,
  currentPage: 1,
  currentResults: [],
  numPerPage: NUM_PER_PAGE,
  bookmarks: [],
};
//FIX TODO
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    //KREIRANJE USLOVNE VARIJABLE UNUTAR OBJEKTA BUG
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    state.recipe = createRecipeObject(data);
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
};

export const LoadSearch = async function (searchInput) {
  try {
    this.state.searchKeyWord = searchInput;

    const data = await AJAX(`${API_URL}?search=${searchInput}&key=${KEY}`);

    this.state.searchResults = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
      };
    });

    this.state.searchPages = Math.ceil(
      this.state.searchResults.length / NUM_PER_PAGE
    );

    if (
      this.state.searchResults.length === 0 ||
      this.state.searchResults.length === 1
    ) {
      ViewPagination._clear();
      throw new Error('No recipe with that name!');
    }

    await this.LoadPagination(1);
  } catch (err) {
    throw err;
  }
};

export const LoadPagination = async function (current) {
  this.state.currentPage = current;

  const down = (this.state.currentPage - 1) * NUM_PER_PAGE;
  const up = this.state.currentPage * NUM_PER_PAGE;

  this.state.currentResults = this.state.searchResults.slice(down, up);
};

export const getServings = async function (servings) {
  const oldServings = this.state.recipe.servings;

  this.state.recipe.ingredients.forEach(ing => {
    if (!ing.quantity) {
      ing.quantity = '';
    } else {
      ing.quantity = ((ing.quantity * servings) / oldServings).toFixed(2);
    }
  });

  this.state.recipe.servings = servings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(b => b.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');

  if (storage) {
    state.bookmarks = JSON.parse(storage);
  }
};

init();

export const addNewRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ent => {
        const arr = ent[1].replaceAll(' ', '').split(',');
        if (arr.length !== 3) throw new Error('🔥🔥🔥 Wrong input format!');

        const [quantity, unit, description] = arr;
        //TODOBUGFIX
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
