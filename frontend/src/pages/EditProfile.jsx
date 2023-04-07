import { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import useToken from '../hooks/useToken';
import ProfileDetailsCard from '../components/profile/ProfileDetailsCard';
import ProfilePasswordCard from '../components/profile/ProfilePasswordCard';

function EditProfile({account, setAccount}) {

  
  return (
        <>
          <ProfileDetailsCard account={account} setAccount={setAccount} />
          <ProfilePasswordCard />
        </>
  );
}

export default EditProfile;
