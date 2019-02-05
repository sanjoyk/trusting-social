
import { ArticleAction } from "../app-constants";


const articleSettingDefault = {
  aricleId: undefined,
  showPreviewModal: false,
}

function articleSettings(state = articleSettingDefault, action) {
  switch (action.type) {
    case ArticleAction.SET.ARTICLE_ID: {
      return { ...state, aricleId: action.articleId }
    }
    case ArticleAction.SET.PREVIEW_MODAL: {
      return { ...state, status: action.status }
    }
    default: return state;
  }
}

export default articleSettings;