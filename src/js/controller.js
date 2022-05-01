import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import RecipeView from './Views/viewRecipe.js';
import ViewSearch from './Views/ViewSearch.js';
import ViewPagination from './Views/ViewPagination.js';
import ViewBookmarks from './Views/ViewBookmarks.js';
import addRecipeView from './Views/addRecipeView.js';
import { TIMEOUT_ADD } from './config.js';

// https://forkify-api.herokuapp.com/v2
// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
///////////////////////////////////////
const controlRecipe = async function () {
  try {
    let id = window.location.hash.slice(1);

    if (!id) return;

    RecipeView.renderSpinner();

    ViewSearch.update(model.state.currentResults);
    ViewBookmarks.update(model.state.bookmarks);

    await model.loadRecipe(id);
    const { recipe } = model.state;
    RecipeView.render(recipe);
  } catch (err) {
    RecipeView.renderError();
  }
};

const controlSearch = async function (input) {
  try {
    ViewSearch.renderSpinner();

    await model.LoadSearch(input);
    if (!input) return;

    const recipes = model.state.currentResults;
    if (recipes.length === 0) {
      throw new Error('No recipe with that name!');
    }
    ViewSearch.render(recipes);
    ViewPagination.render(model.state);
    // ViewPagination._renderPagination(
    //   model.state.currentPage,
    //   model.state.searchPages
    // );
  } catch (err) {
    ViewSearch.renderError(err);
  }
};

const controlPagination = async function (currPage) {
  try {
    await model.LoadPagination(currPage);

    const recipes = model.state.currentResults;
    if (recipes.length === 0) {
      throw new Error('No recipe with that name!');
    }
    ViewSearch.render(recipes);
    ViewPagination._markup(model.state.currentPage, model.state.searchPages);
  } catch (err) {
    throw err;
  }
};

const controlServings = async function (servings) {
  await model.getServings(servings);
  // RecipeView.render(model.state.recipe);
  RecipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  RecipeView.update(model.state.recipe);
  ViewBookmarks.render(model.state.bookmarks);
};

const controlBookmarkInit = function () {
  ViewBookmarks.render(model.state.bookmarks);
};
//TEST
const controlAddRecipe = async function (data) {
  try {
    addRecipeView.renderSpinner();
    await model.addNewRecipe(data);

    RecipeView.render(model.state.recipe);
    addRecipeView.renderMessage();

    //Dodaj novi recepat u bookmarks
    ViewBookmarks.render(model.state.bookmarks);

    //Promijeni URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView._toggleWindow();
    }, TIMEOUT_ADD * 1000);
  } catch (err) {
    addRecipeView.renderError(err);
  }
};

(function () {
  ViewBookmarks.bookmarkHandler(controlBookmarkInit);
  RecipeView.handleEvent(controlRecipe);
  ViewSearch.handleEvent(controlSearch);
  ViewPagination.handleEvent(controlPagination);
  RecipeView.handleServings(controlServings);
  RecipeView.handleBookmark(controlBookmarks);
  addRecipeView.handleAddRecipe(controlAddRecipe);
  alert(
    'just testing  continous integration from local to github to netlify... and also merging from new branch'
  );
})();
