import { useState } from 'react';
import '../../styles/about.css';

// Import all images
//import bgImage from '../assets/images/about/bg.jpg';
import whoAreWeImage from '../../assets/images/about/who-are-we.jpg';
import dairyImage from '../../assets/images/about/dairy.jpg';
import flowerssImage from '../../assets/images/about/flowerss.jpg';
import fruitsImage from '../../assets/images/about/fruits.jpg';
import grainImage from '../../assets/images/about/grain.jpg';
import vegImage from '../../assets/images/about/veg.jpg';
import ourStoryImage from '../../assets/images/about/ourstory.jpg';

const About = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <main className="container">
      {/* Hero Section */}
        
    
        <div className="about-text">
          <h1>About us</h1>
        </div>
    

      {/* Who Are We Section */}
      <section className="who-are-we">
        <div className="content">
          <div className="image">
            <img 
              src={whoAreWeImage} 
              alt="Who Are We" 
            />
          </div>
          <div className="text">
            <h2>Who Are We</h2>
            <p>
              We are Geberew Farms, a community-driven local farm market dedicated to providing fresh, organic, and sustainable produce to families and businesses. Rooted in the traditions of Ethiopian farming, we believe in the power of nature and the importance of supporting local farmers. Our mission is to offer a wide range of seasonal fruits, vegetables, herbs, dairy products, and grains, all sourced directly from our farm and trusted local farmers. We pride ourselves on connecting our customers with the food they eat, ensuring transparency, sustainability, and quality in every product we offer. At Geberew Farms, we are not just selling produce; we are fostering a healthier, more connected community.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery">
        <h2>Showcase Our Gallery</h2>
        <div className="gallery-images">
          <img src={dairyImage} alt="Dairy Products" />
          <img src={flowerssImage} alt="Beautiful Flowers" />
          <img src={fruitsImage} alt="Fresh Fruits" />
          <img src={grainImage} alt="Organic Grains" />
          <img src={vegImage} alt="Fresh Vegetables" />
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story">
        <div className="content">
          <div className="text">
            <h2>Our Story</h2>
            <div className="story-content">
              <summary>
                <strong>Our Journey:</strong> Geberew Farms was born from a passion for sustainable farming and a desire to connect people with fresh, local produce. Here's how we started and how far we've come.
              </summary>
              <button 
                className="toggle-details" 
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? 'Show Less' : 'Read More'}
              </button>
              {showDetails && (
                <div className="details-content">
                  <p>Geberew Farms was founded by Geberew, who grew up in the fertile highlands of Ethiopia, learning traditional farming practices passed down through generations. The vision behind Geberew Farms was to create a model that not only respects nature but also uses modern farming practices to grow and deliver organic, fresh produce to urban and rural communities.</p>
                  <p>Our farm started as a small family venture, but as demand for healthy, local food grew, we expanded to include other local farmers. We connected with small-scale farmers from across Ethiopia, teaching them sustainable farming methods, promoting organic produce, and ensuring that farmers received fair prices for their goods.</p>
                  <p>Today, Geberew Farms provides a range of products from seasonal vegetables to fresh herbs, dairy, and grains. We organize farmer markets in major cities like Addis Ababa, creating direct access to local produce for consumers. Our commitment to sustainability is at the heart of everything we do—from our farming practices to the packaging we use.</p>
                  <p>We believe in the power of community and in supporting local economies. As part of our mission, we host events and workshops to share knowledge about sustainable farming, healthy eating, and environmental conservation. Geberew Farms is not just about providing fresh food; it's about building stronger, more connected communities.</p>
                  <p>Our mission is to continue expanding, empowering farmers, and helping Ethiopia's food system grow in a way that benefits both people and the planet.</p>
                </div>
              )}
            </div>
          </div>
          <div className="image">
            <img 
              src={ourStoryImage} 
              alt="Our Story" 
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;