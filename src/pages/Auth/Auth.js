import React, { Component } from 'react';

class Login extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div className="rootLoginPage">
        this is login page!
      </div>
    );
  }
}

class Signup extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div className="rootSignupPage">
        this is signup page!
      </div>
    );
  }
}


module.export = {
  Login,
  Signup
}
