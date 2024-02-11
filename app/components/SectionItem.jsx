import Link from 'next/link'
import React from 'react'
import { HiMiniTrash } from "react-icons/hi2";
import { AiFillEdit } from "react-icons/ai";
const SectionItem = ({item, sectionName, handleDelete}) => {
  return (
  
  <div className="SectionItem relative flex max-w-full min-w-[250px] h-[600px] md:max-w-[350px] md:mx-[20px] md:h-[500px] overflow-hidden flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
    <div className="imageContainer relative mx-4 mt-4 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 h-1/2 ">
    {item.imageURL?<img className="h-full w-full object-cover" src={item.imageURL} />:<>nothing</>}
    <div className="h-full w-full btn-container bg-[#0b0b0b58]  rounded absolute px-1 mx-auto top-[0] left-[0] justify-between items-center">
      <button
        className="flex items-center justify-center w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={() => handleDelete(item._id)}
      >
        <HiMiniTrash size={30} fill='white' /> 
      </button>
      <Link className="flex items-center justify-center w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" href={{pathname:`http://localhost:3000/section/${sectionName}/editItem/${item._id}`, query: {sectionName, itemId: item._id, ...item}}}>
                  <button><AiFillEdit size ={30} fill='white'/></button>
      </Link>
    </div>
    </div>
    
    <div className="itemInfo p-6 overflow-y-scroll overflow-x-hidden h-1/2">
    {Object.entries(item).map(([property, value]) => (
            // Exclude specific properties you don't want to display
            !['_id'].includes(property) && (
              <div key={property} className='px-5 break-words flex flex-col w-full'>
                <h5 >{property}:</h5>
                <p >
                  {value}
                </p>
              </div>
            )
          ))}

    </div>
    
  </div>
  

  )
}

export default SectionItem
