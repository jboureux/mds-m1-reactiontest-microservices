"use client"; // Mark this file as a client component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation in the App Router

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/user/register'); // Redirect to the register page
  }, [router]);

  return null; // No UI is required as the user will be redirected
}