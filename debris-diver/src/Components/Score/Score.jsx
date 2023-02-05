import React from 'react'
import './Score.css'

function Score() {
  return (
    <div className='Score-Container'>
        <div className='Score-Style'>
            <p><b>Score: </b></p>
            <p>125</p>
        </div>
        <div className='Score-Style'>
            <p><b>Debris: </b></p>
            <p>5</p>
        </div>
        <div className='Score-Style'>
            <p><b>Time: </b></p>
            <p>2:45</p>
        </div>
    </div>
  )
}

export default Score