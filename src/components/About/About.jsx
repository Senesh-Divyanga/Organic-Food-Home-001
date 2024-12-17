import React from 'react'
import './About.css'
import assets1 from '../../assets1/asets1'

const About = () => {
  return (
    <div className='about-content'>
        <div className="about-header">
            <h1>About Us</h1>
        </div>
        <div className="about-content-column">
            <img src={assets1.aboutImage} alt="" />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repudiandae doloribus nulla reprehenderit voluptate,
                asperiores veniam fugit perspiciatis eum itaque consequuntur
                fugiat veritatis voluptatum accusantium aliquam aspernatur
                voluptatibus ducimus laboriosam illo unde tempora? Expedita
                dicta culpa recusandae laborum repudiandae esse vitae id ad ipsum,
                doloribus labore optio quia neque voluptatum minima quas amet.
                Impedit at quod culpa dolor, hic iusto reiciendis laboriosam illo unde tempora? Expedita
                dicta culpa recusandae laborum repudiandae esse vitae id ad ipsum,
                doloribus labore optio quia neque voluptatum minima quas amet.
                Impedit at quod culpa dolor, hic iusto reiciendis??</p>
        </div>
      
    </div>
  )
}

export default About
