"use client";

import { setUser } from "@/app/slices/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const fetchUser = async () => {
  try {
    const res = await fetch("/api/user", {
      credentials: "include",
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};
const FetchUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchUser();

        if (!data?.message) return;

        dispatch(
          setUser({
            userEmail: data.message.email,
            isPaid: data.message.isPaid,
          })
        );
      } catch (error) {
        console.error("failed to fetch", error);
      }
    };
    getUser();
  }, [dispatch]);

  return null;
};

export default FetchUser;
