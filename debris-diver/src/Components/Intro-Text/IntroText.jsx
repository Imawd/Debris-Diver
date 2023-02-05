import React from 'react'
import './IntroText.css'

function IntroText() {
  return (
    <div>
      <div className='Intro-Description'>
          <p className='Description-Border'><b>Space Debris</b>, also known as space junk or orbital debris, refers to the man-made objects, such as old satellites, rocket stages, and fragments from collisions, that orbit the Earth and pose a potential hazard to active satellites, spacecraft, and astronauts.</p>
          <p className='Description-Border'>These pieces of debris can travel at high speeds and can damage or completely destroy operational spacecraft, creating even more debris in the process.</p>
          <p className='Description-Border'>The proliferation of space debris is a growing concern for the <b>future of space exploration</b> and it is important to educate the public on the issue.</p>
      </div>
      <div className='Intro-Button'>
          <button className='Button-Play'>Play</button>
      </div>
    </div>
  )
}

export default IntroText