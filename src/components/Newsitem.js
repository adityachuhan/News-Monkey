import React, { Component } from "react";

export default class Newsitem extends Component {
  render() {
    let {title,description,imageurl,newsurl,author,date} = this.props;
    return (
      <div>
        <div className="card my-4">
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
             {description}
            </p>
            <p className="card-text"><small className="text-muted">By {author===''||author=== null? "Unknown": author } on {new Date(date).toGMTString().slice(0,26)}</small></p>
            <a target ='_blank' rel="noreferrer" href={newsurl} className="btn btn-sm btn-primary">
              Readmore
            </a>
          </div>
        </div>
      </div>
    );
  }
}
