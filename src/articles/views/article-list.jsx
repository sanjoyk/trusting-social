import React, { PureComponent } from 'react';
import GridContiner from "@material-ui/core/Grid";
// import GridItem from "@material-ui/core/GridItem";
import debounce from "lodash.debounce";
import GridItem from '../../app-components/grid-item';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    // overflow: 'hidden',
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

  getImageUrl = (multimedia) => {
    if (multimedia && multimedia[0]) {
      return `https://www.nytimes.com/${multimedia[0].url}`;
    }
    debugger
    return "https://www.nytimes.com/images/2018/11/04/travel/04Hours-Singapore5/merlin_143821452_ed4b5ea3-b52c-496a-9a16-3c225ef111c0-articleLarge.jpg";

  }
  render() {
    const { articlesByIds, classes } = this.props;
    return (
      <div id="artical-list-container">
        <GridContiner className={classes.root}  >
          {
            Object.entries(articlesByIds).map(([key, { snippet, multimedia, pub_date: pubDate, source }]) => {
              return (
                <GridItem style={{ display: "inline-block", padding: "10px", boxSizing: "border-box", border: "1px solid grey" }} xs={4} sm={4} md={4} key={key}>
                  <div style={{ position: "relative", mixBlendMode: "difference", fontWeight: "bold" }}>
                    <img style={{ width: "100%" }}
                      src={this.getImageUrl(multimedia)}
                      alt=""
                    />
                    <p style={{
                      position: "absolute",
                      bottom: "0px",
                      fontSize: "20px",
                      marginBottom: "10px"
                    }}>{source}</p>
                  </div>

                  <h2>{snippet}</h2>
                  <p> {pubDate}</p>

                </GridItem>
              )
            }

            )
          }
        </GridContiner>
      </div>

    )
  }
}

export default withStyles(styles)(ArticleList);;