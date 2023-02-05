import React from 'react'
import './Intro.css'
import hackSC from '../../Images/HackSC.svg'
import IntroText from '../Intro-Text/IntroText'
import Controls from '../Controls/Controls'

function Intro() {
  return (
    <div className='Intro-Holder'>
        <div className='Title'>
            <h1>Debris Diver</h1>
            <div className='HackSC'>
                <h2>A</h2>
                <img src={hackSC} alt="HackSC"/>
                <h2>Project</h2>
            </div>
        </div>
        <Controls/>
    </div>
  )
}

export default Intro