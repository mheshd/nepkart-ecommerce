import { useState } from "react";
import ImageZoom from "./ImageZoom";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <div className=" min-w-0 w-full">
        <div className="hidden md:block">
          <ImageZoom image={images[selectedIndex]} name={name} />
        </div>

        {/* DESKTOP THUMBNAILS */}
        <div
          className="hidden md:flex mt-2  gap-2 overflow-x-auto   pb-1 sm:pb-0"
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
              className={`w-20 h-20  rounded-lg overflow-hidden border transition-all ${
                index === selectedIndex
                  ? "border-gray-600 "
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

        {/* MOBILE IMAGE SLIDER */}

        <div className=" md:hidden  overflow-x-auto flex snap-x snap-mandatory scroll-smooth scrollbar-hide ">
          {images.map((image, index) => (
            <div
              key={`${image} - ${index}`}
              className="w-full min-w-full shrink-0 snap-center "
            >
              <div className=" w-full aspect-square  rounded-xl border border-gray-200 overflow-hidden ">
                <img
                  src={image}
                  alt={`${name} ${index + 1}`}
                  draggable={false}
                  className="w-full h-full object-contain select-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
