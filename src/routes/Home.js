import Nweet from "components/Nweet";
import { dbService } from "myBase";
import React, { useEffect, useState } from "react";


const Home = ({usetObj})=>{
    const[nweets,setNweets] = useState([]);
useEffect(()=>{   
    dbService.collection("nweet").onSnapshot((snapshot)=>{
        const nweetArray = snapshot.docs.map((doc)=>({
            id: doc.id,
            ...doc.data()
        }));
        setNweets(nweetArray);
    });
},[]);

    return (
<div>
    <form>
        <input value ={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
        <input type="submit" value="Nweet"  />
    </form>
    <div>
        {nweets.map((nweet) => (
            <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId=== userObj.uid}/>
        ))}
    </div>
</div>
);
        };
        
export default Home;
