"use client";
import { fetchUser } from "@/components/others/fetchUser";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshUser = async () => {
      try {
        const data = await fetchUser();

        if (!data?.message) return;

        dispatch(
          setUser({
            userEmail: data.message.email,
            isPaid: data.message.isPaid,
          })
        );
      } catch (err) {
        console.error("Failed to refresh user:", err);
      }
    };
    refreshUser();
  }, [dispatch]);

  return null;
};

export default Page;
