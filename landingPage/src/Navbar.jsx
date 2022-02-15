import React from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import { ExternalLink } from 'react-external-link';


function Navbar() {
    return (
        <nav className="nav" id="navbar">
        <div className="nav-content">
          <img
            // src={logo}
            className="nav-logo"
            alt="QLeo"
            // onClick={this.scrollToTop}
          />
          <ul className="nav-items">
            <li className="nav-item">About</li>
            <li className="nav-item">Features</li>
            <li className="nav-item">Getting Started</li>
            <li className="nav-item">Meet the Team</li>
          </ul>
        {/* <ExternalLink href="https://github.com/oslabs-beta/QLeo">
            <img src={github} alt="Github"/>
        </ExternalLink>
        <ExternalLink href="https://www.linkedin.com/company/teamqleo">
            <img src={linkedin} alt="LinkedIn"/>
        </ExternalLink>
        <ExternalLink href="https://opensourcelabs.io/">
            <img src={oslabs} alt="OSLABS"/>
        </ExternalLink> */}
        </div>
      </nav>
    )
}

export default Navbar;