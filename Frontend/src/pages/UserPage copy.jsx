import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Footer from '../components/Footer';
import NavMain from '../components/NavMain';
import UserPageCPT from '../components/UserPageCPT'

const UserPage = () => {

  return (
    <>
      <NavMain logout={<FontAwesomeIcon icon={faRightFromBracket} />} />
      <UserPageCPT />
      <Footer />
    </>
  );
};

export default UserPage;