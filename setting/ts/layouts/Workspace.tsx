import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback } from 'react';
import { Redirect } from 'react-router';
import useSWR from 'swr'

interface Props {
    children: JSX.Element[] | JSX.Element
  }

const Workspace = ({children}:Props) => {
    const {data,error,mutate} = useSWR('http://localhost:3095/api/users',fetcher);//url이 fetcher 로 넘어감
    const onLogout = useCallback(() => {
        axios.post('http://localhost:3095/api/users/logout',null,{
            withCredentials:true,
        })
        .then(() => {
            mutate(false)
        })
    },[])

    if(!data){
        <Redirect to="/login"/>
    }
    return (
        <button onClick={onLogout}>
            로그아웃
        </button>
    );
};

export default Workspace;