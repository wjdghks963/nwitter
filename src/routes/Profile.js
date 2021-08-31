import { authService } from "myBase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  // 브라우저의 history를 사용함
  const history = useHistory();
  // history에 pushState를 이용해 로그아웃 후 홈으로 보낸다
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  /*
  const [ownNweet, setOwnNweet] = useState([]);

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid) // createrId 필드에서 userObj.uid와 같은 값을 찾기 위함
      .orderBy("createdAt", "asc") // createdAt에 따라 오름차순
      .get();
    // 필터링 된 nweets를 ownNweet에 담아준다.
    setOwnNweet(nweets.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    getMyNweets();
  }, []);
*/

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
    }
    refreshUser();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Dispaly Name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
