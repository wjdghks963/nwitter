import Nweet from "components/Nweet";
import { dbService } from "myBase";
import React, { useEffect, useState } from "react";

const Home = ({ usetObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const dbNweets = await dbService.collection("nweets").get();
    // dbNweets에 대해 모든 document에 대하여 배열을 반환함
    dbNweets.forEach((document) => {
      const nweetObject = { ...document.data(), id: document.id };
      // 예전 데이터와 document.data를 배열에다 넣어줌 이전 상태를 매개변수로 제공하는 setState 기능을 이용한다.
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };

  // async await을 쓰는 함수가 useEffect에 포함되면 안되기 때문에 밖에서 정의하고 넣어준다
  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService
      .collection("nweets") // db에 nweets라는 collection 생성
      .add({ text: nweet, createdAt: Date.now }); // 해당 문서 생성 (text,createdAt)
    setNweet("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="submit" value="Nweet" />
    </form>
  );
};

export default Home;
