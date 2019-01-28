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

function loadArticlesSuccess(articles) {
  return {
    type: ArticlesAction.LOAD.SUCCESS,
    articles: articles
  }
}

export function loadArticles(pageNo = 0) {
  return (dispatch, getState) => {
    dispatch(loadArticlesRequest())
    return TrustingSocialApi()
      .get(`/articlesearch.json?api-key=5763846de30d489aa867f0711e2b031c&q=singapore&page=${pageNo}`,
        (error, data) => {
          if (error) {
            dispatch(loadArticlesFailure());
            dispatch(setAppMessage(error.message, { type: MessageTypes.ERROR }))
            return Promise.reject(error);
          }
          dispatch(loadArticlesSuccess(data.response.docs));
          Promise.resolve(data);
        });
  }
}