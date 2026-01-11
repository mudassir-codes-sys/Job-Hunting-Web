"use client";

import { setUser } from "@/app/slices/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const FetchUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      console.log("function run");

      try {
        const res = await fetch("/api/user", {
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);

        dispatch(
          setUser({
            userEmail: data.message.email,
            isPaid: data.message.isPaid,
          })
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [dispatch]);
  return <div>fetchUser</div>;
};

export default FetchUser;
