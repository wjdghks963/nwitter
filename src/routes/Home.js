import Nweet from "components/Nweet";
import { dbService, storageService } from "myBase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  // async await을 쓰는 함수가 useEffect에 포함되면 안되기 때문에 밖에서 정의하고 넣어준다
  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      // snapshot.docs에 대해 모든 document에 대하여 배열로 반환함
      const newArray = snapshot.docs.map((document) => ({
        // id와 예전 document.data()==document의 data는 즉, createAt, creatorId, text ... 까지 다 Object형태로
        id: document.id,
        ...document.data(),
      }));
      setNweets(newArray);
    });
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {/* map을 이용해서 nweet의 id(문서의 id)를 받아 value인 text를 나오게함, isOwner는  nweet를 생성한 유저와 로그인한 유저가 같은 사람이다 */}
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
