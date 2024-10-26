import React from "react";


import SloganStyle from './index.module.css'



export default function Slogan({h2Content, h3Content}) {

    

    return (
        <div className={SloganStyle.slogan}>
            <h2 style={{color:'blueviolet', textAlign:'center'}}> {h2Content}</h2>

            <span style={{ display:'block',textAlign:'center',marginTop:'10px'}}>{h3Content}</span>
            <br />
        </div>
    )

}