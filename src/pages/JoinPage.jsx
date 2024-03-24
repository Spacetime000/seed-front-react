import React, { useState } from 'react'
import Background from '../components/Background'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JoinPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    nickname: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${process.env.REACT_APP_BASE_URL}/register`, formData)
    .then((res) => {
      alert("회원가입 완료");
      navigate("/login", {replace: true})
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data);
      } else {
        alert("전송 실패");
      }
      
    })
  }

  return (
    <div>
      <Background />
      <div className='flex flex-col justify-center px-[40px] py-[50px] rounded-xl shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 backdrop-invert backdrop-opacity-10 w-[400px] h-[500px]"'>
        <h1 className="drop-shadow-[0_2px_2px_rgba(0,0,0)] mb-10 text-3xl text-white font-['SejonghospitalBold'] text-center">회원가입</h1>
        <input 
          className={`px-6 py-3 rounded-xl border-2 ${errors.username ? 'border-red-500' : ''}`}
          name='username'
          type="text" 
          placeholder='아이디(영소문자와 숫자로 6~20자)'
          value={formData.username}
          onChange={handleChange}
        />
        <small className={`ml-3 mb-5 text-[#ff0000] ${errors.username ? '' : 'invisible'}`}>{errors.username}</small>
        
        <input
          type='password'
          name='password'
          placeholder='비밀번호(9~20자)'
          className={`px-6 py-3 rounded-xl border-2 ${errors.password ? 'border-red-500' : ''}`}
          value={formData.password}
          onChange={handleChange}
        />
        <small className={`ml-3 mb-5 text-[#ff0000] ${errors.password ? '' : 'invisible'}`}>{errors.password}</small>

        <input
          type='text'
          name='nickname'
          placeholder='닉네임(2~10자)'
          className={`px-6 py-3 rounded-xl border-2 ${errors.nickname ? 'border-red-500' : ''}`}
          value={formData.nickname}
          onChange={handleChange}
        />
        <small className={`ml-3 mb-5 text-[#ff0000] ${errors.nickname ? '' : 'invisible'}`}>{errors.nickname}</small>

        <input
          type='email'
          name='email'
          placeholder='이메일'
          className={`px-6 py-3 rounded-xl border-2 ${errors.email ? 'border-red-500' : ''}`}
          value={formData.email}
          onChange={handleChange}
        />
        <small className={`ml-3 mb-5 text-[#ff0000] ${errors.email ? '' : 'invisible'}`}>{errors.email}</small>

        <button onClick={handleSubmit}>가입하기</button>
      </div>
    </div>
  )
}

export default JoinPage