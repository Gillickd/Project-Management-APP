import { useEffect, useState } from 'react'
import { projectFirestore } from "../firebase/config"



export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    //realtime data from the document

    useEffect(() => {
        //reference to where you want to go on firebase to get document
        const ref = projectFirestore.collection(collection).doc(id)

        const unsubscribe = ref.onSnapshot((snapshot) => {
            if (snapshot.data()) {
            setDocument({...snapshot.data(), id: snapshot.id})
            setError(null)
            }
            else {
                setError('Sorry no document exists')
            }
        }, (err) => {
            console.log(err.message)
            setError('failed to get document')

        })
        return () => unsubscribe()

    }, [collection, id])

    return {document, error}


}