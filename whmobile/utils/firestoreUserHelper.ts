import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase'; // your firebase.ts setup
import { User } from 'firebase/auth';


interface UserProfileData {
    username?: string;
    guild?: string;
    motto?: string;
    avatarId?: string;
    mood?: string;
    additionalData?: Record<string, any>;
}

export const createOrUpdateUserProfile = async (user: User, profileData?: UserProfileData) => {
    try{
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if(!userSnap.exists()){
            // New user, create their profile
            await setDoc(userRef, {
                email: user.email,
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
                profileComplete: false,
                level: 1,
                inventory: {},
                ...profileData, // optional fields from onboarding
            });
            console.log('✨ New user profile created');
        }else{
            //Existing user, update their last login and otehr fields if necessary
            await updateDoc(userRef, {
                lastLogin: serverTimestamp(),
            
            });
            console.log('🔄 User profile updated with last login');
        }
    }catch(err){
        console.error('🔥 Error creating/updating user profile:', err);
        throw new Error('Error creating/updating user profile');
    }
}