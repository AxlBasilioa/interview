"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMail } from "@/redux/features/formSlice";
import { saveEditMail } from "@/redux/features/editSlice";
interface MailFormProps {
    props: string;
    reload:number;
}
export default function MailForm({props, reload}:MailFormProps){
    const dispatch = useDispatch();
    //just local component for feedback colors simple UI/UX
    //email will be used for storage.tsx
    const [email, setEmail] = useState(props);
    const [isValid, setIsValid] = useState(false);
    //this is a general regex for mail
    const validateEmail = (email:string)=>{
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            return regex.test(email);
        }
        // with every change, just check the value
        const handleInputChange = (event:any) =>{
            const newEmail = event.target.value;
            setEmail(newEmail);
            setIsValid(validateEmail(newEmail));
        }
        useEffect(()=>{
            setEmail(props);
        },[reload]);
        useEffect(()=>{
            // in case of valid mail, save it to local and prepare everything to send it
            if(validateEmail(email)){
                dispatch(setMail({mail:email}));
                dispatch(saveEditMail({ mail: email }));
            }
        },[email]);
    return(
        <input type="email" placeholder="Email" value={email} onChange={handleInputChange}
                className={`h-10 m-4 rounded-md w-full p-2 shadow-lg 
                mt-1 border border-slate-300 outline-none  ${isValid? ' bg-green-100 focus:bg-green-200 hover:bg-green-200':'bg-red-100 focus:bg-red-200 hover:bg-red-200'}`}></input>

    );
}