import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import '../styles/footer.css'; // Assuming the CSS file is in the 'styles' folder.

const Footer = () => {
    return (
        <footer className="footer">
            <section className="contact">
                <div className="companydescription">
                    <div className="logo">
                        <Link to="/">
                            <h1>🌾 Geberew</h1>
                        </Link>
                    </div>
                    <div className="text">
                        <p>We produce a variety of fresh, high-quality products directly from our farm to serve our customers. Our offerings include seasonal fruits, organic vegetables, farm-fresh eggs, and aromatic herbs, all grown with care and sustainability in mind.</p>
                        <p>Bringing the taste of nature to your table.</p>
                    </div>
                </div>

                <div className="company">
                    <h2>Explore</h2>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/About">About</Link></li>
                        <li><Link to="/Contact">Contact</Link></li>
                        <li><Link to="/ProductList">Products</Link></li>
                        <li><Link to="/Blog">Blog</Link></li>
                        <li><Link to="/Events">Event</Link></li>
                    </ul>
                </div>

                <div className="contact-info">
                    <h2>Contact us</h2>
                        <div className="icon">
                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                        </div>
                        <div className="text">
                            <p>Burayu,<br />Ashewa Meda.</p>
                        </div>
                    
                        <div className="icon">
                            <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        </div>
                        <div className="text">
                            <p>geberew@gmail.com</p>
                        </div>

                        <div className="icon">
                            <i className="fa fa-phone" aria-hidden="true"></i>
                        </div>
                        <div className="text">
                            <p>+251-90-989-8990</p>
                        </div>
                </div>

                <div className="media">
                    <h2>Follow us</h2>
                    <div className="media-buttons">
                        <a href="#" className="link">
                            <i className='bx bxl-facebook'></i>
                        </a>
                        <a href="#" className="link">
                            <i className='bx bxl-instagram'></i>
                        </a>
                        <a href="#" className="link">
                            <i className='bx bxl-twitter'></i>
                        </a>
                    </div>
                </div>
            </section>

            <p className="copy">&copy; 2024 Geberew Farm Market. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
