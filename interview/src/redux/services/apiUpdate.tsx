import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 
type message = {
    id:number,
    mail:string,
    body:string
}
export const requireUpdate = createApi({
    reducerPath:'updateApi',
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.NEXT_PUBLIC_API,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints:(builder)=>({
        updateElement:builder.mutation<void, message>({
            query:(editMessage)=>({
                url:`/form/${editMessage.id}`,
                method:'PUT',
                body:JSON.stringify({
                    mail:editMessage.mail, body:editMessage.body
                })
            })
        })
    }),
});
export const { useUpdateElementMutation } = requireUpdate;