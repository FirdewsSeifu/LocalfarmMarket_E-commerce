import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../styles/home.css";
import "../../styles/navbar.css";
import aboutImage from "../../assets/images/home/about.jpg";
import vegeImage from "../../assets/images/home/vege.jpg";
import fruitsImage from "../../assets/images/home/fruits.jpg";
import grainsImage from "../../assets/images/home/grains.jpg";
import dairyImage from "../../assets/images/home/dairy.jpg";
import sunflowerImage from "../../assets/images/products/sunflowers.jpeg";
import rosesImage from "../../assets/images/products/roses.jpeg";
import tulipsImage from "../../assets/images/products/tulips.jpeg";
import radishImage from "../../assets/images/products/radishes.png";
import eventImage from "../../assets/images/events/herb_garden_tour.jpg";
import blogImage from "../../assets/images/blogs/local_farming.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const navigate = useNavigate();  // Only declare it once

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/ProductList?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Initialize animations
    const animateElements = () => {
      const elements = document.querySelectorAll('.fade-in, .slide-up, .zoom-in');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      }, {
        threshold: 0.1
      });

      elements.forEach(element => {
        observer.observe(element);
      });
    };

    animateElements();
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="home-container">
      <div className="hero">
        <h1>Welcome to Our Local Farm Market</h1>
        <p>Fresh organic products directly from farmers.</p>
        <Link to="/ProductList" className="btn pulse">
          Shop Now
        </Link>
      </div>
      <input
        type="text"
        className="search-bar"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button onClick={handleSearch} className="btn search-btn">Search</button>

      <main className="container">
        {/* About Section */}
        <section className="container1 slide-up">
          <div className="content">
            <h2>About Us</h2>
            <p>
              Welcome to <strong>Geberew Farm Market</strong>! We're your local
              source for the freshest produce, straight from our fields to your
              table.
            </p>
            <p>
              Founded in 2012, Geberew began as a small family-owned farm with a
              vision to provide the community with high-quality, locally-grown
              products.
            </p>
            <p>We do unique works which make us favored in the market. Like........</p>
            <button onClick={() => navigate("/about")} className="btn btn-hover">More &gt; </button>
          </div>
          <div className="image">
            <img src={aboutImage} alt="Farm Image" className="zoom-in" />
          </div>
        </section>

        {/* Products Section */}
        <section className="container2 fade-in">
          <h2>Our Products</h2>
          <div className="products">
            {[["Vegetables", vegeImage, "#vegetables-products"],
              ["Fruits", fruitsImage, "#fruits-products"],
              ["Grains", grainsImage, "#grains-products"],
              ["Dairy", dairyImage, "#dairy-products"]].map(([name, image, link], index) => (
              <div className="box slide-up" key={index} style={{ transitionDelay: `${index * 0.1}s` }}>
                <Link to={`/products${link}`}>
                  <img src={image} alt={`Fresh ${name}`} />
                </Link>
                <p>
                  <Link to={`/products${link}`}>{name}</Link>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Farm Special Section */}
        <section className="container3 fade-in">
          <h2>Farm Special</h2>
          <div className="products">
            {[["Sunflowers", sunflowerImage, 10],
              ["Roses", rosesImage, 15],
              ["Tulips", tulipsImage, 12],
            ["Radishes", radishImage, 10]].map(([name, image, price], index) => (
              <div className="box slide-up" key={index} style={{ transitionDelay: `${index * 0.1}s` }}>
                <img src={image} alt={name} />
                <h3>{name}</h3>
                <p>Price: <strong>${price}.00</strong></p>
                <p><strong>In Stock</strong></p>
                <p>Beautiful {name.toLowerCase()} (5 pieces), perfect for gifts and decoration.</p>
              </div>
            ))}
          </div>
          <div className="btn-container">
            <Link to="/ProductList" className="btn pulse">
              Explore More
            </Link>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="container4 slide-up">
          <h2 className="section-title">Upcoming Events</h2>
          <p className="section-description">
            Be part of exciting experiences that celebrate the harmony of
            farming, community, and nature.
          </p>
          <div className="event-content">
            <img src={eventImage} alt="Herb Garden Tour and Tea Tasting" className="event-image zoom-in" />
            <div className="details">
              <h3 className="event-title">Herb Garden Tour and Tea Tasting</h3>
              <p className="event-info"><strong>Date:</strong> February 01, 2025</p>
              <p className="event-info"><strong>Time:</strong> 1:00 PM - 5:00 PM</p>
              <p className="event-description">
                Step into our lush herb garden for a guided tour and an immersive tea-tasting experience.
              </p>
              <Link to="/events" className="btn btn-hover">See More</Link>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="container5 fade-in">
          <div className="blog">
            <h2>Latest Blog</h2>
            <div className="blog-posts">
              <article className="slide-up">
                <div className="image">
                  <img src={blogImage} alt="The Journey of Local Farming" />
                </div>
                <div className="content">
                  <h3>"The Journey of Local Farming"</h3>
                  <p>
                    Local farming is not just about growing food; it's a journey that connects us to our land and community.
                  </p>
                  <Link to="/blogs" className="btn btn-hover">See More</Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="container7 slide-up">
          <h2>Reach Out</h2>
          <div className="contact-info">
            {[ 
              [faLocationDot, "Address", "Burayu, Ashewa Meda."],
              [faEnvelope, "Email", "geberew@gmail.com"],
              [faPhone, "Phone", "+251-90-989-8990"]
            ].map(([icon, title, detail], index) => (
              <div className="contact-item fade-in" key={index} style={{ transitionDelay: `${index * 0.2}s` }}>
                <FontAwesomeIcon icon={icon} />
                <div className="text">
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="button-container">
            <Link to="/contact" className="btn pulse">Get in Touch</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
