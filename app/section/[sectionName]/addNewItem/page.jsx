"use client"
import DynamicForm from '@/app/components/DynamicForm'
import React from 'react'

const page = ({params}) => {
  return (
    <div>
      <h1>params.sectionName:{params.sectionName}</h1>
      <DynamicForm sectionName={params.sectionName}/>
      </div>
  )
}

export default page