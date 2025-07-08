import { useEffect } from 'react';
//import Header from '../components/Header';
import Footer from '../../components/Footer';
import { blogPosts } from '../../data/blogs';
import "../../styles/blogs.css";

// Import all blog images
import farmersImage from '../../assets/images/blogs/farmers.png';
import sunflowerImage from '../../assets/images/blogs/autumn_harvest.png';
import sustainableImage from '../../assets/images/blogs/sustainable_farming.png';
import healthyImage from '../../assets/images/blogs/healthy_eating.png';

const Blog = () => {
  useEffect(() => {
    document.title = "Geberew Local Farm Market - Blog";
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'This is the blog page of Geberew Local Farm Market';
    document.head.appendChild(metaDescription);
    
    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  // Map image names to imported images
  const imageMap = {
    'farmers.png': farmersImage,
    'autumn_harvest.png': sunflowerImage,
    'sustainable_farming.png': sustainableImage,
    'healthy_eating.png': healthyImage
  };

  return (
    <div className="blog-page">
      
      <div className="background">
        <div className="overlay">
          <header className="blog-header">
            <h1>Geberew Farms - The Blog</h1>
            <p>Stay updated with the latest happenings at Geberew Farms!</p>
          </header>
        </div>
      </div>

      <main className="blog-main">
        {blogPosts.map(post => (
          <section key={post.id} className="blog-item">
            <div className="blog-image">
              <img 
                src={imageMap[post.image]} 
                alt={post.title} 
              />
            </div>
            <div className="blog-content">
              <h2>{post.title}</h2>
              <p className="post-meta">Posted on {post.date} by {post.author}</p>
              <p>{post.excerpt}</p>
            </div>
          </section>
        ))}
      </main>

      
    </div>
  );
};

export default Blog;