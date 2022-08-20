import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class Newsbox extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pagesize: 10,
  };
  static propTypes = {
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    pagesize: PropTypes.number.isRequired,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      totalresults: 0,
      loading: false,
      page: 1,
    };
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
 

  async componentDidMount() {
    this.setState({ page: this.state.page + 1 });
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&pagesize=${this.props.pagesize}&category=${this.props.category}&apikey=${this.props.api}&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(50)
    let parsedata = await data.json();
    
    this.setState({
      articles: parsedata.articles,
      totalresults: parsedata.totalResults,loading: false 
    });
    let catg = this.capitalizeFirstLetter(this.props.category);
    document.title = `NewsMonkey - ${catg}`;
    this.props.setProgress(100)
   
  }

  // toggleNext = () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updatenews();
  // };
  // togglePrevious = () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updatenews();
  // };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&pagesize=${this.props.pagesize}&category=${this.props.category}&apikey=${this.props.api}&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({ loading: false });
    this.setState({
      articles: this.state.articles.concat(parsedata.articles),
      totalresults: parsedata.totalResults,
    });
  };

  render() {
    return (
      <>
        <div className="container">
          <h2 className="text-center my-3">
            Daily-News (Top {this.capitalizeFirstLetter(this.props.category)}{" "}
            headlines)
          </h2>
        </div>
        <div className="container ">
          <div className="text-center">
            {this.state.loading && <Spinner />}
          </div>

          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div key={element.url} className="col-md-4">
                  <Newsitem
                    key={element.url}
                    newsurl={element.url}
                    imageurl={
                      element.urlToImage === null
                        ? "https://i0.wp.com/coolhunting.com/wp-content/uploads/2022/06/Listen-Up-464.jpg?fit=1200%2C750&ssl=1"
                        : element.urlToImage
                    }
                    title={element.title}
                    description={
                      element.description === null || element.description === ""
                        ? "..."
                        : element.description
                    }
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
            <div className="container" style= {{textAlign:'center'}}>
              <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={!(this.state.articles.length === this.state.totalresults)}
                loader={<Spinner />}
              ></InfiniteScroll>
            </div>
          </div>

          {/* <div className="d-flex justify-content-between my-5">
            <button
              type="button"
              disabled={this.state.page <= 1}
              onClick={this.togglePrevious}
              className="btn btn-primary"
            >
              &laquo;Previous
            </button>
            <button
              type="button"
              onClick={this.toggleNext}
              disabled={
                !(
                  this.props.pagesize * this.state.page -
                    this.state.totalresults <=
                  0
                )
              }
              className="btn btn-primary"
            >
              Next&raquo;
            </button>
          </div> */}
        </div>
      </>
    );
  }
}
