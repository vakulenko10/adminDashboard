import Link from 'next/link'
import React from 'react'
// import '../styles/SectionItem.scss'
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
const SectionItem = ({item, sectionName, handleDelete}) => {
  return (

    <div className="SectionItem" key={item._id}>
      <div className='image-assigned-container'>
      {item.imageURL?<img className="image-assigned" src={item.imageURL} />:<>nothing</>}</div>
      <div className='info-container'>
          <h3>ID: {item._id}</h3>
          {Object.entries(item).map(([property, value]) => (
            // Exclude specific properties you don't want to display
            !['_id'].includes(property) && (
              <div key={property}>
                <h5>{property}:</h5>
                <p>
                  {value}
                </p>
              </div>
            )
          ))}
       </div>       
              <div className='btn-container'>
              <button onClick={() => handleDelete(item._id)} ><FaTrashCan size={40} /></button>
              <Link href={`http://localhost:3000/section/${sectionName}/editItem/${item._id}`}>
                  <button><FaEdit size={40}/></button>
              </Link>
              </div>
    </div>
  )
}

export default SectionItem