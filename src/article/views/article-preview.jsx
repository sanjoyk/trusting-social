import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { setArticlePreview } from "../article-action.js";
import PreviewModal from "../components/preview-modal.jsx";

class ArticlePreview extends PureComponent {
  render() {
    const { articleId, showPreviewModal } = this.props;
    return (
      <div>
        {articleId && showPreviewModal && <PreviewModal />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { articleId, showPreviewModal } = state.articleSettings;
  return {
    articleId: articleId,
    showPreviewModal: showPreviewModal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closePreviewModal: () => dispatch(setArticlePreview(false))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePreview);