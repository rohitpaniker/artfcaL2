import React, { Component } from 'react';
import GeoTrendWidget from './../components/GeoTrendWidget'

export default class Landing extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div className="rootLandingPage">
        this is Landing page!
        <br/>
        <br/>
        <GeoTrendWidget/>
      </div>
    );
  }
}