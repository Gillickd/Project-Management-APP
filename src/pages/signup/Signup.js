
import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'


//styles

import './signup.css'

   
export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumnailError] = useState(null)
    const { signup, isPending, error } = useSignup()


    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, displayName, thumbnail)
    }


    const handleFileChange = (e) => {
        {/*Just in case files were uploaded previously, we set thumbnail back to null */}
        setThumbnail(null)
        {/*Then we use a variable "selected on the event  (e) object" target the input field and return an array called 
    files. Multiply file can be selected using the files input. We only want oen file. The file with the first position in that array. So we will use [0] to select the 
    first file in array */}
        let selected = e.target.files[0]
        console.log(selected)

        if(!selected) {
            {/* If not selected, then we need some sort of error to display and for that we will need State*/}
            setThumnailError('Please select a file')
            return
        }
        
{/*If type property does not include a string image then return error message */}
        if(!selected.type.includes('image')) {
            setThumnailError('Selected file must be an image file')
            return
        }
        
        if (selected.size > 100000) {
            setThumnailError('Image file size must be less that 100kb')
            return
        }

        {/**If it passes all checks above then error is cleared/ set to null 
         and set Thumbnail to selected (which will be the image file selected)*/}

        setThumnailError(null)
        setThumbnail(selected)
        console.log('thumbnail updated')

    }


    

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
           <h2>Sign up</h2>
           <label>
               <span>email:</span>
               <input
               required
               type="email"
               placeholder="Enter your email"
               onChange={(e) => setEmail(e.target.value)}
               value={email}
               
               />
           </label>
           <label>
               <span>password:</span>
               <input
               required
               type="password"
               
               onChange={(e) => setPassword(e.target.value)}
               value={password}
               
               />
           </label>
           <label>
               <span>display name:</span>
               <input
               required
               type="text"
               
               onChange={(e) => setDisplayName(e.target.value)}
               value={displayName}
               
               />
           </label>
           <label>
               <span>profile thumbnail:</span>
               <input
               required
               type="file"
               onChange={handleFileChange}
                                          
               />
               {/* && will return the first truthy value which means we have an error  */}
               {thumbnailError && <div className="error">{thumbnailError}</div> }
           </label>
           {!isPending && <button className="btn">Sign Up </button>}
           {isPending && <button className="btn" disabled>loading</button>}
           {error && <div className="error">{error}</div>}
        </form>
    )
}