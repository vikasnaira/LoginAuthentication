import React, { useRef } from "react";
import gsap from "gsap";
import  { useState, useEffect } from 'react';
import Input from './Input';
import { FaGoogle , FaLinkedin , FaGithub,FaArrowRight, FaFacebookSquare  } from "react-icons/fa";

function UserForm() {

  const dataRef  = useRef(null)
  const data2Ref = useRef(null)
  const boxRerf = useRef(null);
  const [move, setmove] = useState(false)
  const [roundedLeft, setRoundedLeft] = useState(true);
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');


  const change = ()=>{

      gsap.to(boxRerf.current,{
        borderRadius: roundedLeft ? "0px 100px 100px 0px" : "100px 0px 0px 100px", 
        x:move ? 0 : '-100%',
        duration:.3,
        ease:'Power2.inOut' ,
        delay:.4,
      })
      gsap.to(dataRef.current,{
        x:move ? 0 : '100%',
        duration :.3,
        opacity:move ? 1 :0,
        ease:'Power2.inOut' ,
        delay:.4,
      })
      
      gsap.to(data2Ref.current,{
      x:move ? 0 : '100%',
      duration :.3,
      opacity:move ? 0 :1,
      zIndex:move ? -10 :'1',
      ease:'Power2.inOut' ,
      delay:.4,
    })
    
    

    setRoundedLeft(!roundedLeft)
    setmove(!move);
   
  }
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setname] = useState("")
  const [password, setPassword] = useState('');


  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);




  const handleAddUser = () => {
    if(!name ){
      alert("Please enter your name ")
    }
    else if(!email){
      alert("Please check email.");
      return;
    }
  else if(!password){
      alert("Please check password the sections.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email.");
      return;
    }
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert("sign up succesful")
    setEmail('');
    setname('')
    setPassword('');
  };
 
  // login matchData


  const handleLogin = () => {
  const matchedUser = users.find(
  (user) => user.name === loginName && user.password === loginPassword
  );

  

  if (matchedUser) {
    alert(`Welcome back, ${matchedUser.name}!`);    
  } else {
    alert('Invalid login credentials!');
  }
};




  return (
    <div className="cont md:w-[70vw] w-[90vw] bg-gray-200/30 backdrop-blur-2xl   flex-col md:items-start items-center justify-center h-[70vh] rounded-2xl relative flex overflow-hidden">
      <div className="justify-center items-center gap-2 flex-col flex w-1/2 "ref={dataRef}>
         <h2 className='p-2 text-black md:text-3xl text-xl text-nowrap font-bold '>Create Account</h2>
          <div className="flex text-4xl gap-2">
          <FaGithub  className="md:p-2 rounded md:text-4xl border-1  text-2xl p-1  hover:bg-black hover:text-white transition-all"/>
          <FaFacebookSquare  className="md:p-2 rounded md:text-4xl   text-2xl p-1   border-1 hover:bg-black hover:text-white  transition-all"/>
          <FaGoogle className="md:p-2 rounded border-1 md:text-4xl   text-2xl p-1 hover:bg-black hover:text-white  transition-all" />
          <FaLinkedin className="border-1 md:p-2 rounded md:text-4xl text-2xl p-1   hover:bg-black hover:text-white  transition-all"/>
        </div>
          <Input
            placeholder="Name"
            value={name}
            type='text'
            onChange={(e) => setname(e.target.value)}
        />
            <Input  
            value={email} 
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password"
            type='password'
            className='p-2 border-1' />
      <button onClick={handleAddUser} className='bg-blue-950   text-white md:py-2 py-1  cursor-pointer px-7 gap-2 rounded-lg'>SIGN IN</button>
      <button className=" bg-blue-950 border-1 md:hidden block text-white  border-none md:border-white px-10 rounded-lg   py-1 cursor-pointer  " onClick={change} >login</button>
      </div>

      <div className="flex justify-center  flex-col h-full absolute gap-2 items-center md:left-0 right-[100%] w-full md:w-1/2 opacity-0 -z-10" ref={data2Ref}> 
        <h1 className="text-2xl font-bold ">LOG IN</h1>
        {/* login process */}

         <div className="flex text-4x gap-2">
          <FaGithub  className="md:p-2 rounded   md:text-4xl text-2xl p-1  border-1 hover:bg-black hover:text-white transition-all"/>
          <FaFacebookSquare  className="md:p-2   md:text-4xl text-2xl p-1   rounded border-1 hover:bg-black hover:text-white  transition-all"/>
          <FaGoogle className="md:p-2 rounded    md:text-4xl text-2xl p-1   border-1 hover:bg-black hover:text-white  transition-all" />
          <FaLinkedin className="border-1 md:p-2 md:text-4xl text-2xl p-1   rounded hover:bg-black hover:text-white  transition-all"/>
        </div>

          <Input placeholder="Enter your name"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
            />


          <Input placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          />
       <h3>Forget password</h3>
      <button className=" bg-blue-950 border-1 md:hidden block text-white   border-none md:border-white px-10 rounded-lg   py-1 cursor-pointer  " onClick={change} >sign in</button>
      <button onClick={handleLogin} className='bg-blue-950 text-white md:py-2 py-1 px-11 cursor-pointer md:px-8 gap-2 rounded-lg'>Login</button>
      </div>

      <div 
      className="box  absolute px-10 gap-3  text-white h-full w-1/2  flex-col bg-blue-950 hidden md:flex justify-center items-center rounded-l-[100px] right-0 "
      ref={boxRerf}
      style={{boxShadow:" inset -0px 1px 10px white"}}
       >
        <h1 className="text-3xl font-bold">WELCOME BACK! </h1>
        <p className="text-center ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, amet!</p>
      <button className=" bg-blue-950 border-1  border-white px-5 rounded-xl py-2 cursor-pointer hover:bg-white hover:text-blue-950 transition-all duration-300" onClick={change} >click me</button>
      </div>
    </div>
  );
}

export default UserForm;
