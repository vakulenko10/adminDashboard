import React from 'react'
import { sectionsLinks } from './mainvars'
import Link from 'next/link'

const LinksContainer = ({isSmallHeaderActive, setIsSmallHeaderActive}) => {
  return (
    <div className={`md:block ${isSmallHeaderActive?`absolute inset-x-0 inset-y-0 pt-10 p-3 bg-[#f8f8f8d9]  h-fit md:block md:relative md:bg-inherit md:p-0`:`hidden`} `}>
        <ul className={`md:bg-transparent ${isSmallHeaderActive?`flex flex-col md:flex md:flex-row md:p-0 md:gap-[10px] md:bg-transparent `:`md:flex md:gap-[10px]`} `}>
            {sectionsLinks.map((link, index)=> <Link key={index} onClick={()=>setIsSmallHeaderActive(false)} href={`/section/${link}`} className={`transition duration-200 ease-linear ${isSmallHeaderActive?`md:bg-transparent p-5 hover:bg-white md:hover:bg-transparent md:hover:text-[#00000080] md:p-0 `:`md:hover:text-[#00000080]`}`}>{link}</Link>)}
        </ul>
    </div>
  )
}

export default LinksContainer