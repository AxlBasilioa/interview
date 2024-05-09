import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 
// data structure for my query GET
type message = {
    id:number,
    mail:string,
    body:string
}
//create the getter method
export const RequestApi = createApi({
    reducerPath:'getterApi',
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.NEXT_PUBLIC_API
    }),
    //responses by 2 queries (get all or get one element by id, this might be work for edit an element)
    endpoints:(builder)=>({
        // getting all elements from my api
        getMessages:builder.query<message[], null>({
            query:()=>'/form'
        }),
        getMessageById:builder.query<message, {id:number}>({
            query:({id})=>`/form/${id}`
        }),
    })
});
export const { useGetMessagesQuery, useGetMessageByIdQuery } = RequestApi;
