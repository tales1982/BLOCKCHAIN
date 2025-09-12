"use client";

import Head from "next/head";
import { Login } from "../services/Web3Service";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const {push} = useRouter();
  const [message, setMessage] = useState("");

  function btnLoginClick() {
    setMessage("Loading...");
    Login()
      .then((wallet) => push("/timeline"))
      .catch((err) => {
        console.error(err);
        setMessage(err.message)});
  }

  return (
    <>
      <Head>
        <title>CrypTwitter | Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="https://nspsocorro.com.br/wp-content/uploads/2016/12/Din%C3%A2micas-para-Jovens-Cat%C3%B3licos.jpg"
              className="d-block mx-lg-auto"
              width="700"
              height="500"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-bold text-body-emphasis lh-1 mb-3">
              CrypTwitter
            </h1>
            <p className="lead">
              Here you can share your thoughts and opinions safely and
              anonymously.
            </p>
            <p className="lead mb-3">
              Authenticate with your wallet, write your messages, and stay
              informed about what's happening in the world.
            </p>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button
              type="button"
              className="btn btn-primary btn-lg px-4 me-md-2"
              onClick={btnLoginClick}
            >
              <img src="/images.png" width="64" className="me-3" /> Conect with
              Metamask
            </button>
          </div>
          <p className="message">{message}</p>
        </div>
      </div>
    </>
  );
}
