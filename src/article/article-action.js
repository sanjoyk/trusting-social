
import { ArticleAction } from "../app-constants";

export function setArticleId(articleId) {
  return {
    type: ArticleAction.SET.ARTICLE_ID,
    articleId: articleId
  }
}
function setArticlePreviewModal(status) {
  return {
    type: ArticleAction.SET.ARTICLE_PREVIEW_MODAL,
    status: status
  }
}

export function setArticlePreview(status, articleId) {
  return (dispatch, getState) => {
    dispatch(setArticleId(articleId))
    dispatch(setArticlePreviewModal(status));
  }
}