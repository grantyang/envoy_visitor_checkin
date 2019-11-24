import React, { useState } from 'react';
import moment from 'moment';

import Button from './Button';
import { signOutVisitor } from '../utils.js';

export default function SignoutButton({ userId, signOut }) {
  const formattedSignOut = signOut
    ? moment(signOut).format('MM/DD/YYYY, h:mma')
    : '';
  const [isLoading, setIsLoading] = useState(false);
  const [outTime, setOutTime] = useState(formattedSignOut);

  const handleSignOut = () => {
    setIsLoading(true);
    signOutVisitor(userId)
      .then(res => {
        const signOutTime = res.data.data.attributes.sign_out;
        const formattedTime = moment(signOutTime).format('MM/DD/YYYY, h:mma');
        setOutTime(formattedTime);
        setIsLoading(false);
      })
      .catch(err => {
        console.log('there was an error');
        setIsLoading(false);
      });
  };

  const renderSignOut = () => {
    if (isLoading) {
      return (
        <Button
          className="sign-out-button-loading"
          buttonText="Signing Out..."
        />
      );
    } else if (outTime) {
      return (
        <Button
          className="sign-out-time"
          buttonText={`Signed out at: ${outTime}`}
        />
      );
    } else {
      return (
        <Button
          className="sign-out-button"
          buttonText="Sign Out"
          onClick={handleSignOut}
        />
      );
    }
  };
  return <div>{renderSignOut()}</div>;
}
