
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {

  const [users, setUsers] = useState([]);
  

  
  const user_data = (event) =>{
      event.preventDefault();
      const form = event.target;
      const name = form.name.value;
      const email = form.email.value;
      const user = {name,email}
      console.log(user)
      fetch('http://localhost:5000/users',{
        method:'POST',
        headers:{
          'content-type' : 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res =>res.json())
      .then(data =>{
       const nuwUsers = [...users,data]
setUsers(nuwUsers);
form.reset();
      })
  }

  useEffect(() =>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data =>setUsers(data))
  },[])

  return (
    <>
     <h1>User Management Client {users.length}</h1>
     <form onSubmit={user_data}>
      name: <br />
      <input type="text" name="name" /><br />
      email: <br />
      <input type="email" name="email"/><br />
     
      <input type="submit" value="Add User"/>
     </form>
    <div>
      {users.map(user =><p key={user.id}>{user.id} : {user.name} : {user.email}</p>)}
    </div>

    </>
  )
}

export default App

