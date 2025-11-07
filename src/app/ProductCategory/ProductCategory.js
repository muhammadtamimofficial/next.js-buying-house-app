"use client";
import React from "react";
import "./ProductCategory.css";

const ProductCategory = () => {
    const products = [
        {
            title: "Women Collection",
            img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
        },
        {
            title: "Men Collection",
            img: "https://images.unsplash.com/photo-1600180758895-7c6b38b07d48?auto=format&fit=crop&w=500&q=80",
        },
        {
            title: "Kids Collection",
            img: "https://images.unsplash.com/photo-1587560699334-6b7f78e03d4d?auto=format&fit=crop&w=500&q=80",
        },
        {
            title: "Shirts",
            img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=80",
        },
        {
            title: "Pants",
            img: "https://images.unsplash.com/photo-1602810312141-cc3d3fa44e2f?auto=format&fit=crop&w=500&q=80",
        },
        {
            title: "Women Top",
            img: "https://images.unsplash.com/photo-1587401048752-8b97cfb0382b?auto=format&fit=crop&w=500&q=80",
        },
        {
            title: "Blazer",
            img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80",
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
        </section>
    );
};

export default ProductCategory;
