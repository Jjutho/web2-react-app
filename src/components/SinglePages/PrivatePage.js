import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../styles/PrivatePage.scss';

const mapStateToProps = state => {
  return state;
}

class PrivatePage extends Component {
  render() {

    const user = this.props.user.userName;

    return (
      <div className="page-content" id="PrivatePage">

        <h1 className="heading-over-copy">Welcome <span className="keyphrase">{user}</span>!</h1>
        <p className="introduction">Thank you for taking part in this journey. On the left you can navigate to the forum and look through all available topics. On your personal dashboard you will always have a short overview about the topic. <span className="keyphrase">Enjoy!</span></p>
        <div className="divider"></div>
        <div className="info-section">
          <h2 className="heading-over-copy">What are <span className="keyphrase">sustainable websites</span>?</h2>
          <p>Sustainable websites are websites that cause <span className="keyphrase">less engergy consumption</span>. There are multiple techniques that can help to reduce the impact of your work on the environment. </p>
          <p>They range from <span className="keyphrase">conscious design decisions</span> to <span className="keyphrase">technical implementations</span>. This short list should give you an understanding on how each point makes a difference, for more information please check out the forum threads!</p>
          <div className="listing">
            <div className="design-content topic-container">
              <h3>Design & content</h3>
              <ul>
                <li>
                  <div>
                    <h4>SEO</h4>
                    <p>By improving the findability of your website and your product, potential users spend less time on search engines which results in less energy spent. Besides putting in the correct meta information this also means using the right html tags to make it easier for search engines to correctly index your pages.</p>
                  </div>
                </li>
                <li>
                  <div>
                    <h4>Copy writing</h4>
                    <p>Put only necessary information on your pages so users don't need to search through walls of text to find what they are looking for. This in turn results in less time spent on the internet and less energy spent.</p>
                  </div>
                </li>
                <li>
                  <div>
                    <h4>User Experience (UX)</h4>
                    <p>As with the previous two points, by making websites less convoluted and easier to navigate the resources being spent are reduced.</p>
                  </div>
                </li>
                <li>
                  <div>
                    <h4>Reduce Images & Video</h4>
                    <p>Before adding images and videos to your website, ask yourself if they really add value to the page. And if they are needed see if you can reduce the size of them and still get the information across. Every MB downloaded adds to the load and in turn to the energy consumption. Less can be more!</p>
                  </div>
                </li>
                <li>
                  <div>
                    <h4>Choose fonts carefully</h4>
                    <p>Loaded fonts are one of the biggest factors in load bloating! Try to use system fonts in your design or at least use less variations.</p>
                  </div>
                </li>
                <li>
                  <div>
                    <h4>Design in dark mode!</h4>
                    <p>With the advent of OLED screens that light up each pixel individually, using darker less vibrant colors reduces the energy consumption on every end-device.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="development-content topic-container">
              <h3>Development</h3>
              <ul>
                <li>
                  <div>
                    <h4>Write clean code</h4>
                    <p>Less lines of code = less weight, simple right? This also applies to code that you borrow, like existing frameworks and third-party plugins.</p>
                  </div>
                </li>
                <li>
                  <div>
                    <h4>Optimise images & fonts</h4>
                    <p>Don't upload unnecessary large images and scale them down with CSS, instead compress them and use either JPEG or convert them to the more modern and lightweight WebP format. For fonts try to use only WOFF and WOFF2 formats since they boast higher compression than the other formats (TTF, OFT and SVG).</p>
                  </div>
                </li>
                <li>
                  <div>
                    <h4>Use accelerated mobile pages (AMP)</h4>
                    <p>More and more content each year is consumed through mobile devices and AMP is a good way to filter out unnecessary code and file weight specifically for mobile pages. It's fair to say though that if your original website is already optimised it won't bring that much.</p>
                  </div>
                </li>
                <li>
                  <div>
                    <h4>Build static web pages</h4>
                    <p>CMS powered websites use a lot of data and energy by sending queries to their databases. If possible try to build some pages that don't need to be dynamic with static files.</p>
                  </div>
                </li>
                <li>
                  <div>
                    <h4>Use server caching</h4>
                    <p>Another way to decrease the load of dynamic pages is to use server caching which preloads static versions of your dynamic pages and delivers those which can greatly reduce server energy consumption.</p>
                  </div>
                </li>
                <li>
                  <div>
                    <h4>Use a CDN</h4>
                    <p>If your audience is more international, simply choosing a local data centre is not enough but with a content delivery network larger files will be delivered from data centers near your users.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PrivatePage);