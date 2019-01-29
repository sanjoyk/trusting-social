import { ArticlesAction, MessageTypes } from "../app-constants";
import { TrustingSocialApi } from "../utils/api.js";
import { setAppMessage } from "../app-actions.js";

function loadArticlesRequest() {
  return {
    type: ArticlesAction.LOAD.REQUEST
  }
}
function loadArticlesFailure() {
  return {
    type: ArticlesAction.LOAD.FAILURE
  }
}

function loadArticlesSuccess(articles, nextPage) {
  return {
    type: ArticlesAction.LOAD.SUCCESS,
    articles: articles,
    nextPage: nextPage
  }
}

export function loadArticles(pageNo = 0) {
  return (dispatch, getState) => {
    const { articles: { articlesSettings: { currentpage } } } = getState();
    dispatch(loadArticlesRequest())
    return TrustingSocialApi()
      .get(`/articlesearch.json?api-key=5763846de30d489aa867f0711e2b031c&q=singapore&page=${currentpage + 1}`,
        (error, data) => {
          if (error) {
            dispatch(loadArticlesFailure());
            dispatch(setAppMessage(error.message, { type: MessageTypes.ERROR }))
            return Promise.reject(error);
          }
          dispatch(loadArticlesSuccess(data.response.docs, currentpage + 1));
          Promise.resolve(data);
        });
  }
}