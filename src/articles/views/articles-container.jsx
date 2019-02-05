import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { loadArticles } from "../articles-action.js";
import AppLoader from "../../app-components/app-loader.jsx";
import ArticleList from "../components/article-list.jsx";
import ArticleDetailsModal from "../../article/views/article-details-modal.jsx";
import { setArticlePreview } from "../../article/article-action.js";

class AriclesContainer extends PureComponent {
  render() {
    const {
      //store
      articlesByIds,
      articlesSettings: {
        isLoadingArticles
      },

      //actions
      loadArticles,
      setArticlePreview,
    } = this.props;
    return (
      <>
        <ArticleList
          loadArticles={loadArticles}
          articlesByIds={articlesByIds}
          setArticlePreview={setArticlePreview}
        />
        {
          isLoadingArticles &&
          <AppLoader message={`Loading ${Object.keys(articlesByIds).length > 0 ? "more" : ""} Articles...`} />
        }
        <ArticleDetailsModal />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.articles,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadArticles: () => dispatch(loadArticles()),
    setArticlePreview: (articleId) => dispatch(setArticlePreview(true, articleId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AriclesContainer);