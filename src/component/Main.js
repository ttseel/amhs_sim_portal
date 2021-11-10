import React from 'react';
import {Route, Switch} from 'react-router-dom';
import FromToAnalysis from './sendanalysis/flooranalysis/FromToAnalysis';
import Sendfab from './sendanalysis/Sendfab';
import ContStep from './sendanalysis/ContStep';
import LotSize from './sendanalysis/LotSize';
import ValidateLotTrace from './sendanalysis/ValidateLotTrace';
import Arrange from './masterdata/Arrange';
import Eqp from './masterdata/Eqp';
import Step from './masterdata/Step';
import WaferInputs from './masterdata/WaferInputs';
import EmptyPage from './EmptyPage';
import Home from './Home';
import './common/Title.css';

const Main = () => {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/sendanalysis/flooranalysis/FromToAnalysis">
          <FromToAnalysis />
        </Route>
        <Route path="/sendanalysis/sendNetwork">
          <Sendfab />
        </Route>
        <Route path="/sendanalysis/contStep">
          <ContStep />
        </Route>
        <Route path="/sendanalysis/lotSize">
          <LotSize />
        </Route>
        <Route path="/sendanalysis/validateTrs">
          <ValidateLotTrace />
        </Route>
        <Route path="/masterdata/WaferInputs">
          <WaferInputs />
        </Route>
        <Route path="/masterdata/Eqp">
          <Eqp />
        </Route>
        <Route path="/masterdata/Step">
          <Step />
        </Route>
        <Route path="/masterdata/Arrange">
          <Arrange />
        </Route>
        <Route>
          <EmptyPage />
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
