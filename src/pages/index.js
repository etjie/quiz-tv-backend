import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in by checking localStorage
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      // If not logged in, redirect to /login
      router.push("/login");
    } else {
      // If logged in, redirect to /results
      router.push("/results");
    }
  }, [router]);

  return null; // Optionally, you can return a loading spinner or something similar here
}
