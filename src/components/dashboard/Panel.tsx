'use client'

import React from 'react'
import { useProjectContext, useTaskContext } from '@/context';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


export const Panel = () => {
    const { projects } = useProjectContext()
    const { tasks } = useTaskContext();

    const completedProjects = projects.filter(p => p.status === "completed").length;
    const inProgressProjects = projects.filter(p => p.status === "in_progress").length;

    const completedTasks = tasks.filter(t => t.status === "completed").length;
    const pendingTasks = tasks.filter(t => t.status === "pending").length;
    const inProgressTasks = tasks.filter(t => t.status === "in_progress").length;

  const projectStatusData = [
    { name: "Pendentes", value: projects.filter(p => p.status === "pending").length },
    { name: "Em Andamento", value: inProgressProjects },
    { name: "Concluídos", value: completedProjects },
    { name: "Cancelados", value: projects.filter(p => p.status === "canceled").length },
  ];
  
  const taskStatusData = [
    { name: "Pendentes", value: pendingTasks },
    { name: "Em Andamento", value: inProgressTasks },
    { name: "Concluídas", value: completedTasks },
    { name: "Canceladas", value: tasks.filter(t => t.status === "canceled").length },
  ];

  return (
    <div>
        <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Status dos Projetos</CardTitle>
            <CardDescription>Distribuição dos projetos por status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 text-blue-500">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectStatusData} >
                  <CartesianGrid strokeDasharray="1 1" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#7209b7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Status das Tarefas</CardTitle>
            <CardDescription>Distribuição das tarefas por status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 text-blue-500">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskStatusData}>
                  <CartesianGrid strokeDasharray="1 1" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#7209b7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
