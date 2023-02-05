import React from 'react'
import hackSC from '../../Images/HackSC.svg'
import './Logo.css'

function Logo() {
  return (
    <div>
        <div className='Logo'>
            <h1>Debris Diver</h1>
            <div className='HackSC-Logo'>
                <h2>A</h2>
                <img src={hackSC} alt="HackSC"/>
                <h2>Project</h2>
            </div>
        </div>
    </div>
  )
}

export default Logo