import React from "react";
import {Redirect} from "react-router-dom";
import leagueStore from "../league/leagueStore";
import {REDIRECT} from "../league/leagueActions";


export function shouldRedirect(league) {
  if (!isLoggedIn(league)) {
    return '/login';
  }
  if (leagueStore.getState().redirectTo) {
    const redirectTo = leagueStore.getState().redirectTo;
    leagueStore.dispatch({type: REDIRECT, to: null})
    return redirectTo;
  }
  return '';
}

export function redirect(to) {
  return (
    <Redirect to={to}/>
  )
}

export function isLoggedIn(league) {
  return league.token !== null && league.token.token !== null;
}

export function shouldShowGame(league) {
  return league.season.data !== null;
}
