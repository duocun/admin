import React from 'react';
import './Login.scss';
import { AccountAPI } from './API';

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
      <form className="login-form" onSubmit={this.handleSubmit}>
        <div className="form-wrapper">
          <div className="field">
            <div className="label-s">用户名:</div>
            <div className="input-wapper">
              <input className="username" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
            </div>
          </div>
          <div className="field">
            <div className="label-s">密码:</div>
            <div className="input-wapper">
              <input className="password" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            </div>
          </div>
          <button className="btn" type="submit" disabled={this.state.bSubmitted}>登陆</button>
        </div>
      </form>
    )
  }
  componentDidMount() {
    this.accountSvc.getCurrentAccount().then((account) => {
      if (account) {
        this.props.history.push('/order/detail');
      }
    });
  }
  
  handleChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ bSubmitted: true });
    this.accountSvc.login(this.state.username, this.state.password).then(tokenId => {
      this.accountSvc.setAccessTokenId(tokenId);
      // this.setState({bSubmitted: false});
      this.props.history.push('/order/detail');
    });
    // setTimeout(()=>{
    // },1000);
  }
}