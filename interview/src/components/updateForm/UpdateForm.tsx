"use client";

import MailForm from "../mailForm/MailForm";
import { useDispatch } from "react-redux";
import { useUpdateElementMutation } from "@/redux/services/apiUpdate";
import { saveEdit, clearData } from "@/redux/features/editSlice";
import { useAppSelector } from "@/redux/hooks";
import { useGetMessagesQuery } from "@/redux/services/apiRequest";
import { useEffect, useState } from "react";

export default function UpdateForm(){
    const { refetch } = useGetMessagesQuery(null);
    const { isVisible, id, mail, body } = useAppSelector(state => state.edit);
    const dispatch = useDispatch();
    const [ updateElement ] = useUpdateElementMutation();
    const [localMail, setLocalMail] = useState(mail);
    const [localBody, setLocalBody] = useState(body);
    useEffect(() => {
        setLocalMail(mail);
        setLocalBody(body);
        saveEdit({ id, mail: localMail, body: localBody });
    }, [mail, body]);
    const handleUpdateConfirm = async () => {
        await updateElement({ id, mail: localMail, body: localBody }).unwrap().then(() => refetch());
        dispatch(clearData(null));
    };

    const cancelUpdate = () => {
        dispatch(clearData(null));
    };

    if (!isVisible) return null;
    return(
        <div className="absolute text-black bg-slate-300text-black  z-10 bg-gray-200 p-2  rounded-lg shadow-2xl shadow-inner top-2/5">
            <div className="flex flex-col items-center m-2">
            Crud Edit Form
            <MailForm props={mail} reload={0}/>
            <textarea rows={4} placeholder="Text" 
                className="h-20 m-4 rounded-md p-2 w-full shadow-lg 
                mt-1 hover:bg-slate-200" value={localBody} onChange={(e)=>(setLocalBody(e.target.value))} ></textarea>
                <div className="select-none  flex justify ">
                    <button onClick={handleUpdateConfirm} className="bg-green-300 p-2  pl-6 pr-6 rounded-lg shadow-md hover:bg-green-400">
                        Save
                    </button>
                    <button onClick={cancelUpdate} className="bg-red-400 p-2  pl-6 pr-6 rounded-lg shadow-md hover:bg-red-500">
                        Cancel
                    </button>
                </div>
        </div>
        </div>
        
    );
}