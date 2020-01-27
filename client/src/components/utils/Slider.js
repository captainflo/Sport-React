import React from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import '../css/Slider.css';

class Slider extends React.Component {
  componentDidMount() {
    var elems = document.querySelectorAll('.slider');
    M.Slider.init(elems, { interval: 2000, indicators: false });
  }

  render() {
    return (
      <div className="slider">
        <ul className="slides">
          {/* NFL */}
          <li>
            <img
              src={process.env.PUBLIC_URL + '/images/bannerNFL.jpg'}
              alt="banner"
            />
            <div className="caption left-align">
              <img
                className="banner-logo-nfl"
                src={process.env.PUBLIC_URL + '/images/nfl.png'}
                alt="banner"
              />
              <h5 className="light grey-text text-lighten-3">
                All Teams in America!
              </h5>
            </div>
          </li>
          <li>
            {/* NBA */}
            <img
              src={process.env.PUBLIC_URL + '/images/bannerNBA.jpg'}
              alt="banner"
            />
            <div className="caption center-align">
              <h3>
                <img
                  className="banner-logo"
                  src={process.env.PUBLIC_URL + '/images/NBA.png'}
                  alt="banner"
                />
              </h3>
              <h5 className="light grey-text text-lighten-3">
                All Teams in America!
              </h5>
            </div>
          </li>
          {/* MLB */}
          <li>
            <img
              src={process.env.PUBLIC_URL + '/images/bannerMLB.jpg'}
              alt="banner"
            />
            <div className="caption left-align">
              <img
                className="banner-logo"
                src={process.env.PUBLIC_URL + '/images/mlb.png'}
                alt="banner"
              />
              <h5 className="light grey-text text-lighten-3">
                All Teams in America!
              </h5>
            </div>
          </li>
          {/* NHL */}
          <li>
            <img
              src={process.env.PUBLIC_URL + '/images/bannerNHL.jpg'}
              alt="banner"
            />
            <div className="caption center-align box-text-banner">
              <img
                className="banner-logo"
                src={process.env.PUBLIC_URL + '/images/nhl.png'}
                alt="banner"
              />
              <h5 className="light grey-text text-lighten-3">
                All Teams in America!
              </h5>
            </div>
          </li>
          {/* Soccer */}
          <li>
            <img
              src={process.env.PUBLIC_URL + '/images/BannerSoccer.jpg'}
              alt="banner"
            />
            <div className="caption bottom-align">
              <img
                className="banner-logo"
                src={process.env.PUBLIC_URL + '/images/foot.png'}
                alt="banner"
              />
              <h5 className="light grey-text text-lighten-3">
                All the best league around the world!
              </h5>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Slider;
