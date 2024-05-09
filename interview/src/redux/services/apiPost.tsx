import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 

type message = {
    mail: string,
    body: string
};

export const PostApi = createApi({
    reducerPath: 'PostApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.NEXT_PUBLIC_API
    }),
    endpoints: (builder) => ({
        addMessage: builder.mutation<void, message>({
            query: (newMessage) => ({
                url: '/form',
                method: 'POST',
                body: newMessage
            }),
        }),
    })
});

export const { useAddMessageMutation } = PostApi;
