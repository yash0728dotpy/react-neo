import moment from "moment";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import React, { useEffect, useState } from "react";
import { fetchAPI } from "../functions/fetchAPI";

export const NEO = () => {
  const [neo, setNeo] = useState("");
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  // const today_date = new Date().toLocaleString().split(",")[0];

  useEffect(() => {
    async function asyncFetch() {
      let response = await fetchAPI(
        "https://api.nasa.gov/neo/rest/v1/feed?start_date=" +
          moment(date).format("YYYY-MM-DD") +
          "&end_date=" +
          moment(date).format("YYYY-MM-DD") +
          "&api_key=MvHH5wL3MivG9rh8aYRrF2UD4lt9kxiB5HJ3dwFP"
      );
      setNeo(response.near_earth_objects);
      setLoading(false);
      console.log(response);
    }
    asyncFetch();
  }, [date]);

  const neoStyle = {
    maxWidth: "23rem",
  };

  const NeoItem = () => {
    return (
      <div className="pt-5" style={{ width: "60%", margin: "0 auto" }}>
        <div className="d-flex flex-wrap justify-content-around">
          {neo[moment(date).format("YYYY-MM-DD")].map((neos) => (
            <div
              key={neos.id}
              className="card text-white bg-dark mb-5"
              style={neoStyle}
            >
              <div className="card-header">{neos.name}</div>
              <div className="card-body">
                <h5 className="card-title mb-4">
                  Closest at{" "}
                  {
                    neos.close_approach_data[0].close_approach_date_full.split(
                      " "
                    )[1]
                  }
                </h5>
                <p className="card-text">
                  {neos.is_potentially_hazardous_asteroid ? (
                    <span className="text-danger">Harazdous!</span>
                  ) : (
                    <span className="text-success">Not hazardous.</span>
                  )}
                </p>
                <p className="card-text">
                  Max diameter:&nbsp;
                  {neos.estimated_diameter.miles.estimated_diameter_max}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  if (!loading && neo[moment(date).format("YYYY-MM-DD")]) {
    return (
      <>
        <h5 className="text-center mt-5" style={{ fontSize: "2rem" }}>
          {date.toLocaleDateString()}
        </h5>
        <div className=" d-flex justify-content-center">
          <div>
            <Calendar onChange={setDate} value={date} />
          </div>
        </div>
        <NeoItem />
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
