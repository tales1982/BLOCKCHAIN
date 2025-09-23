"use client";

import Head from "next/head";
import NewTweet from "@/components/NewTweet";
import Tweet from "@/components/Tweet";
import { getLastTweets } from "@/services/Web3Service";

import { useState, useEffect } from "react";

export default function Timeline() {
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);

  async function loadTweets(page = 1) {
    try {
      const result = await getLastTweets(page);
      if(page === 1) {
        setTweets((prevTweets) => [...prevTweets, ...result].reverse());

      }
      else {
        setTweets(result.reverse());
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  useEffect(() => {
    loadTweets(page);
  }, [page]);

  function btnLoadMoreClick() {
    setPage(page + 1);
  }

  return (
    <>
      <Head>
        <title>CrypTwitter | Timeline</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <div className="container px-4 py-5">
        <div className="row">
          <div className="layout">
            <NewTweet />
            {tweets && tweets.length ? (
              tweets.map((t) => <Tweet key={Number(t.timestamp)} data={t} />)
            ) : (
              <p>No tweets found</p>
            )}
            {tweets.length > 0 && tweets.length % 10 === 0 ? (
              <div className="center">
                <input
                  type="button"
                  value="More Tweets"
                  className="btn btn-primary"
                  onClick={btnLoadMoreClick}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
