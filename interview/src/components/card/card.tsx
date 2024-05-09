"use client";
import { setShowAlert } from "@/redux/features/alertSlice";
import { useGetMessagesQuery } from "@/redux/services/apiRequest";
import { useDispatch } from "react-redux";
import { saveEdit } from "@/redux/features/editSlice";
export default function Card(){
    // iterate
    const {data, error, isLoading, isFetching, } = useGetMessagesQuery(null);
    console.log(data);
    //setting visibility and handling delete query
    const dispatch = useDispatch();
    const handleDelete = (id:number) =>{
        dispatch(setShowAlert({isVisible:true, itemId:id}));
    }
    const handleEdit = (id:number, mail:string, body:string) =>{
        dispatch(saveEdit({isVisible:true, id:id, mail:mail, body:body}));
    };
    return(
        <>
        <section>
            {/* iterate div */}
            {isLoading || isFetching?(
                <p className="flex justify-center">Loading...</p>
            ):error?
                (<p className="flex justify-center">Unexpected Error retrieving data, please reload this page</p>):
                (data?.map((data, index)=>(
                    <div key={index} className="bg-gray-300 m-3 rounded-lg p-2 shadow-lg ">
                    <h3 className=" flex justify-center p-1 border-b-2 border-gray-800 text-indigo-900">{data.mail}</h3>
                    <p className="p-1 ">{data.body}</p>
                    {/* espace between */}
                    <div className="select-none  p-2 flex justify-around">
                        <button onClick={()=>(handleEdit(data.id, data.mail, data.body))} className="bg-yellow-300 p-2  pl-6 pr-6 rounded-lg shadow-md hover:bg-yellow-400">
                            edit
                        </button>
                        <button className="bg-red-400 p-2  pl-6 pr-6 rounded-lg shadow-md hover:bg-red-500" onClick={()=>handleDelete(data.id)}>
                            delete
                        </button>
                    </div>
                </div>
                )))
        }
        </section>
        
        </>

    );
}