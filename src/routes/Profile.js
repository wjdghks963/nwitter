import { authService } from "myBase";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
  // 브라우저의 history를 사용함
  const history = useHistory();
  // history에 pushState를 이용해 로그아웃 후 홈으로 보낸다
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
