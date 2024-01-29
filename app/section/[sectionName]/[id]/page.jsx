"use client"
import React, { useEffect, useState } from 'react'

const page = ({params}) => {
  const [contentItem, setContentItem] = useState([]);
  console.log("params:", params)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // if (!sections.includes(params.sectionName)) {
        //     console.log("there is no such directory on our website  ")
        //     return;
        //   }
        const res = await fetch(`http://localhost:3000/api/fetchContentFromDB/${params.sectionName}/${params.id}`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch content: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log("Data:", data)
        console.log('Content:', data.contentItem);
        setContentItem(data.contentItem);
      } catch (error) {
        console.error('Error loading content: ', error);
      }
    };

    fetchData();
  }, []); 
  return (
    <div>
        <h1>id:{params.id}</h1>
    </div>
  )
}

export default page