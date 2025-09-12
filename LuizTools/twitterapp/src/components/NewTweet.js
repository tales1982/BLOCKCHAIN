"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addTweet } from "@/services/Web3Service";



export default function NewTweet() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const { push } = useRouter();

  function btnPublishClick() {
    setMessage("Publishing...");
    addTweet(text)
      .then( result => {
        setText("");
        setMessage("Published!");
      })
      .catch( error => {
        console.error(error);
        setMessage(error.message);
      });
  }

  useEffect(() => {
    const Wallet = localStorage.getItem("Wallet");
    if (!Wallet) push("/");
  },[]);

  return (
    <>
      <div className="top">
        <div className="left">
          <img src="/tweet.webp" alt="avatar" className="brand" />
        </div>
        <h1>Welcome</h1>
        <p className="title">What's happening?</p>
        <textarea className="form-control my-3" value={text} onChange={evt => setText(evt.target.value)}></textarea>
        <div className="bottom">
          <input type="button" onClick={btnPublishClick} className="btn btn-primary" value="tweet"/>
    
          
          <span className="message">{message}</span>
        </div>
      </div>
    </>
  );
}
