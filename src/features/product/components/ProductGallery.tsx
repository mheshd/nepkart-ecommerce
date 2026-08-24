import { useState } from "react";

// 	Image carousel, thumbnails on the detail page.
interface ProductGalleryProps {
  images: string[];
  name: string;
}
const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4  items-start min-w-0 ">
      {/* thumnails */}
      <div
        className="flex sm:flex-col  gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-125 pb-1 sm:pb-0"
        role="tablist"
        aria-label="Product images"
      >
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            role="tab"
            aria-selected={index === selectedIndex}
            aria-label={`View image ${index + 1} of ${images.length}`}
            onClick={() => setSelectedIndex(index)}
            className={`w-20 h-20 rounded-lg overflow-hidden border transition-all  ${
              index === selectedIndex
                ? "border-gray-600 ring-1 ring-black"
                : "border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      {/* main image */}

      <div className="flex-1 min-w-0">
        <div className="w-full max-w-125 aspect-square mx-auto sm:mx-0 border border-gray-100 rounded-xl overflow-hidden bg-white">
          <img
            src={images[selectedIndex]}
            alt={name}
            aria-hidden="true"
            className="w-full h-full  object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
