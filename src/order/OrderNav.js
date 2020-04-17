import React from 'react';
import { Link } from 'react-router-dom';




function OrderNav() {
    return (
<div className="navButtons">
<span className="summaryButton">
  <Link to="/order/summary">
    <button className="button" type="button">
      详情
</button>
  </Link></span>

<span className="summaryButton">
  <Link to="/order/summary">
    <button className="button" type="button">
      汇总
</button>
  </Link></span>

<span className="summaryButton">
  <Link to="/order/summary">
    <button className="button" type="button">
      分类
</button>
  </Link></span>

<span className="summaryButton">
  <Link to="/order/summary">
    <button className="button" type="button">
      地图
</button>
  </Link></span>

</div>)}

export default OrderNav;