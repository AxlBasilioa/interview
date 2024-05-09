"use client";

import { hideAlert, setShowAlert } from "@/redux/features/alertSlice";
import { useAppSelector } from "@/redux/hooks";
import { useDeleteDataMutation } from "@/redux/services/apiDelete";
import { useDispatch } from "react-redux";
import { useGetMessagesQuery } from "@/redux/services/apiRequest";


export default function Alert(){
    const { refetch } = useGetMessagesQuery(null);
    const { isVisible, itemId } = useAppSelector(state => state.alert);
    const dispatch = useDispatch();
    const [deleteData] = useDeleteDataMutation();

    const handleDeleteConfirm = async () => {
        await deleteData(itemId).unwrap().then(() => refetch());
        dispatch(hideAlert());
    };
    const cancelDelete = () => {
        dispatch(setShowAlert({isVisible:false, itemId:null}));
}
    if (!isVisible) return null;
    return(
        <div  className=" select-none absolute text-black  z-10 bg-gray-200 p-5 rounded-lg shadow-2xl shadow-inner">
            ¿Estas seguro de eliminar este Elemento?
            <div className="p-3 flex flex-row justify-between">
                <button onClick={handleDeleteConfirm} className="bg-green-500 p-3 pl-6 pr-6 text-white rounded-md shadow-md hover:bg-green-600">Si</button>
                <button onClick={cancelDelete} className="bg-red-400 p-3 pl-6 pr-6 text-white rounded-lg shadow-md hover:bg-red-500">No</button>
            </div>
        </div>
    )
}