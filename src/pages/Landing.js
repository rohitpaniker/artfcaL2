import React, { Component } from 'react';
import GeoTrendWidget from './../components/GeoTrendWidget'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Landing extends Component {
  constructor(){
    super();
    this.state = { renderHeader: true }
  }
  logout() {
    cookies.remove('auth', true, { path: '/' });
    window.location.reload();
  }
  componentWillMount() {
    if(!cookies.get('auth')){
      this.props.history.push('/login')
    }
  }

  showParentHeader = (value) => {
    console.log(value)
    this.setState({ renderHeader: value })
  }

  render() {
    const { renderHeader } = this.state
    return(
      <div className="rootLandingPage">
        <div className="landingHeader" style={{  display: renderHeader ? 'flex' : 'none'  }}>
          <div className="button raised blue"
            style={{  marginRight: 20, display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
            onClick={this.logout}>
            <div className="center">LOGOUT</div>
              <paper-ripple fit></paper-ripple>
            </div>
          </div>
        <GeoTrendWidget
          showParentHeader={this.showParentHeader}
          />
      </div>
    );
  }
}
