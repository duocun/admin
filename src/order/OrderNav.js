import React from 'react';
import { Link } from 'react-router-dom';




function OrderNav() {
  return (
    <div className="nav-btn-area">
      <span className="btn-wrapper">
        <Link to="/order/summary">
          <div className="btn" type="button">
            详情
          </div>
        </Link></span>

      <span className="btn-wrapper">
        <Link to="/order/summary">
          <div className="btn" type="button">
            汇总
          </div>
        </Link></span>

      <span className="btn-wrapper">
        <Link to="/order/summary">
          <div className="btn" type="button">
            分类
          </div>
        </Link></span>

      <span className="btn-wrapper">
        <Link to="/order/summary">
          <div className="btn" type="button">
            地图
          </div>
        </Link></span>

    </div>)
}

export default OrderNav;