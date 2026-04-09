"use client";
import React from "react";
import "./ProductCategory.css";

const ProductCategory = () => {
    const products = [
        {
            title: "Watch Collection",
            img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
        },
        {
            title: "Men Collection",
            img: "https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg",
        },
        {
            title: "Kids Collection",
            img: "https://thumbs.dreamstime.com/b/group-elementary-school-kids-sitting-school-steps-71530399.jpg",
        },
        {
            title: "Shirts",
            img: "https://thumbs.dreamstime.com/b/senior-men-relaxing-armchairs-9003956.jpg",
        },
        {
            title: "Pants",
            img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=80",
        },
        {
            title: "Women",
            img: "https://thumbs.dreamstime.com/b/young-woman-working-modern-business-office-student-girl-using-laptop-computer-cafe-young-woman-working-modern-business-198117357.jpg",
        },
    ];

    return (
        <section className="products-section">
            <div className="container">
                <h1 className="section-title">Our Products</h1>
                <div className="products-grid">
                    {products.map((product, index) => (
                        <div key={index} className="product-card">
                            <img src={product.img} alt={product.title} />
                            <h2>{product.title}</h2>
                        </div>
                    ))}
                </div>
            </div>
           <button className="see-all-btn">
                  See All
            </button>
        </section>
    );
};

export default ProductCategory;
