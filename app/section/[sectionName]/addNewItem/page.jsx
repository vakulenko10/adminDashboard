"use client"
import "../../../styles/main.scss"
import Container from '@/app/components/Container'
import DynamicForm from '@/app/components/DynamicForm'
import GetImagesFromFolder from '@/app/components/GetImagesFromCloudinary'
import React from 'react'
const page = ({params}) => {
  return (
    <div className='page'>
      <Container>
      <h1>params.sectionName:{params.sectionName}</h1>
      <DynamicForm sectionName={params.sectionName}/>
      <GetImagesFromFolder sectionName={params.sectionName}/>
      </Container>
      </div>
  )
}

export default page