"use client"
import Container from "@/app/components/Container";
import "../../styles/sectionPage.scss";
import GetImagesFromFolder from '@/app/components/GetImagesFromCloudinary';
import SectionItem from '@/app/components/SectionItem';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
const Page = ({ params }) => {
  const [contentItems, setContentItems] = useState([]);
  const [schema, setSchema] = useState({});
  const [loading, setLoading] = useState(true);
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
        setSchema(data.modelProperties);
      } catch (error) {
        console.error('Error loading content: ', error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchData();
  }, [params.sectionName]);

  const handleDelete = async (id) => {
    try {
      const userConfirmed = window.confirm('Are you sure you want to delete this item?');

      if (!userConfirmed) {
        return; // If the user cancels the action, do nothing
      }
      const res = await fetch(`http://localhost:3000/api/fetchContentFromDB/${params.sectionName}?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Failed to delete item: ${res.status} ${res.statusText}`);
      }

      // Update the contentItems state after successful deletion
      setContentItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  if (!sections.includes(params.sectionName)) {
    return (
      <div>
        <h1>404 </h1>
        <h3>there is no such directory...</h3>
      </div>
    );
  }

  return (
    <>

    <Container>
      <h1>{params.sectionName} Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
         <button id="addNewItemBtn">
          <Link href={`http://localhost:3000/section/${params.sectionName}/addNewItem`}>add item to that section</Link>
         </button>
        <div className='sectionItems'>
          {contentItems?.map((item, index) => (
            <SectionItem key={index} item={item} sectionName={params.sectionName} handleDelete={handleDelete}/>
          ))}
        </div>
        </>
      )}
     
      
    </Container>
    </>
  );
};

export default Page;
