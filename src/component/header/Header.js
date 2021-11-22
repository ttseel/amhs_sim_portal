import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
const Header = () => {
  return (
    <header className="header">
      <div className="wrap_header">
        <h1 className="doc-title">
          <Link className="home_img" to="/">
            amhs sim portal
          </Link>
        </h1>
        <nav className="header-nav">
          <ul className="main_menu">
            <li className="main_menu_li">
              <a className="main_menu_a">층/동간 KPI 분석</a>
              <ul className="sub_menu">
                <li>
                  <Link to="/flooranalysis/FromToAnalysis">층내 반송 From-To 분석</Link>
                </li>
                <li>
                  <Link to="/sendanalysis/sendNetwork">층/동간 반송량 Trend</Link>
                </li>
                <li>
                  <Link to="/sendanalysis/contStep">연속 Step</Link>
                </li>
                <li>
                  <Link to="/sendanalysis/lotSize">Lot Size</Link>
                </li>
                <li>
                  <Link to="/sendanalysis/validateTrs">Lot Trace 검증</Link>
                </li>
              </ul>
            </li>
            <li className="main_menu_li">
              <a className="main_menu_a">기준정보 분석</a>
              <ul className="sub_menu">
                <li>
                  <Link to="/masterdata/WaferInputs">투입량</Link>
                </li>
                <li>
                  <Link to="/masterdata/Eqp">EQP</Link>
                </li>
                <li>
                  <Link to="/masterdata/Step">STEP</Link>
                </li>
                <li>
                  <Link to="/masterdata/Arrange">Arrange</Link>
                </li>
              </ul>
            </li>
            <li className="main_menu_li">
              <a className="main_menu_a">Simulation</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
