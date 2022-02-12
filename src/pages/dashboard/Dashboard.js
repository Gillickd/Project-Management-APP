
import ProjectList from '../../components/ProjectList'
import { useCollection }  from '../../hooks/useCollection'

//styles
import './Dashboard.css'

   
export default function Dashboard() {
    const { documents, error } = useCollection('projects')
    return(
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error && <p className="error">{error}</p>}
            {/*Checks for documents and if documents avail it will mapp through each one. 
            {documents && documents.map(doc => (
                <p key={doc.id}>{doc.name}</p>
            ))} */}

         
    {documents && <ProjectList projects={documents} />} 
        </div>
    )
}
