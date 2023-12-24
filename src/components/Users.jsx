import React, { useEffect, useState } from "react";
import apiFetch from "../utils/fetchUtils";
import { Link } from "react-router-dom";
// import { addusers } from "../store/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { updatePosts, updateUsers } from "../store/counterSlice";
import { getRepetionNumber } from "../utils/utils";

function Users() {
  const [postsCountData, setPostsCountData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiFetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        dispatch(updateUsers(result));
        const result1 = await apiFetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        dispatch(updatePosts(result1));
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  const dispatch = useDispatch();
  const { users, posts } = useSelector((state) => state.counter);

  useEffect(() => {
    if (posts) setPostsCountData(getRepetionNumber(posts));
  }, [posts]);

  return (
    <div className="p-3">
      <div className="text-center">Directory</div>
      {users ? (
        <div className="flex flex-col items-center justify-center pt-3">
          {users?.map((e) => (
            <Link
              key={e.id}
              to={"/users/" + e?.id}
              className="flex items-center justify-between w-full p-3 m-1 bg-blue-300 rounded-md shadow-lg md:w-2/4 "
            >
              <div>Name: {e.name}</div>
              <div>Posts: {postsCountData[e.id]}</div>
            </Link>
          ))}
        </div>
      ) : (
        <div>loading....</div>
      )}
      <div>
        {/* <p>Counter: {counter}</p> */}
        {/* <button onClick={() => dispatch(addUsers(data))}>Increment</button> */}
        {/* <button onClick={() => dispatch(decrement(data))}>Decrement</button> */}
      </div>
    </div>
  );
}

export default Users;
