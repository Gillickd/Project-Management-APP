import { useState, useEffect } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { timestamp } from '../../firebase/config'
import { useHistory } from "react-router-dom";



//styles
import "./create.css";

//Select Options
const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
  { value: "service", label: "Service" },
];

export default function Create() {
    //add history 
    const history = useHistory();
    //add a document to firestore using the "addDocument" in useFirestore hook 
    const { addDocument, response } = useFirestore('projects')
  //Using the useCollection hook to get all the documents from the users collection.Each document represents a user
  const { documents } = useCollection('users');
  console.log(documents);

  const [users, setUsers] = useState([])
  const { user } = useAuthContext()  

  //form fields values
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState('')

//create User values for React Select component

  useEffect(() => {
      if(documents) {
          const options = documents.map(user => {
              return { value: user, label: user.displayName }
          })

          setUsers(options)

      }
  }, [documents] )

  //Select Options
  const categories = [
    { value: "development", label: "Development" },
    { value: "design", label: "Design" },
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
    { value: "service", label: "Service" },
  ];
//Event handler and Error section 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null)

    if (!category) { setFormError('Please select a project category')
    return
     }

     if (assignedUsers.length < 1) {setFormError('Please assign project to a user')
     return

     }
// CeatedBy Object
const createdBy = {
    displayname: user.displayName,
    photoURL: user.photoURL,
    id: user.uid
}

// Map through the assigned users to create new object array with data required 

const assignedUsersList = assignedUsers.map((u) => {
    return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
    }
    
}) 


//project objects 
const project = {
    name,
    details,
    category: category.value,
    dueDate: timestamp.fromDate(new Date(dueDate)),
    comments: [],
    createdBy,
    assignedUsersList
}


    //console.log(project);

    //add project object to 
    //if no responce error, then redirect to dashboard which is default page 
    await addDocument(project)
        if (!response.error) {
        history.push('/')

    }

  };

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Due Date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project Category:</span>
          {/*Project Category*/}
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          {/*ProjectAssignment*/}
          <Select
            onChange={(options) => setAssignedUsers(options)}
            options={users}
            isMulti
                  />
        </label>
        <button className="btn">Add Project</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
