"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import { fetchPhotos } from '@/libs/GetCloudinary';
const GetImagesFromFolder = ({sectionName}) => {
        const [photos, setPhotos] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        useEffect(() => {
        const fetchData = async (sectionName) => {
            try {   
            const photosData = await fetchPhotos(sectionName);
            setPhotos(photosData);
            setIsLoading(false);
            } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
            }
        };
        fetchData(sectionName);
        }, []);
        if(isLoading){
            return <h1>is loading...</h1>
        }
        return (
            <div className={`imagesFolderSection ${sectionName}`}>
                <h1>images folder name on cloudinary:"{sectionName}" </h1>
                <ul>
                {photos.map((photo) => (
                        <li key={photo.public_id} className='image_item' >
                            <h3>bytes: {photo.bytes} width: {photo.width}px height: {photo.height}px url:{photo.url}</h3>

                            <figure >
                            <img key={photo.public_id} id={photo.public_id} src={photo.url} alt={photo.original_filename}/>
                            </figure>
                           
                        </li>
                    
                    ))}
                </ul>
            </div>
        )
}

export default GetImagesFromFolder