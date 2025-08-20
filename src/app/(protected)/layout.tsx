import { verifyAuthTokenServer } from "@/lib/server-middleware";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const layout = async ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  const cookieStore = await cookies();
  //   const token = cookieStore.get("token")?.value || "";
  // console.log({cookieStore});

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
  });
  if (!res.ok) {
    redirect("/signin?token=false");
  }
  const result = await res.json();
  if (!result.success) {
    redirect("/signin?token=false");
  }

  return children;
};

export default layout;
