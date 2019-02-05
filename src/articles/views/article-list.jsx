import React, { PureComponent } from 'react';
import GridContiner from "@material-ui/core/Grid";
// import GridItem from "@material-ui/core/GridItem";
import debounce from "lodash.debounce";
import GridItem from '../../app-components/grid-item';
import { withStyles } from '@material-ui/core/styles';

import { LazyLoadImage, trackWindowScroll, LazyLoadComponent } from 'react-lazy-load-image-component';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    // overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },

  articleContainer: {
    padding: "10px",
    marginBottom: "15px",
    "&:hover": {
      boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
      borderRadius: "5px"
    }

  }
});


function getFormattedDate(pubData) {
  const dateObj = new Date(pubData);
  var month = new Array(12); month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var datePublished = dateObj.getUTCDate() + ' ' + month[dateObj.getUTCMonth()] + ', ' + dateObj.getUTCFullYear();
  return datePublished;
}


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



  getImageUrl = (multimedia) => {
    if (multimedia && multimedia[0]) {
      return `https://www.nytimes.com/${multimedia[0].url}`;
    }
    return "https://www.nytimes.com/images/2018/11/04/travel/04Hours-Singapore5/merlin_143821452_ed4b5ea3-b52c-496a-9a16-3c225ef111c0-articleLarge.jpg";
  }

  render() {
    const { articlesByIds, classes, scrollPosition } = this.props;
    return (
      <div id="artical-list-container">
        <GridContiner className={classes.root}  >
          {
            Object.entries(articlesByIds).map(([key, { snippet, multimedia, pub_date: pubDate, source }]) => {
              return (
                <LazyLoadComponent key={key} >
                  <GridItem onClick={() => { alert("clicked") }} style={{ display: "inline-block", boxSizing: "border-box", cursor: "pointer" }} xs={4} sm={4} md={4}>
                    <div className={classes.articleContainer}>
                      <LazyLoadImage
                        src={this.getImageUrl(multimedia)}
                        effect="blur"
                        alt=""
                        width="100%"
                        scrollPosition={scrollPosition}
                        beforeLoad={() => { console.log("laoding before") }}
                        afterLoad={() => console.log("After load")}
                        delayTime={10000}
                        threshold={-200}
                        placeholder={<img style={{ width: "100%" }} src="https://www.nytimes.com/images/2018/11/04/travel/04Hours-Singapore5/merlin_143821452_ed4b5ea3-b52c-496a-9a16-3c225ef111c0-videoThumb.jpg" alt="" />}
                      />
                      <p style={{
                        textTransform: "uppercase",
                        color: "#47c8ec",
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "1.17",
                      }}>
                        {`${source} / ${getFormattedDate(pubDate)}`}
                      </p>

                      <h2 style={{
                        paddingTop: "10px",
                        fontFamily: "Noto Serif,serif",
                        fontSize: "20px",
                        fontWeight: "700",
                        lineHeight: "1.4",
                        textAlign: "left",
                        color: "#010001",
                      }}>
                        {snippet}
                      </h2>
                    </div>
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