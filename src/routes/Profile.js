import { authService } from "myBase";
import React,{useState} from "react";
import{useHistory} from "react-router-dom";



export default()=>{
    const onLogOutClick = () => {
        authService.signOut();
       window.history.pushState("/");
    };
    return <>
    <button onClick={onLogOutClick}>Log Out</button>
    </>
};