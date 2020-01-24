import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/NewsLeague.css';

class NewsLeague extends React.Component {
  componentDidMount() {
    this.props.scrapNews(this.props.idLeague);
  }

  UNSAFE_componentWillMount(prevProps) {
    if (prevProps !== this.props) {
      this.props.scrapNews(this.props.idLeague);
    }
  }

  renderNews = () => {
    if (this.props.articles !== undefined) {
      return this.props.articles.map(article => {
        return (
          <div className="col m6 s12">
            <a
              key={article.title}
              href={'https://www.nytimes.com/' + article.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="card-product hoverable">
                <img src={article.image} />
                <div className="card-product-infos">
                  <h2>{article.title}</h2>
                  <p>{article.text}</p>
                </div>
              </div>
            </a>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <div>
        <h3>News</h3>
        <div className="row">
          {this.props.articles ? this.renderNews() : ''}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.article.articles
  };
}
export default connect(mapStateToProps, actions)(NewsLeague);
