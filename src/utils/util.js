import React from "react";
import {Redirect} from "react-router-dom";
import leagueStore from "../league/leagueStore";
import {REDIRECT} from "../league/leagueActions";


export function shouldRedirect(league, skipLoginCheck) {
  if (!league) {
    league = leagueStore.getState();
  }
  if (!skipLoginCheck && !isLoggedIn(league)) {
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

export function obfuscatePhone(phone) {
  return phone && phone.length > 4 ? '*' + phone.substring(phone.length - 4) : '';
}

export function obfuscateEmail(email) {
  let obfuscatedEmail = '';
  if (email && email.indexOf('@') !== -1) {
    obfuscatedEmail = email.substring(0,1);
    obfuscatedEmail += '*';
    const indexOfAt = email.indexOf('@')
    obfuscatedEmail += email.substring(indexOfAt);
  }
  return obfuscatedEmail;
}
