"use client";

import React from "react";
import Image from "next/image";
import Flickity from "react-flickity-component";

interface CarouselImagesProps {
  images: string[];
}

export default function CarouselImages({ images }: CarouselImagesProps) {
  return (
    <div id="details-images" className="main-carousel overflow-x-hidden mt-[30px]">
      <Flickity
        options={{
          cellAlign: "left",
          contain: true,
          draggable: true,
          pageDots: false,
          prevNextButtons: false,
        }}
      >
        {images.map((img, i) => (
          <div key={img + i} className="image-card pr-5">
            <div className="bg-white w-[470px] h-[350px] p-10 flex shrink-0 border border-[#E5E5E5] justify-center items-center rounded-[30px] overflow-hidden">
              <Image
                src={img}
                className="w-full h-full object-contain"
                width={470}
                height={350}
                alt="thumbnail"
              />
            </div>
          </div>
        ))}
      </Flickity>
    </div>
  );
}
