"use client";

import { useState } from "react";
import { IUserData, IJWTPayload } from "@/lib/types/User";
import { IAuthResponse } from "@/lib/types/Auth";
import jwt from "jsonwebtoken";

export const useGetUserData = (
  backendUrl: string,
  token: string | undefined,
  fetchData = false,
) => {
  const [data, setData] = useState<IUserData | IJWTPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!fetchData) {
        const userData: IJWTPayload = jwt.verify(
          token as string,
          process.env.JWT_SECRET as string,
        ) as IJWTPayload;
        setData(userData as IJWTPayload);
      } else {
        if (!token) {
          setData(null);
          return;
        }
        const response = await fetch(`${backendUrl}/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setData(null);
          }

          throw new Error("Failed to fetch user data");
        }

        const userData: IAuthResponse<IUserData> = await response.json();
        setData({ ...userData.data });
      }
    } catch (err) {
      console.error("ERROR IN GET USER DATA (CUSTOM HOOKS):", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchUserData };
};
