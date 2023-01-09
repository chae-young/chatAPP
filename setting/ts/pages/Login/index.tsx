import useInput from '@hooks/useInput';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Error, Form, Header, Input, Label, LinkContainer, Success } from '../SignUp/style';
import useSWR from 'swr'
import fetcher from '@utils/fetcher';

const Login = () => {
    const {data,error,mutate} = useSWR('http://localhost:3095/api/users',fetcher);//url이 fetcher 로 넘어감
    const [email,onChangeEmail,setEmail] = useInput('');
    const [password,onChangePassword,setPassword] = useInput('');
    const [logInError,setLoginError] = useState(false)

    const onSubmit = useCallback((e)=>{
        e.preventDefault();
        setLoginError(false)
        axios.post('http://localhost:3095/api/users/login',{
            email,password
        },{
            withCredentials:true
        })
        .then((response) => {
            //요청다시 안보내고 내정보 저장
            mutate(response.data)
        })
        .catch((error) => {
            setLoginError(error.response?.data?.statusCode === 401)
        })
        .finally(() => { //성공 실패 둘다의 경우

        })
        
    },[email,password])

    if(data === undefined){
      return <div>로딩중!</div>
    }

    //로그인 데이터 들어오면
    if(data){
      return <Redirect to="/workspace/channel"/>
    }

    return (
        <div id="container">
          <Header>Sleact</Header>
          <Form onSubmit={onSubmit}>
            <Label id="email-label">
              <span>이메일 주소</span>
              <div>
                <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
              </div>
            </Label>
            <Label id="password-label">
              <span>비밀번호</span>
              <div>
                <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
              </div>
              {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
            </Label>
            <Button type="submit">로그인</Button>
          </Form>
          <LinkContainer>
            아직 회원이 아니신가요?&nbsp;
            <Link to="/signup">회원가입 하러가기</Link>
          </LinkContainer>
        </div>
    );

};

export default Login;