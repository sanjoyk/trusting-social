
import { ArticleAction } from "../app-constants";


const articleSettingDefault = {
  articleId: undefined,
  showPreviewModal: false,
}

function articleSettings(state = articleSettingDefault, action) {
  switch (action.type) {
    case ArticleAction.SET.ARTICLE_ID: {
      return { ...state, articleId: action.articleId }
    }
    case ArticleAction.SET.ARTICLE_PREVIEW_MODAL: {
      debugger
      return { ...state, showPreviewModal: action.status }
    }
    default: return state;
  }
}

export default articleSettings;