import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductList from "./ProductList"; // Reuse the product listing component

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/api/categories/${categoryId}`
        );
        const data = await res.json();
        setCategory(data);
      } catch (err) {
        console.error("Failed to fetch category:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  if (loading) return <div>Loading category...</div>;
  if (!category) return <div>Category not found</div>;

  return (
    <div className="category-page">
      <h1>{category.name}</h1>
      <p className="category-description">{category.description}</p>
      
      {/* Reuse ProductList with category filter */}
      <ProductList 
        presetCategory={category.name}
        showCategoryFilter={false}
      />
    </div>
  );
};

export default CategoryPage;