// components/Gallery/Gallery.jsx
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import "./Gallery.css";

const Gallery = ({ id }) => {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/gallery.json")
      .then((response) => response.json())
      .then((data) => {
        setImages(data.images);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading gallery:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const categories = ["all", ...new Set(images.map((img) => img.category))];

  const filteredImages =
    filter === "all" ? images : images.filter((img) => img.category === filter);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <section id={id} className="gallery reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">
            <i className="fas fa-camera"></i> Moments & Memories
          </span>
          <h2 className="section-title">
            My <span className="gradient">Gallery</span>
          </h2>
          <div className="section-line"></div>
        </div>

        {/* Only show filters if there are images */}
        {!loading && images.length > 0 && categories.length > 2 && (
          <div className="gallery-filter">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`gallery-filter-btn ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="gallery-loading">Loading images...</div>
        ) : filteredImages.length === 0 ? (
          /* EMPTY STATE */
          <div className="gallery-empty-state">
            <i className="fas fa-images"></i>
            <h3>No Images Currently</h3>
            <p>Check back later for new photos and memories.</p>
          </div>
        ) : (
          /* MASONRY GRID */
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {filteredImages.map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className="gallery-item"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/600x400/1e293b/8b5cf6?text=Image+Not+Found";
                  }}
                />
                <div className="gallery-overlay">
                  <span className="gallery-category">{image.category}</span>
                  <h4 className="gallery-title">{image.title}</h4>
                </div>
              </div>
            ))}
          </Masonry>
        )}

        {selectedImage && (
          <div className="lightbox" onClick={() => setSelectedImage(null)}>
            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lightbox-close"
                onClick={() => setSelectedImage(null)}
              >
                <i className="fas fa-times"></i>
              </button>
              <img src={selectedImage.src} alt={selectedImage.title} />
              <div className="lightbox-caption">
                <h4>{selectedImage.title}</h4>
                <p>{selectedImage.category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
