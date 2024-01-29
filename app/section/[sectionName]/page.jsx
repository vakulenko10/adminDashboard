"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
const Page = ({ params }) => {
  const [contentItems, setContentItems] = useState([]);
  const sections = ['welcome', 'aboutMe', 'myPortfolio', 'myBlog', 'FAQS'];
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!sections.includes(params.sectionName)) {
            console.log("there is no such directory on our website  ")
            return;
          }
        const res = await fetch(`http://localhost:3000/api/fetchContentFromDB/${params.sectionName}`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch content: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log("Data:", data)
        console.log('Content:', data.contentItems);
        setContentItems(data.contentItems);
      } catch (error) {
        console.error('Error loading content: ', error);
      }
    };

    fetchData();
  }, [params.sectionName]); // Fetch data whenever sectionName changes
  if (!sections.includes(params.sectionName)) {
    return(
        <div>
          <h1>404 </h1>
          <h3>there is no such directory...</h3>
        </div>
    )
  }
  return (
    <div>
      <h1>{params.sectionName} Page</h1>
      <ul>
        {contentItems?.map((item) => (
          <li key={item._id}>title:{item.title} and description{item.description} <Link href={`http://localhost:3000/section/${params.sectionName}/${item._id}`}>fsgd</Link></li>
          // Adjust this based on the actual properties you want to display
        ))}
      </ul>
      <Link href={`http://localhost:3000/section/${params.sectionName}/addNewItem`}>add item to that section</Link>
      <button></button>
    </div>
  );
};

export default Page;