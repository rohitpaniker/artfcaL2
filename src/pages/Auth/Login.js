import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      uname: 'admin',
      pwd: 'admin@123',
      uValue: '',
      pValue: '',
      threshold: 300,
      cx: 1,
      displayState: 'block'
    }
    // console.log(this.props.count)
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.ticktock = this.ticktock.bind(this)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  ticktock = () => {
    // console.log('ticktock initialized')
    this.setState({
      cx: this.state.cx+1
    }, () => {
      if(this.state.cx >= this.state.threshold) {
        alert('5 minutes freeze over, Now you can try loging in again!!')
        this.props.dispatch({ type: 'RESET_TRIES' })
        this.setState({ displayState: 'block' })
        clearInterval(this.interval)
      }
    })
  }

  handleLogin = () => {

    if(this.props.count >= 3){
      this.setState({ displayState: 'none' })
      cookies.set('INVALID_TRIES', 3, { path: '/' });
      // console.log('3 or more failed tries reached: ', this.props.count)
      this.interval = setInterval(this.ticktock, 1000);
    }

    if(this.state.uValue === this.state.uname && this.state.pValue === this.state.pwd){
      this.props.dispatch({ type: 'RESET_TRIES' })
      cookies.set('auth', true, { path: '/' });
      this.props.history.push('/')
    }

    this.props.dispatch({ type: 'INC_TRIES' })
  }

  handleSignup = () => {
    // console.log('Signup clicked!')
  }

  handleUsername = (e) => {
    this.setState({
      uValue: e.target.value
    })
  }

  componentDidMount() {
    // console.log(cookies.get('INVALID_TRIES'))
    if(cookies.get('INVALID_TRIES')) {
      clearInterval(this.interval)
      this.setState({ displayState: 'none' })
      this.interval = setInterval(this.ticktock, 1000);
    }
  }

  handlePassword = (e) => {
    this.setState({
      pValue: e.target.value
    })
  }

  render() {
    const { displayState } = this.state
    return(
      <div className="rootLoginPage">
        <div class="login">
         <div class="login-triangle"></div>
         <h2 class="login-header">Log in</h2>
         <form class="login-container">
           <p><input type="text" placeholder="Username" value={this.state.uValue} onChange={this.handleUsername}/></p>
           <p><input type="password" placeholder="Password" value={this.state.pValue} onChange={this.handlePassword}/></p>
           <div className="loginSignupButtonDiv" style={{ display: 'flex', flexDirection: 'row' }}>
             <input type="button" value="Log in" onClick={this.handleLogin} style={{ marginRight:2, display: displayState }}/>
             <input type="button" value="Signup" onClick={this.handleSignup}/>
           </div>
           <div className="err" style={{ display: displayState === 'block' ? 'none' : 'block', color: 'red'}}>
             Too many invalide tries, Please wait for 5 minutes and then retry
           </div>
         </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.count
  }
}

export default connect(mapStateToProps)(Login)
