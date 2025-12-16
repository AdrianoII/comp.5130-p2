"use client"

import { useParams } from "next/navigation";
import { createAuthClient } from "better-auth/react"
const { useSession } = createAuthClient()
import { useState, useEffect } from "react";
interface Example {
  id: number;
  user_id: number;
  title: string;
  code: string;
  created_at: string; // Keep as string if just storing the value from JSON
  updated_at: string;
}
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";

export default function Page() {
  const params = useParams();
  const postId = params.user;
  const {
    data: session,
    isPending,
    error,
    refetch
  } = useSession();
  const [examples, setExamples] = useState([]);
  const [selectedExample, setSelectedExample] = useState("");
  useEffect(() => {
    // TODO: Maybe we should add the API_URL as an env var 
    if (session !== null) {
      const fetch_data = async () => {
        const data = await fetch(`${process.env.NEXT_PUBLIC_URL}api/examples/user`)
        const json = await data.json();
        setExamples(json);
      };
      const data = fetch_data();
    }
  }, [session]);

  return <section className="mx-auto max-w-5xl p-6 space-y-6">
    {(isPending) && <p>Loading session... <Spinner className="size-6 text-amber-500" /></p>}
    {!isPending && <>
      <h1 className="text-2xl font-semibold">Examples of {session?.user.name}</h1>
      <ul>
        {examples.map((ex: Example) =>
          <li key={ex.id}>{ex.title}</li>
        )}
      </ul>
    </>
    }
    {
      error &&
      <p className="text-red-600 text-sm md:text-base">
        Invalid user. Please log in to view your examples.
      </p>
    }
    {/* <div>
    <h1>{session?.user.name}</h1>
    <h1> Examples</h1>
    <ul>
      {examples.map((ex: Example) =>
        <li key={ex.id}>{ex.title}</li>
      )}
    </ul>
  </div> */}
  </section>
}