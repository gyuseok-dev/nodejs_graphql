import React from 'react';

const User = (props) => {
  const { user } = props;
  return (
    <div>
      <div>
        이름:{user.name} 이메일:{user.email}
      </div>
    </div>
  );
};

export default User;