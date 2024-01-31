"use client"
import DynamicForm from '@/app/components/DynamicForm';
import React, { useEffect, useState } from 'react'

const page = ({params}) => {
  const [contentItem, setContentItem] = useState([]);
  console.log("params:", params)
  useEffect(() => {
    const getContentById = async () => {
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

    getContentById();
  }, [params.sectionName]); 
  return (
    <div>
        <DynamicForm sectionName={params.sectionName} initialData={contentItem}/>
    </div>
  )
}

export default page