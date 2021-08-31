import Nweet from "components/Nweet";
import { dbService, storageService } from "myBase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  /* const getNweets = async () => {
      const dbNweets = await dbService.collection("nweets").get();
      
      dbNweets.forEach((document) => {
        const nweetObject = { ...document.data(), id: document.id };
      !! 예전 데이터와 document.data를 배열에다 넣어줌 이전 상태를 매개변수로 제공하는 setState 기능을 이용한다.
        setNweets((prev) => [nweetObject, ...prev]);
      });
    };*/

  const onSubmit = async (event) => {
    event.preventDefault();

    let attachmentUrl = "";

    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url"); // putString은 url을 인자로 전달하기만 하면 해당 파일이 스토리지에 바로 저장된다.
      attachmentUrl = await response.ref.getDownloadURL(); // 파일을 다운로드할 수 있는 스토리지의 URL반환
    }
    await dbService
      .collection("nweets") // db에 nweets라는 collection 생성
      .add({
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
      }); // 해당 문서 생성 (text,createdAt....)

    setNweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    // file을 input에 올릴때는 event.target.files에서 찾는다.
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader(); // 브라우저 API, new와 함께 사용한다.
    // onloadend는 readAsDataURL함수에 전달할 인자가 결과값으로 나온 다음 상황을 감지하고 생성된 이벤트값을 사용할 수 있게 해준다.
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile); // readAsDataUrl은 파일 정보를 인자로 받아 파일 위치를 URL로 반환해 준다.
  };

  const onClearAttachment = () => setAttachment("");

  return (
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Nweet" />
      {/* attachment가 준비 됐을때 오른쪽 html 보이고 onClear누르면 사진 초기화 */}
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
