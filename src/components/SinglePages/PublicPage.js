import React, { Component } from 'react';
import LoginButton from '../utils/LoginButton';
import '../../styles/PublicPage.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

class PublicPage extends Component {
  render() {
    return (
      <div className="page-content" id="LandingPage">
        <h1 className="title-public"><span className="keyphrase">EcoNet</span> - for a greener internet</h1>
        <div className="hero-section">
          <div className="text-content">
            <h2 className="heading-over-copy"><span className="keyphrase">Understanding the issue</span></h2>
            <p>The <span className="keyphrase">carbon footprint</span> of the internet can be a bit tricky to understand and some of the solutions might be hard to think of at first.</p> 
            <p>To help create a better understanding of what professionals in the field can do, this forum was created. It doesn't matter if you're a designer or a developer, there are small steps everyone can take to create more <span className="keyphrase">sustainable</span> websites.</p>
            <p>This is a <span className="keyphrase">community</span> of people who are passionate about the internet and want to help others. If you have any questions or comments feel free to ask them!</p>
            <LoginButton />
          </div>
          <div className="svg-content">
            <FontAwesomeIcon className="landing-icon" icon={faBolt} size='10x' color='#D8E9A8'/>
          </div>
        </div>
        
      </div>
    );
  }
}

export default PublicPage;