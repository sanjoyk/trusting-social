import React, { PureComponent } from 'react';
import GridContiner from "@material-ui/core/Grid";
import debounce from "lodash.debounce";
import GridItem from '../../app-components/grid-item';
import { withStyles } from '@material-ui/core/styles';

import { trackWindowScroll, LazyLoadComponent } from 'react-lazy-load-image-component';
import ArticleDetails from "./article-details.jsx";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: theme.palette.background.paper,
  },

});

class ArticleList extends PureComponent {
  constructor(props) {
    super(props);
    this.loadArticlesOnScroll = debounce(this.loadArticlesOnScroll, 200);

  }
  loadArticlesOnScroll = () => {
    this.fetchArticles();
  }

  fetchArticles = () => {
    const listHeight = document.getElementById("artical-list-container").offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY
    if ((listHeight - windowHeight - scrollY) < 200) {
      this.props.loadArticles();
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.loadArticlesOnScroll);
    this.props.loadArticles();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.loadArticlesOnScroll);
  }

  setPreviewArticlekey = key => () => {
    this.props.setArticlePreview(key);
  }
  render() {
    const { articlesByIds, classes, scrollPosition, } = this.props;
    return (
      <div id="artical-list-container">
        <GridContiner className={classes.root}  >
          {
            Object.entries(articlesByIds).map(([key, articleDetails]) => {
              return (
                <LazyLoadComponent key={key} >
                  <GridItem onClick={this.setPreviewArticlekey(key)} style={{ display: "inline-block", boxSizing: "border-box", cursor: "pointer" }} xs={4} sm={4} md={4}>
                    <ArticleDetails
                      articleDetails={articleDetails}
                      scrollPosition={scrollPosition}
                    />
                  </GridItem>
                </LazyLoadComponent>
              )
            }
            )
          }
        </GridContiner>
      </div>
    )
  }
}

export default withStyles(styles)(trackWindowScroll(ArticleList));