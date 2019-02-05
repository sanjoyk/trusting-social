import React, { PureComponent } from 'react';
import { getFormattedDate } from "../../utils/util.js";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  articleContainer: {
    padding: "10px",
    marginBottom: "15px",
    "&:hover": {
      boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
      borderRadius: "5px"
    }
  },
  placeholderImage: {
    width: "100%"
  },

  publishDate: {
    textTransform: "uppercase",
    color: "#47c8ec",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "1.17",
  },
  snippet: {
    paddingTop: "10px",
    fontFamily: "Noto Serif,serif",
    fontSize: "20px",
    fontWeight: "700",
    lineHeight: "1.4",
    textAlign: "left",
    color: "#010001",
  }
}

class ArticleDetails extends PureComponent {
  getImageUrl = (multimedia) => {
    if (multimedia && multimedia[0]) {
      return `https://www.nytimes.com/${multimedia[0].url}`;
    }
    return "https://www.nytimes.com/images/2018/11/04/travel/04Hours-Singapore5/merlin_143821452_ed4b5ea3-b52c-496a-9a16-3c225ef111c0-articleLarge.jpg";
  }

  render() {
    const { articleDetails, classes, scrollPosition } = this.props;
    if (Object.keys(articleDetails).length === 0) {
      return "Loader...";
    }
    const { snippet, multimedia, pub_date: pubDate, source } = articleDetails;
    return (
      <div className={classes.articleContainer}>
        <LazyLoadImage
          src={this.getImageUrl(multimedia)}
          effect="blur"
          alt=""
          width="100%"
          scrollPosition={scrollPosition}
          delayTime={10000}
          threshold={-200}
          placeholder={<img className={classes.placeholderImage} src="https://www.nytimes.com/images/2018/11/04/travel/04Hours-Singapore5/merlin_143821452_ed4b5ea3-b52c-496a-9a16-3c225ef111c0-videoThumb.jpg" alt="" />}
        />
        <p className={classes.publishDate}>
          {`${source} / ${getFormattedDate(pubDate)}`}
        </p>

        <h2 className={classes.snippet}>
          {snippet}
        </h2>
      </div>
    )
  }
}

export default withStyles(styles)(ArticleDetails);