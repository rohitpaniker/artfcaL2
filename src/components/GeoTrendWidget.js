import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Analytics from './Analytics'
// import Cookie from 'universal-cookie'
import './widget.css';

// const cookies = new Cookie()

class GeoTrendWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      renderAnalytics: false,
      countryId: '',
      countries: ['India', 'America', 'Canada'],
      idNames: ['indCountryName', 'usCountryName', 'cndCountryName'],
      spanIdNames: ['indCountryName', 'usCountryName', 'cndCountryName'],
      classNames: ['indianFlag', 'americanFlag', 'canadianFlag'],
      spanClassNames: ['indCountryName', 'usCountryName', 'cndCountryName'],
      flagUri: [
        'http://flaglane.com/download/indian-flag/indian-flag-graphic.png',
        'https://us.123rf.com/450wm/stillfx/stillfx1412/stillfx141200165/34460771-closeup-of-american-flag-stars-and-stripes.jpg?ver=6',
        'http://www.uk-da.com/cdn/450x300-canadian-flag-8-by-merlin2525-9991314.jpeg'
      ]
    }
  }

  // componentWillMount() {
  //   if(!cookies.get('auth')){
  //     this.props.history.push('/login')
  //   }
  // }

  handleRouteAnalytics = (country) => {
    //this.props.history.push('/'+country)
    if(this.props.showParentHeader !== 'disabled')
      this.props.showParentHeader(false);
    this.setState({
      renderAnalytics: true,
      countryId: country
    })
  }

  handleFlagEvent = (ElementId, EventName) => {
    switch(ElementId) {
      case 'indianFlag':
        // console.log(ElementId, EventName);
        if(EventName === 'mouseover') {
          document.getElementById('indCountryName').style["opacity"] = 1
          return
        }
        document.getElementById('indCountryName').style["opacity"] = 0
        break;
      case 'americanFlag':
        if(EventName === 'mouseover') {
          document.getElementById('usCountryName').style["opacity"] = 1
          return
        }
        document.getElementById('usCountryName').style["opacity"] = 0
        // console.log(ElementId, EventName);
        break;
      case 'canadianFlag':
        if(EventName === 'mouseover') {
          document.getElementById('cndCountryName').style["opacity"] = 1
          return
        }
        document.getElementById('cndCountryName').style["opacity"] = 0
        // console.log(ElementId, EventName);
        break
      default:
        break;
    }
  }

  closeLytics = (boolVal) => {
    console.log(boolVal)
    if(boolVal) {
      this.setState({
        renderAnalytics: false
      })
      if(this.props.showParentHeader !== 'disabled')
        this.props.showParentHeader(true);
      return
    }
    if(this.props.showParentHeader !== 'disabled')
      this.props.showParentHeader(false);
  }

  render() {
    const { renderAnalytics, countryId, countries, spanIdNames, classNames, spanClassNames, flagUri  } = this.state;

    return(
      <div className="rootGeoTrendWidgetComponent">
        {renderAnalytics
          ? <Analytics
             countryId={countryId}
             closeLytics={this.closeLytics}
           />
          : <div className="container">
              {classNames.map((data, index) => {
                if(data !== 'canadianFlag') {
                  return(
                    <div key={index} className={data} onClick={this.handleRouteAnalytics.bind(null, data)} onMouseOver={this.handleFlagEvent.bind(null, data, 'mouseover')} onMouseLeave={this.handleFlagEvent.bind(null, data, 'mouseleave')}>
                      <img src={flagUri[index]} width="225" height="150" alt=""/>
                      <span id={spanIdNames[index]} className={spanClassNames[index]}> {countries[index]} </span>
                    </div>
                  );
                } else {
                  return(
                    <div key={index} className="canadianFlag" onClick={this.handleRouteAnalytics.bind(null, 'canadianFlag')} onMouseOver={this.handleFlagEvent.bind(null, 'canadianFlag', 'mouseover')} onMouseLeave={this.handleFlagEvent.bind(null, 'canadianFlag', 'mouseleave')}>
                      <div className="flipper">
                        <div className="front">
                          <img src="http://www.uk-da.com/cdn/450x300-canadian-flag-8-by-merlin2525-9991314.jpeg" width="225" height="150" alt=""/>
                        </div>
                        <div className="back">
                          <span id='cndCountryName'> Canada </span>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          }
        </div>
      );
    }
  }

export default withRouter(GeoTrendWidget);
