import React, { PureComponent } from "react";
import { connect } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
// import CloseIcon from '@material-ui/icons/Close';

import { setArticlePreview } from "../article-action.js";

import ArticleDetails from "../../articles/components/article-details.jsx";
import { getArticleDetailsFromArticleId } from "../../app-selector.js";




const CustomDialogTitle = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, setArticlePreview } = props;
  return (
    <DialogTitle disableTypography className={classes.root}>
      <Typography variant="subheading">
        <div style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>
          {children}
        </div>
      </Typography>
      <IconButton aria-label="Close" className={classes.closeButton} onClick={setArticlePreview}>
        {/* <CloseIcon /> */}
      </IconButton>
    </DialogTitle>
  );
});


class ArticleDetailsModal extends PureComponent {
  render() {
    const {
      setArticlePreview,
      articleId,
      showPreviewModal,
      articleDetails
    } = this.props;
    return (
      <Dialog
        open={articleId && showPreviewModal}
        fullWidth={true}
        onClose={this.hide}
        maxWidth="sm"
        aria-labelledby="customized-dialog-title"
      >
        <CustomDialogTitle setArticlePreview={setArticlePreview}>Article Details </CustomDialogTitle>
        <DialogContent>
          <ArticleDetails
            articleDetails={articleDetails}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={setArticlePreview}>
            Close
        </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
const mapStateToProps = state => {
  const { articleId, showPreviewModal } = state.articleSettings;
  return {
    articleId: articleId,
    showPreviewModal: showPreviewModal,
    articleDetails: getArticleDetailsFromArticleId(state, articleId)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setArticlePreview: () => dispatch(setArticlePreview(false, undefined)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetailsModal);