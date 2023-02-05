import React from 'react'
import './ObjectInfo.css'

function ObjectInfo() {
  return (
    <div className='ObjectInfo-Container'>
        <div className='Object-Details'>
            <h1>You Found...</h1>
            <img/>
            <h1 id="Details-Underline">Space Debris!</h1>
        </div>
        <div className='Object-Data'>
            <p><b>Name: </b> THOR ABLESTAR DEB</p>
            <p><b>Type: </b> Debris</p>
            <p><b>Designator: </b>61015EG</p>
            <p><b>Launch Date: </b> 2023-02-02</p>
            <p><b>Mean Motion: </b> 14.528 <i>Revs per day</i></p>
            <p><b>Orbit Period: </b> 99.118 <i>Minutes</i></p>
            <p><b>Inclination: </b> 66.328 <i>Degrees</i></p>
        </div>
        <button className='Close'>X</button>
    </div>
  )
}

export default ObjectInfo