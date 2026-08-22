import { useState } from "react";

// 	Image carousel, thumbnails on the detail page.
interface ProductGalleryProps {
  images: string[];
  name: string;
}
const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex gap-4  items-center">
      <div className="flex flex-col gap-2">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
              index === selectedIndex ? "border-black" : "border-transparent"
            }`}
          >
            <img src={image} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      <img
        src={images[selectedIndex]}
        alt={name}
        aria-hidden="true"
        className="w-60 h-40"
      />
    </div>
  );
};

export default ProductGallery;
