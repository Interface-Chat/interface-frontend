import React, { useEffect, useState } from "react";

// hooks
import { useRedux } from "../../../hooks/index";

// components
import Loader from "../../../components/Loader";
import AppSimpleBar from "../../../components/AppSimpleBar";
import MyProfile from "./MyProfile";
import UserDescription from "./UserDescription";
import Media from "../../../components/Media";
import AttachedFiles from "../../../components/AttachedFiles";

// actions
import { getProfileDetails } from "../../../redux/actions";

import axios from "axios";
const apiUrl = 'http://localhost:3001/auth/profile';


interface User {
  roles: any;
  displayName: string;
  // Add other properties as needed
}

interface IndexProps {}
const Index = (props: IndexProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authUser');
      const tokenObj = token ? JSON.parse(token) : null;

      if (!tokenObj) {
        console.error('No token found in localStorage');
        // Handle the absence of a token, such as redirecting to the login page
      } else {
        const headers = {
          'Authorization': `Bearer ${tokenObj.access_token}`,
          'Content-Type': 'application/json',
        };

        try {
          const response = await axios.get(apiUrl, { headers });
          setUser(response.data as User);
          console.log('User profile:', response);
        } catch (error) {
          console.error('Error retrieving user profile:', error);
        }
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once

  console.log(user);
  
  // global store
  const { dispatch, useAppSelector } = useRedux();

  const { profileDetails, getProfileLoading, isProfileFetched } =
    useAppSelector(state => ({
      profileDetails: state.Profile.profileDetails,
      getProfileLoading: state.Profile.getProfileLoading,
      isProfileFetched: state.Profile.isProfileFetched,
    }));

  // get user profile details
  useEffect(() => {
    dispatch(getProfileDetails());
  }, [dispatch]);

  return (
    <div className="position-relative">
      {getProfileLoading && !isProfileFetched && <Loader />}
      
      <MyProfile user={user!} basicDetails={profileDetails.basicDetails} />

      <AppSimpleBar className="p-4 profile-desc">
        <UserDescription user={user!} basicDetails={profileDetails.basicDetails} />
        <hr className="my-4" />

      </AppSimpleBar>
    </div>
  );
};

export default Index;
