
import { ArticleAction } from "../app-constants";

export function setArticleId(articleId) {
  return {
    type: ArticleAction.SET.ARTICLE_ID,
    articleId: articleId
  }
}

export function setArticlePreviewModal(status) {
  return {
    type: ArticleAction.SET.ARTICLE_PREVIEW_MODAL,
    status: status
  }
}