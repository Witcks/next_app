"use client";

import { useAppContext } from "@/app/AppProvider";
import envConfig from "@/config";
import { useEffect } from "react";

export default function Profile() {
  const { sessionToken } = useAppContext();
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_APT_ENDPOINT}/account/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      ).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }
        return data;
      });
      console.log("Profile data:", result.payload);
    };
    fetchRequest().catch((error) => {
      console.error("Error fetching profile:", error);
    });
  }, [sessionToken]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <p className="text-lg">Hello User</p>
    </div>
  );
}
