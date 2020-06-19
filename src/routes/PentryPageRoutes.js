import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Inks from '../components/Inks';
import Pens from '../components/Pens';
import InkedPens from '../components/InkedPens';

const PentryPageRoutes = ({ parentState, path, handlers }) => {
  return (
    <Switch>
      <Route path={`${path}`} exact render={routerProps => {
        return (
          <InkedPens
            inks={parentState.inks}
            pens={parentState.pens}
            inkedPens={parentState.inkedPens}
            {...routerProps} />
        )
      }} />
      <Route path={`${path}/inks`} render={routerProps => {
        return (
          <Inks
            inks={parentState.inks}
            handleSubmit={handlers.handleInkSubmit}
            handleRemove={handlers.handleInkRemove}
            {...routerProps} />
        )
      }} />
      <Route path={`${path}/pens`} render={routerProps => {
        return (
          <Pens
            pens={parentState.pens}
            inks={parentState.inks}
            inkedPens={parentState.inkedPens}
            handleSubmit={handlers.handlePenSubmit}
            handleRemove={handlers.handlePenRemove}
            handleInking={handlers.handlePenInking}
            handleCleaning={handlers.handlePenCleaning}
            {...routerProps} />
        )
      }} />
    </Switch>
  )
}

export default PentryPageRoutes;