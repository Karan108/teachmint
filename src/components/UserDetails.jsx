import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
// import apiFetch from "../utils/fetchUtils";

function UserDetails() {
  const [userData, setUserData] = useState({});
  const { userId } = useParams();
  const history = useNavigate();
  // const [countryList, setCountryList] = useState([]);

  // useEffect(() => {
  //   const fetchCountry = async () => {
  //     const countries = await apiFetch(
  //       "http://worldtimeapi.org/api/timezone",
  //       "GET",
  //       null,
  //       {
  //         "Content-Type": "application/json",
  //       },
  //       true
  //     );
  //     console.log("karan", countries);
  //   };
  //   fetchCountry();
  // }, []);

  const { users, posts } = useSelector((state) => state.counter);
  useEffect(() => {
    if (users) {
      setUserData(users.find((e) => Number(e.id) === Number(userId)));
    }
  }, [userId, users]);

  return (
    <div className="p-4">
      <div className="flex justify-between p-4 px-0">
        <div
          className="p-2 bg-blue-300 rounded-md h-fit"
          onClick={() => history(-1)}
        >
          Back
        </div>
        <div className="flex flex-col items-end gap-2 justify-evenly md:flex-row ">
          <div>
            <select>
              <option>1</option>
              <option>2</option>
            </select>
          </div>
          <div>Country dropdown</div>
          <div className="p-2 bg-green-300">Pause/Start</div>
        </div>
      </div>
      <div className="text-center">Profile page</div>
      <div>
        <div className="p-5 m-3 mx-0 border border-black border-solid rounded-lg">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div>
              <div>{userData?.name}</div>
              <div>
                {userData?.username} | {userData?.company?.catchPhrase}
              </div>
            </div>
            <div>
              <div>
                {userData?.address?.suite}, {userData?.address?.street},{" "}
                {userData?.address?.city}
              </div>
              <div>
                {userData?.email} | {userData?.phone}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 justify-evenly">
          {posts
            .filter((post) => post.userId === userData.id)
            .map((post) => (
              <div
                className="p-2 border border-black border-solid rounded-lg h- md:w-1/4"
                key={post.id}
              >
                <div>{post.title}</div>
                <div>{post.body}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
