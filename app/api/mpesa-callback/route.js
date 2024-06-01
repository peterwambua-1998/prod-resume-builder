import { db } from "@/app/firebase/firebase";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";

export async function POST(req, res) {
    try {
        // get data from mpesa
        let response = await req.json();
        let data = response;


        let MerchantRequestID = data.Body.stkCallback.MerchantRequestID;
        let CheckoutRequestID = data.Body.stkCallback.CheckoutRequestID;
        let amount = data.Body.stkCallback.CallbackMetadata.Item[0].Value;

        console.log(MerchantRequestID, CheckoutRequestID, amount);
        const docRef = doc(db, "subscription-mpesa-payments", MerchantRequestID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            updateDoc(docRef, {
                amount: amount,
            });
        }
        return new Response(1);
    } catch (error) {
        console.log(error);
        return new Response(0, {status: 500});
    }
}