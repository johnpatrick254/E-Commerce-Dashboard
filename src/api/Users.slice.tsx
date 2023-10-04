import { apiGateWay } from "./ApiSlice.slice";
export type UserPostData ={
  first_name:string,
  last_name:string,
  email:string,
  password:string,
  password_confirm:string,
  role_id:string

}
export type UserData ={
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  role: {
      id: number,
      name?: string
  }
}
type GetUsersResponse ={
  data:UserData[],
  meta:{
    total: number,
    page: number,
    lastpage: number
}
}
const userApi = apiGateWay.enhanceEndpoints({addTagTypes:['user']}).injectEndpoints({
  endpoints:builder=>({
    getAllUsers:builder.query<GetUsersResponse,number>({
      query:(page)=>`/api/users?page=${page}`,
      providesTags:['user']
    }),
    getUserById:builder.query<UserData,number>({
      query:(id)=>({url:`api/users/${id}`})
    }),
    createUser:builder.mutation<UserData,UserPostData>({
      query:(data)=>({
        url:`/api/users`,
        method:'post',
        body:data
      })
    }),
    updateUser:builder.mutation<UserData,{id:string,data:Partial<UserPostData>}>({
      query:({id,data})=>({
        url:`/api/users/${id}`,
        method:'put',
        body:data
      })
    }),
    deleteUser:builder.mutation<null,number>({
      query:(id)=>({
        url:`/api/users/${id}`,
        method:'delete',
      })
    }),
  })
})

export const {useGetAllUsersQuery,useGetUserByIdQuery,useCreateUserMutation,useUpdateUserMutation,useDeleteUserMutation} =userApi;