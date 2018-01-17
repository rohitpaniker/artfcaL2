# Artifacia Frontend UI - Level 2

**This repo contains the the second level task of a little complex web application built using React JS and Redux **

## How to

Steps to install and run this application

1. clone the repo: git clone https://github.com/rohitpaniker/artfcaL2.git

2. cd to artfcaL2

3. yarn install

4. Please download a chrome extension and enable it to avoid CORS error when the app uses Google Trend API
url: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en

5. yarn start

## Default Credentials

## Username: admin
## Password: admin@123

## To use the widget independently in any other projects:

1. Copy everything from within components directory

2. Paste in your src folder (you may create components directory but you may do as you please)

3. Wherever you want to import the Flag with Analytics UI, just do:  

import GeoTrendWidget from './components/GeoTrendWidget'

4. Declare the component within any div like: <GeoTrendWidget showParentHeader='disabled'/>

5. If you want to control show/hide of your header in your page, configure callback in the component like:

## <GeoTrendWidget showParentHeader={this.showParentHeader}/>

Write the callback function to handle the events you want to control:

showParentHeader = (value) => {
  console.log(value)
  this.setState({ renderHeader: value })
}
