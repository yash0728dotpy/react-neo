import React, { useEffect, useState } from "react";
import { fetchAPI } from "../functions/fetchAPI";

export const APOD = () => {
  const [apod, setApod] = useState("");
  const [bgUrl, setBgUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function asyncFetch() {
      let response = await fetchAPI(
        "https://api.nasa.gov/planetary/apod?api_key=MvHH5wL3MivG9rh8aYRrF2UD4lt9kxiB5HJ3dwFP"
      );
      setApod(response);
      try {
        await fetch(response.hdurl, { mode: "no-cors" });
        setBgUrl(response.hdurl);
      } catch {
        setBgUrl(response.url);
      }
      setLoading(false);
      console.log(response);
    }
    asyncFetch();
  }, []);

  if (!loading) {
    return (
      <>
        <h1 className="text-center my-2">{apod.title}</h1>
        <h3 className="text-center my-2">{apod.copyright}</h3>
        <img
          alt="apod"
          src={bgUrl}
          style={{
            width: "100%",
          }}
        />
        <p
          className="fw-light text-justify m-4"
          style={{ fontSize: "2rem", lineHeight: "2" }}
        >
          {apod.explanation}
        </p>
      </>
    );
  } else {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
};
