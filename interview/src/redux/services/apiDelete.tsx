import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 

export const RequestDelete = createApi({
    reducerPath:'deleteApi',
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.NEXT_PUBLIC_API
    }),
    endpoints:(builder)=>({
        deleteData:builder.mutation<number, null>({
            query:(id)=>({
                url:`/form/${id}`,
                method:'DELETE'
            }),
            
        }),
    }),
});
export const { useDeleteDataMutation } = RequestDelete;