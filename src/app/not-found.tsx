"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Error() {
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();

  useEffect(() => {
    // Use setTimeout to delay the redirection
    const timeoutId = setTimeout(() => {
      router.push("/");
      // router.back(); // Navigate back in the history stack
    }, countdown * 1000);

    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000); // Update countdown every 1 second

    // Cleanup function to clear the timeout and interval
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [router, countdown]);

  return (
    <div className="justify-center items-center flex flex-col h-screen gap-2">
      <Image
        loading="eager"
        className="w-[300px] aspect-[4/3] object-contain"
        src="/404.png"
        alt=""
        width={250}
        height={250}
      />
      <h1 className="text-center text-[35px] md:text-[54px] tracking-[-2] md:tracking-[-1.9] leading-[32px] md:leading-[50px]">
        404 Not Found
      </h1>
      <p>Redirecting in {countdown} seconds...</p>
    </div>
  );
}

export default Error;
