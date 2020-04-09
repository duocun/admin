import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';
export const Menu = {
  Order: 'O',
  Area: 'A',
}

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    // this.select = this.select.bind(this);
  }

  render() {
    const selected = this.props.selected;
    return (
      <div className="nav-list">
        <div className="row nav-menus">
          <Link style={{ textDecoration: 'none' }} to={{ pathname: "/order" }}>
            <div className={selected === Menu.Order ? 'menu active' : 'menu'}>
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path fill={selected === Menu.Order ? '#4285F3' : '#333'} d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </div>
              <div className="icon-text">订单</div>
            </div>
          </Link>

          <Link style={{ textDecoration: 'none' }} to={{ pathname: "/area" }}>
            <div className={selected === Menu.Area ? 'menu active' : 'menu'} >
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                  <path fill='none' d="M0 0h24v24H0V0z" />
                  <path fill={selected === Menu.Area ? '#4285F3' : '#333'} d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                </svg>
              </div>
              <div className="icon-text">区域</div>
            </div>
          </Link>

          <div className={selected === Menu.Finance ? 'menu active' : 'menu'}>
            <Link style={{ textDecoration: 'none' }} to={{ pathname: "/finance" }}>
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path fill={selected === Menu.Finance ? '#4285F3' : '#333'} d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z" />
                </svg>
              </div>
              <div className="icon-text">财务</div>
            </Link>
          </div>

          <div className={selected === Menu.Account ? 'menu active' : 'menu'}>
            <Link style={{ textDecoration: 'none' }} to={{ pathname: "/account" }}>
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path fill={selected === Menu.Account ? '#4285F3' : '#333'} d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="icon-text">帐号</div>
            </Link>
          </div>
        </div>
      </div>
    );
  }


  // select(self, menu){
  //   switch(menu){
  //     case Menu.Order:
  //       self.props.history.push('/order');
  //     break;
  //     case Menu.Account:
  //     self.props.history.push('/account');
  //     break;
  //     case Menu.Finance:
  //     self.props.history.push('/finance');
  //     break;
  //     case Menu.Area:
  //       self.props.history.push('/area');
  //     break;
  //   }
  // }
}