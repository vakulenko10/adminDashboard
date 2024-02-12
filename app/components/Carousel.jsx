"use client"
import React, { useState } from 'react'
import { useImage } from './ImageURLContext';
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
const Carousel = ({photos}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const {setImageURLFromContext} = useImage();
    const handlePrevious = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
      };
    
      const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
      };
    //   console.log("photos:", photos)
  return (
    <div className='carousel overflow-hidden box-border flex max-w-full md:w-[400px] md:h-[500px] relative'>
        {photos?(<div className='w-full flex flex-col justify-center items-center '>
            <img src={photos[activeIndex].url} alt={photos[activeIndex].original_filename} onClick={()=>setImageURLFromContext(photos[activeIndex].url)} className='object-cover w-full h-5/6'/>
            <h5 className='absolute text-white'>click on the image to assign it to the item</h5>
            <div className='button-container absolute z-10 bottom-0 flex justify-between w-full'>
            <button id="previousImage" onClick={handlePrevious}><FaArrowCircleLeft size={60} fill='#fff' /></button>
            <button id="nextImage" onClick={handleNext}><FaArrowCircleRight size={60} fill='#fff'/></button>
            </div>
        </div>):<>no photos in that section</>}
        
    </div>
    // <ul>
    //     {photos.map((photo) => (
    //             <li key={photo.public_id} className='image_item overflow-hidden max-w-[400px] md:max-w-[400px] ' >
    //                 {/* <h3>bytes: {photo.bytes} width: {photo.width}px height: {photo.height}px url:{photo.url}</h3> */}

    //                 <figure  className='imageFigure relative' onClick={()=>setImageURLFromContext(photo.url)}>
    //                     <button className='copyImageUrl transition duration-300 ease-linear absolute top-[40%] left-[30%] p-4 border-2 rounded border-white text-white hover:bg-white hover:text-black' >Choose that image</button>
    //                 <img key={photo.public_id} id={photo.public_id} src={photo.url} alt={photo.original_filename} className=''/>
    //                 </figure>
                    
    //             </li>
            
    //         ))}
    // </ul>
  )
}

export default Carousel