import React from "react";
import './league.css'

const Footer = (props) => {
  return (
    <div className={'shim'}>
      <p>V{props.league.version}</p>
    </div>
  )
}

export default Footer