"use client";
import MailForm from "../mailForm/MailForm";
import { setBody, clearData } from "@/redux/features/formSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAddMessageMutation } from "@/redux/services/apiPost";
import { useAppSelector } from "@/redux/hooks";
import { useGetMessagesQuery } from "@/redux/services/apiRequest";

export default function Form(){
    const { refetch } = useGetMessagesQuery(null);
    const dispatch = useDispatch();
    const { mail, body } = useAppSelector(state => state.form);
    const [addMessage] = useAddMessageMutation();
    const [reload, setReload] = useState(0);
    const [text, setText] = useState('');
    useEffect(()=>{
        dispatch(setBody({body:text}));
    }, [text]);
    const handleAddingMessages = async ()=>{
        if(mail && body){
            await addMessage({mail, body}).unwrap().then(()=>{
                refetch();
                dispatch(clearData(null));
                setText('');
                setReload(prev => prev + 1);
            });
            
        }
    }
    return(
        <section>
            <p className="text-gray-700 select-none flex justify-center">CRUD interview</p>
            <div className="flex flex-col items-center m-2">
                <MailForm reload={reload} props=''/>
                {/* multi-line input */}
                <textarea rows={4} placeholder="Text" 
                className="h-20 m-4 rounded-md p-2 w-full shadow-lg 
                mt-1 hover:bg-slate-200" value={text} onChange={e=>(setText(e.target.value))}></textarea>
                {/* custom button */}
                <button onClick={handleAddingMessages} className="select-none bg-green-500 w-fit p-3 pl-6 pr-6 rounded-xl text-white font-bold shadow-md hover:shadow-2xl hover:bg-green-600">Add</button>
            </div>
        </section>
    )
}
//