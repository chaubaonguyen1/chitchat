import {useState, useEffect} from 'react'
import { db } from '../firebase/config'

const useFirestore = (collection, condition) => {
   /// test
    const [documents, setDocuments] = useState([])
    useEffect(() => {
        let collectionRef = db.collection(collection).orderBy('createdAt')
        
        if (condition) {
            if (!condition.value || !condition.value.length) {
                return;
            }
          
            collectionRef = collectionRef.where(
                condition.fieldName,
                condition.operator,
                condition.value
            )
        }
        const unsubscribe = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setDocuments(documents)
        })
        return unsubscribe
    }, [collection, condition])
   
    return documents
}

export default useFirestore;