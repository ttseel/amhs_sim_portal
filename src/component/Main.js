import React from "react";
import { Route, Switch } from "react-router-dom";
import Sendfab from "./sendanalysis/Sendfab";
import ContStep from "./sendanalysis/ContStep";
import LotSize from "./sendanalysis/LotSize";
import ValidateLotTrace from "./sendanalysis/ValidateLotTrace";
import Arrange from "./masterdata/Arrange";
import Eqp from "./masterdata/Eqp";
import Step from "./masterdata/Step";
import WaferInputs from "./masterdata/WaferInputs";
import EmptyPage from "./EmptyPage";
import "./Main.css";

const Main = () => {
  return (
    <div className="main">
      <Switch>
        <Route exact path="/">
          <h3>Main</h3>
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
    </div>
  );
};

export default Main;
