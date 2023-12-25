import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { countries } from "../mock/mockCountriesApi";
import apiFetch from "../utils/fetchUtils";
import DigitalClock from "./DigitalClock";
import Modal from "./Modal";
// import apiFetch from "../utils/fetchUtils";

function UserDetails() {
  const [userData, setUserData] = useState({});
  const [isRunning, setIsRunning] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const { userId } = useParams();
  const history = useNavigate();
  const [timeData, setTimeData] = useState({
    countrylist: [],
    selectedCountry: "",
    time: "",
  });

  const { users, posts } = useSelector((state) => state.counter);
  useEffect(() => {
    if (users) {
      setUserData(users.find((e) => Number(e.id) === Number(userId)));
    }
  }, [userId, users]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiFetch(
          `https://worldtimeapi.org/api/timezone/${timeData.selectedCountry}`
        );
        const dateObj = await new Date(result);
        setTimeData((prev) => ({ ...prev, time: dateObj }));
      } catch (error) {
        // Handle error
      }
    };

    if (timeData.selectedCountry) {
      fetchData();
    }
  }, [timeData.selectedCountry]);

  useEffect(() => {
    countries.then((e) => setTimeData((prev) => ({ ...prev, countrylist: e })));
  }, []);

  console.log("karan", timeData);

  return (
    <div className="p-4">
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div>
          <div className="p-5 pb-0">{modalContent?.title}</div>
          <div className="p-5">{modalContent?.body}</div>
        </div>
      </Modal>
      <div className="flex justify-between p-4 px-0">
        <div
          className="p-2 bg-blue-300 rounded-md h-fit"
          onClick={() => history(-1)}
        >
          Back
        </div>
        <div className="flex flex-col items-end gap-2 md:gap-3 justify-evenly md:flex-row md:items-center">
          <div>
            <select
              onChange={(e) => {
                setTimeData((prev) => ({
                  ...prev,
                  selectedCountry: e.target.value,
                }));
              }}
            >
              {timeData?.countrylist?.map((country) => (
                <option>{country}</option>
              ))}
            </select>
          </div>
          <DigitalClock isRunning={isRunning} />
          <div
            className="p-2 bg-green-300 cursor-pointer"
            onClick={() => {
              setIsRunning((prev) => !prev);
            }}
          >
            Pause/Start
          </div>
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
                onClick={() => {
                  setIsOpen(true);
                  setModalContent(post);
                }}
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
