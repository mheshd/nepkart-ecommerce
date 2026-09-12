import { useRef, useState, type MouseEvent } from "react";

interface ImageZoomProps {
  image: string;
  name: string;
}

const ZOOM_LEVEL = 2.5;
const LENS_SIZE = 120;
const ImageZoom = ({ image, name }: ImageZoomProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState("50% 50%");
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMouseEnter() {
    setIsHovering(true);
  }
  function handleMouseLeave() {
    setIsHovering(false);
  }

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Mouse position inside image
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Keep lens inside the image
    const halfLens = LENS_SIZE / 2;
    const x = Math.max(halfLens, Math.min(rect.width - halfLens, mouseX));
    const y = Math.max(halfLens, Math.min(rect.height - halfLens, mouseY));
    setLensPosition({ x, y });

    // Convert position to percentage
    const percentX = ((x - halfLens) / (rect.width - LENS_SIZE)) * 100;
    const percentY = ((y - halfLens) / (rect.height - LENS_SIZE)) * 100;
    setBackgroundPosition(`${percentX}% ${percentY}%`);
  }

  return (
    <div>
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className=" relative w-full max-w-125 aspect-square mx-auto sm:mx-0 rounded-xl border border-gray-100
          overflow-hidden hidden md:block cursor-crosshair "
      >
        {/* Product image */}
        <img
          src={image}
          alt={name}
          draggable={false}
          className=" w-full h-full object-contain select-none "
        />

        {/* MAGNIFYING LENS */}
        {isHovering && (
          <div
            className=" absolute pointer-events-none border-2 border-white bg-white/20
             shadow-[0_0_0_1px_rgba(0,0,0,0.25)] z-20 "
            style={{
              width: `${LENS_SIZE}px`,
              height: `${LENS_SIZE}px`,
              left: `${lensPosition.x}px`,
              top: `${lensPosition.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>

      {/* MOBILE IMAGE */}

      <div className=" md:hidden w-full max-w-125 aspect-square mx-auto rounded-xl border border-gray-100 bg-white overflow-hidden ">
        <img
          src={image}
          alt={name}
          draggable={false}
          className=" w-full h-full object-contain "
        />
      </div>

      {/* ZOOM PANEL */}
      {isHovering && (
        <div
          className=" hidden md:block absolute top-0 left-full  w-140 h-125 aspect-square rounded-xl border border-gray-200 bg-white overflow-hidden shadow-xl z-50 pointer-events-none "
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${ZOOM_LEVEL * 100}%`,
            backgroundPosition,
          }}
        />
      )}
    </div>
  );
};

export default ImageZoom;
