'use client'

import { db } from "@/app/firebase/firebase";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";

// const { db } = require("@/app/firebase/firebase");
// const { onSnapshot, doc } = require("firebase/firestore");

export async function aboutGlobal(userId) {
    try {

        let about = await getDoc(doc(db, 'about', userId));
        if (about.exists()) {
            return about.data()['description'];
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function profileGlobal(userId) {
    try {

        let profile = await getDoc(doc(db, 'profile', userId));
        if (profile.exists()) {
            return profile.data();
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        
    } catch (error) {
        console.log(error);
    }
}

export async function skillsGlobal (userId) {
    try {
        let skills = [];
        let skillRef =  collection(db, 'skill');
        let q =  query(skillRef, where("user_id", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            skills.push(doc.data());
        });
        return skills;
    } catch (error) {
        console.log(error);
    }
}


export async function awardsGlobal (userId) {
    try {
        let awards = [];
        let awardsRef = collection(db, 'award');
        let q = query(awardsRef, where('user_id', '==', userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            awards.push(doc.data());
        });
        return awards;
    } catch (error) {
        console.log(error);
    }
}

export async function membershipsGlobal(userId) {
    try {
        let memberships = [];
        let membershipRef = collection(db, 'memberships');
        let q = query(membershipRef, where('user_id', '==', userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            memberships.push(doc.data());
        });
        return memberships;
    } catch (error) {
        console.log(error);
    }
}


export async function languagesGlobal(userId) {
    try {
        let languages = [];
        let langsRef = collection(db, 'languages');
        let q = query(langsRef, where('user_id', '==', userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            languages.push(doc.data());
        });
        return languages;
    } catch (error) {
        console.log(error);
    }
}


export async function educationGlobal(userId) {
    try {
        let education = [];
        let eduRef =  collection(db, 'education');
        let q =  query(eduRef, where("user_id", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            education.push(doc.data());
        });
        return education;
    } catch (error) {
        console.log(error);
    }
}


export async function experiencesGlobal(userId) {
    try {
        let experiences = [];
        let experienceRef =  collection(db, 'experience');
        let q =  query(experienceRef, where("user_id", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            experiences.push(doc.data());
        });
        return experiences;
    } catch (error) {
        console.log(error);
    }
}


export async function internshipsGlobal(userId) {
    try {
        let internships = [];
        let internshipRef = collection(db, 'internships_volunteer_work');
        let q = query(internshipRef, where('user_id', '==', userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            internships.push(doc.data());
        });
        return internships;
    } catch (error) {
        console.log(error);
    }
}


export async function publicationsGlobal(userId) {
    try {
        let publications = [];
        let publicationsRef = collection(db, 'publications');
        let q = query(publicationsRef, where('user_id', '==', userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            publications.push(doc.data());
        });
        return publications;
    } catch (error) {
        console.log(error);
    }
}

export async function linksGlobal(userId) {
    try {
        let links = [];
        let linksRef = collection(db, 'links');
        let q = query(linksRef, where('user_id', '==', userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            links.push(doc.data());
        });
        return links;
    } catch (error) {
        console.log(error);
    }
}

export async function projectsGlobal(userId) {
    try {
        let projects = [];
        let awardsRef = collection(db, 'project');
        let q = query(awardsRef, where('user_id', '==', userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            projects.push(doc.data());
        });
        return projects;
    } catch (error) {
        console.log(error);
    }
}


export async function hobbiesGlobal(userId) {
    try {
        let hobbies = [];
        let hobbiesRef = collection(db, 'hobbies');
        let q = query(hobbiesRef, where('user_id', '==', userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            hobbies.push(doc.data());
        });
        return hobbies;
    } catch (error) {
        console.log(error);
    }
}

export async function referencesGlobal(userId) {
    try {
        let references = [];
        let referencesRef = collection(db, 'references');
        let q = query(referencesRef, where('user_id', '==', userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            references.push(doc.data());
        });
        return references;
    } catch (error) {
        console.log(error);
    }
}