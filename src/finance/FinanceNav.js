import React from "react";
import { Link } from "react-router-dom";

function FinanceNav() {
  return (
    <div className="nav-btn-area">
      <span className="btn-wrapper">
        <Link to="/finance">
          <div className="btn" type="button">
            历史
          </div>
        </Link>
      </span>

      <span className="btn-wrapper">
        <Link to="/finance/exception">
          <div className="btn" type="button">
            异常
          </div>
        </Link>
      </span>
    </div>
  );
}

export default FinanceNav;
