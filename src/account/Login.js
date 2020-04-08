import React from 'react';
import './Login.scss';
import {AccountAPI} from './API';

export class Login extends React.Component {
  accountSvc = new AccountAPI();

  constructor(props) {
    super(props);
    this.state = { username: '', password: '', bSubmitted: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>username:</div>
        <input className="username" name="username" value={this.state.username} onChange={this.handleChange} />
        <div>password</div>
        <input className="password" name="password" value={this.state.password} onChange={this.handleChange} />
        <button type="submit" disabled={this.state.bSubmitted}>Submit</button>
      </form>
    )
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({bSubmitted: true});
    this.accountSvc.login(this.state.username, this.state.password).then(tokenId => {
      this.accountSvc.setAccessTokenId(tokenId);
      // this.setState({bSubmitted: false});
      this.props.history.push('/');
    });
    // setTimeout(()=>{
    // },1000);
  }
}