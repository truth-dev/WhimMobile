import {doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // your firebase.ts setup


export const updateProfileComplete = async (uid: string) => {
    try{
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
            profileComplete:true,
            updatedAt: new Date(),
        });
        console.log('✅ Profile marked as complete!');

    }catch(err){
        console.error('🔥 Failed to update profileComplete:', err)
        throw new Error('Failed to update profileComplete');
    }
}