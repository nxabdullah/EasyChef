import { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import useToken from '../hooks/useToken';
import ProfileDetailsCard from '../components/profile/ProfileDetailsCard';

function EditProfile({account, setAccount}) {

  
  return (
        <>
          <ProfileDetailsCard account={account} setAccount={setAccount} />

        </>
  );
}

export default EditProfile;
