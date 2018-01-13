import React, { Component } from 'react';
import googleTrends from 'google-trends-api'
import {Pie, Bar, Line} from 'react-chartjs-2';
import randomcolor from 'randomcolor';

export default class Analytics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: 0,
      country: {
        indianFlag: 'IN',
        americanFlag: 'US',
        canadianFlag: 'CA'
      },
      pieData: {
      	labels: [
      		'Red',
      		'Green',
      		'Yellow'
      	],
      	datasets: [{
      		data: [300, 50, 100],
      		backgroundColor: [
      		'#FF6384',
      		'#36A2EB',
      		'#FFCE56'
      		],
      		hoverBackgroundColor: [
      		'#FF6384',
      		'#36A2EB',
      		'#FFCE56'
      		]
      	}]
      },
      barData: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Angular JS',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      },
      lineData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'React JS',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      }
    }
  }

  componentDidMount() {

    googleTrends.interestByRegion({ keyword: ['Startups'], geo: this.state.country[this.props.match.params.countryId], startTime: new Date('2016-01-01'), endTime: new Date('2017-01-01')})
    .then((results) => {
      let tempObj = {}
      let tempLabelArr = []
      let tempDatasetsArr = []
      let tempDataArr = []
      let tempBackgroundColor = []
      let tempHoverBackgroundColor = []
      JSON.parse(results).default.geoMapData.map((data, index) => {
        let tempColor = randomcolor()
        tempLabelArr.push(data.geoName)
        tempDataArr.push(data.value)
        tempBackgroundColor.push(tempColor)
        tempHoverBackgroundColor.push(tempColor)
        if(index === JSON.parse(results).default.geoMapData.length-1){
          tempObj['label'] = 'Startups'
          tempObj['labels'] = tempLabelArr
          tempObj['datasets'] = [{data: tempDataArr, backgroundColor: tempBackgroundColor, hoverBackgroundColor: tempHoverBackgroundColor}]
          this.setState({
            pieData: tempObj,
            loading: this.state.loading+1
          })
        }
      })
    })
    .catch(function(err){
      console.error('Oh no there was an error', err);
    });

    googleTrends.interestByRegion({ keyword: ['Angular JS'], geo: this.state.country[this.props.match.params.countryId], startTime: new Date('2015-01-01'), endTime: new Date('2018-01-01')})
    .then((results) => {
      let tempObj = {}
      let tempLabelArr = []
      let tempDataArr = []
      JSON.parse(results).default.geoMapData.map((data, index) => {
        tempLabelArr.push(data.geoName)
        tempDataArr.push(data.value)
        if(index === JSON.parse(results).default.geoMapData.length-1){
          tempObj['labels'] = tempLabelArr
          tempObj['datasets'] = [{
            label: 'Angular JS',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: tempDataArr
          }]
          this.setState({
            barData: tempObj,
            loading: this.state.loading+1
          })
        }
      })
    })
    .catch(function(err){
      console.error('Oh no there was an error', err);
    });

    googleTrends.interestByRegion({ keyword: ['React JS'], geo: this.state.country[this.props.match.params.countryId], startTime: new Date('2015-01-01'), endTime: new Date('2018-01-01')})
    .then((results) => {
      let tempObj = {}
      let tempLabelArr = []
      let tempDataArr = []
      JSON.parse(results).default.geoMapData.map((data, index) => {
        tempLabelArr.push(data.geoName)
        tempDataArr.push(data.value)
        if(index === JSON.parse(results).default.geoMapData.length-1){
          tempObj['labels'] = tempLabelArr
          tempObj['datasets'] = [{
            label: 'React JS',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: tempDataArr
          }]
          this.setState({
            lineData: tempObj,
            loading: this.state.loading+1
          })
        }
      })
    })
    .catch(function(err){
      console.error('Oh no there was an error', err);
    });
  }

  render() {
    const { country, pieData, barData, lineData, loading } = this.state;
    if(loading !== 3) {
      return (
        <div className="rootAnalyticsInternalComponent">
          <div className="loaderDiv">
            <img src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'/>
          </div>
        </div>
      )
    }
    return(
      <div className="rootAnalyticsInternalComponent">
        <div className="piechart" style={{width: "50%", marginBottom: 40}}>
          <div className="chartCustomLabel">
            <label>Startups in {country[this.props.match.params.countryId] === 'IN' ? 'India' : country[this.props.match.params.countryId] === 'US' ? 'America' : 'Canada'}</label>
          </div>
          <Pie
            data={pieData}
            options={{
              legend: {
                 display: false
               },
            }}/>
        </div>
        <div className="histogram" style={{width: "50%", marginBottom: 40}}>
          <Bar
            data={barData}
            width={100}
            height={50}
            type='horizontalBar'
          />
        </div>
        <div className="linegraph" style={{width: "50%", marginBottom: 40}}>
          <Line data={lineData} />
        </div>
      </div>
    );
  }
}
