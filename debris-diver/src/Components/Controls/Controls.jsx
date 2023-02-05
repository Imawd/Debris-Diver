import React from 'react'
import './Controls.css'
import WASD from '../../Images/WASD.svg'
import F from '../../Images/F.svg'

function Controls() {
  return (
    <div>
        <div className='Intro-Description'>
          <p className='Description-Border'>In this game, you’ll be piloting a spaceship in Earth’s orbit. Your goal is to pick up as much space debris as you can while learning all about real debris in space!</p>
          <p className='Description-Border'>Each object in space is interactable and is based on the location of real debris that you can learn more about when you interact with it.</p>
        </div>
        <div className='Controls'>
            <h3>Controls</h3>
            <div className='Controls-Styling'>
                <img src={WASD} alt="" id="WASD"/>
                <p>Use <b>W A S D</b> keys to control your ship</p>
            </div>
            <div className='Controls-Styling'>
                <div className='F-Wrapper'>
                    <img src={F} alt="" id="F"/>
                </div>
                <p>Use the <b>F</b> key to interact with debris</p>
            </div>
        </div>
        <div className='Intro-Button'>
            <button className='Button-Play'>Launch</button>
        </div>
    </div>
  )
}

export default Controls