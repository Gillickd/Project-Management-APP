import React, { useState } from 'react'
import ProjectList from '../../components/ProjectList'
import { useCollection }  from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'

//styles
import './Dashboard.css'
import ProjectFilter from './ProjectFilter'

   
export default function Dashboard() {
    const { user } = useAuthContext()
    const { documents, error } = useCollection('projects')
    const [currentFilter, setCurrentFilter] = useState('all')

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    const projects = documents ? documents.filter((document) => {
        switch (currentFilter) {
            case 'all':
                return true
            case 'mine' :
                let assignedToMe = false
                document.assignedUsersList.forEach((u) => {
                    if (user.uid === u.id) {
                        assignedToMe = true
                    }
                }) 
                return assignedToMe
            case 'devlopement':
                case 'design':
                case 'sales' :
                case 'marketing':
                    console.log(document.category, currentFilter)
                    return document.category === currentFilter
                default:
                    return true
        }
            
    }): null

    return(
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error && <p className="error">{error}</p>}
            {/*Checks for documents and if documents avail it will mapp through each one. 
            {documents && documents.map(doc => (
                <p key={doc.id}>{doc.name}</p>
            ))} */}

    {document && (
    <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} /> 
    )}    
    {projects && <ProjectList projects={projects} />} 
        </div>
    )
}
