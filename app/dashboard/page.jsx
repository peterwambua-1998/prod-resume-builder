'use client'
import { useEffect, useState } from 'react';
import { Card, Button } from 'react-daisyui';
import { auth, db } from '@/app/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where, getDoc, getDocs, onSnapshot, Timestamp,doc } from "firebase/firestore";
import Link from 'next/link';

const Dashboard = () => {

    return (  
        <main className="p-5">
            <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-3 md:gap-8">
                <Link href={'/dashboard/cv-create/proceed'}>
                    <Card>
                        <Card.Body>
                            <Card.Title tag="h2">Curriculum vitae</Card.Title>
                            <p>View your curriculum vitae</p>
                        </Card.Body>
                    </Card>
                </Link>
                <Card>
                    <Card.Body>
                        <Card.Title tag="h2">Resume</Card.Title>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title tag="h2">Cover letter</Card.Title>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                    </Card.Body>
                </Card>
            </div>
            

        </main>
    );
}
 
export default Dashboard;