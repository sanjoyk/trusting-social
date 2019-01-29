import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { loadArticles } from "../articles-action.js";
import AppLoader from "../../app-components/app-loader.jsx";

import ArticleList from "./article-list.jsx";

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
    } = this.props;
    return (
      <>
        <ArticleList
          loadArticles={loadArticles}
          articlesByIds={articlesByIds}

        />
        {
          isLoadingArticles &&
          <AppLoader message={`Loading ${Object.keys(articlesByIds).length > 0 ? "more" : ""} Articles...`} />
        }

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
    loadArticles: () => dispatch(loadArticles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AriclesContainer);