import Nweet from "components/Nweet";
import { dbService } from "myBase";
import React, { useEffect, useState } from "react";

const Home = ({ usetObj }) => {
  const [nweet, setNweet] = useState("");

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
