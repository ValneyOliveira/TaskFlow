import React from 'react'
 import { Card, CardContent } from '../ui/card'
 import { LucideProps } from 'lucide-react';
 
 
 interface ProjectSummaryCardProps {
   title: string;
   Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
   value: string | number; 
 }
 
 export const ProjectSummaryCard: React.FC<ProjectSummaryCardProps> = ({ title, Icon, value}) => {
   return (
     <>
     <Card className='min-w-max'>
         <CardContent>
           <div className='flex justify-between items-center'>
             <span className=''>{title}</span>
             <Icon className='' size={18}/>
           </div>
           <span className='block mt-1 text-2xl font-semibold'>{value}</span>
         </CardContent>    
     </Card>
 
     </>
   )
 }