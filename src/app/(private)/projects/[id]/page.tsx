import React from 'react'
 
 
 export default async function ProjectDetails({ params }: { params: Promise<{ id: string }>}){
     const { id } = await params
 
     return (
         <div>
             <span>pagina detalhes do : {id}</span>
         </div>
     )
 }