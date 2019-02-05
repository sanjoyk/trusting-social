export function getArticleDetailsFromArticleId(state, articleId) {
    if (articleId) {
        debugger
        return state.articles.articlesByIds[articleId] || {}
    }
    return {}
}