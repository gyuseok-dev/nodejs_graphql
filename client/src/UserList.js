import React, {useState} from 'react';
import User from './User';
import { useQuery, useMutation, gql } from '@apollo/client';

const USER_QUERY = gql`
{
  users {
      name,
      email
  }
}
`;

const ADD_USER = gql`
mutation ($email: String!, $name: String!) {
    createUser(email:$email, name:$name) {
        id
    }
}
`;

const UserList = () => {
  const { data } = useQuery(USER_QUERY);    
  const [addUser] = useMutation(ADD_USER);
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleClick = () => {
    addUser({variables: {email:email, name:name}})
  };

  return (
    <div>
      {data && (
        <>
          {data.users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </>
      )}
        <div>
            <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email"
            />
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="name"
            />
        </div>
        <div>
            <button onClick={handleClick}> 생성 </button>
        </div>
    </div>
  );
};


export default UserList;