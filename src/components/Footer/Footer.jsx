import React from 'react'
import './Footer.css'
import assets1 from '../../assets1/asets1'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
        <span className='logo'>Organic Foods Lanka.</span>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam fuga voluptate dicta aperiam veniam. Minima voluptatum nihil perferendis asperiores deserunt dignissimos fugiat consequatur ipsa ea aspernatur quas itaque velit eos, atque recusandae accusamus! Facilis sequi.</p>
        <div className="footer-social-icons">
            <img src={assets1.facebookIcon} alt="" />
            <img src={assets1.twitterIcon} alt="" />
            <img src={assets1.linkedinIcon} alt="" />
        </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>Products</li>
                <li>About Us</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+94 763616701</li>
                <li>divyangasenesh@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copy-right">Copyright © 2024 OrganicFoodsLanka.com - All Rights Reserved</p>
    </div>
  )
}

export default Footer
