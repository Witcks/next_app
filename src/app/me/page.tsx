import Profile from "@/app/me/profile";
import envConfig from "@/config";
import { cookies } from "next/headers";

export default async function MeProfile() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
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
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <p className="text-lg">Hello {result.payload?.data?.name}</p>
      <Profile />
    </div>
  );
}
