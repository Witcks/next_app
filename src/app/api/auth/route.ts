// import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res.payload?.data?.token;
  if (!sessionToken) {
    return Response.json(
      { error: "Session token is required" },
      { status: 400 }
    );
  }
  return Response.json(
    { res },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Strict`,
        "Content-Type": "application/json",
      },
    }
  );
}
