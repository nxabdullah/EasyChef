import React, {useState} from 'react'
import axios from 'axios';
import CustomCard from '../shared/CustomCard'
import { ACCOUNT_ENDPOINT } from '../../config/constants'
import useToken from '../../hooks/useToken';

// takes account state
function ProfileDetailsCard({account}) {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({});


    const {token} = useToken()
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;



    return (
    <CustomCard Title={`Profile`}>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form className="row">


            <div className="col-md-6 mt-4">
                <label className="form-label">First Name</label>
                <input type="text" name="first_name" className="form-control" value={account && account.first_name} placeholder="Enter your first name" />
                {errors.first_name && <small className="text-danger">{errors.first_name[0]}</small>}
            </div>

            <div className="col-md-6 mt-4">
                <label className="form-label">Last Name</label>
                <input type="text" name="last_name" className="form-control" value={account && account.last_name} placeholder="Enter your last name"/>
                {errors.last_name && <small className="text-danger">{errors.last_name[0]}</small>}
            </div>

            <div className="col-md-6 mt-4">
                <label className="form-label">Email Address</label>
                <input type="email" name="email" className="form-control" value={account && account.email}  />
                {errors.email && <small className="text-danger">{errors.email[0]}</small>}
            </div>

            <div className="col-md-6 mt-4">
                <label className="form-label">Phone Number</label>
                <input type="text" name="phone_number" className="form-control" value={account && account.phone_number} placeholder="Enter your mobile number" />
                {errors.phone_number && <small className="text-danger">{errors.phone_number[0]}</small>}

            </div>

            <div className="col-12 text-end">
                <button className="btn btn-primary btn-primary-c mb-0 mt-4">Save</button>
            </div>
        </form>
    </CustomCard>
  )
}

export default ProfileDetailsCard