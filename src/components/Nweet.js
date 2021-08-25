import { dbService } from "myBase";
import React, { useState } from "react";

const Nweet = ({nweetObj, isOwner})=> {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
   const onDeleteClick = ()=>{
       const ok = window.confirm("Are you sure you want to delete this nweet?");
       if( ok ){
        dbService.doc(`nweets/${nweetObj.id}`).delete();
       }
   };
   const toggleEditing = () => setEditing((prev) => !prev);
   const onSubmit = (event)=>{
    event.preventDefault();
   };
   const onChange = (event)=> {
       const{ target:{value},
    }=event;
    setNewNweet(value);
   };
    return (
    
        <div>
             {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
        </div>
    );
}

export default Nweet;