import { ArticlesAction } from "../app-constants";
import { combineReducers } from "redux";

const articlesByIds = (state = {}, action) => {
  switch (action.type) {
    case ArticlesAction.LOAD.SUCCESS: {
      const newArticles = {};
      const { articles } = action;
      articles.forEach(article => {
        newArticles[article._id] = article;
      });

      return {
        ...state,
        ...newArticles,
      }
    }
    default: return state;
  }
}

const articlesSettingsDefault = {
  isLoadingArticles: false,
  currentpage: 0,
  hasMoreData: true,

}
const articlesSettings = (state = articlesSettingsDefault, action) => {
  switch (action.type) {
    case ArticlesAction.LOAD.REQUEST: {
      return { ...state, isLoadingArticles: true };
    }
    case ArticlesAction.LOAD.FAILURE: {
      return {
        ...state,
        isLoadingArticles: false,
      };
    }
    case ArticlesAction.LOAD.SUCCESS: {
      return {
        ...state,
        isLoadingArticles: false,
        currentpage: action.nextPage
      };
    }
    default: return state;
  }
}

const articles = combineReducers({
  articlesSettings,
  articlesByIds
});

export default articles;
