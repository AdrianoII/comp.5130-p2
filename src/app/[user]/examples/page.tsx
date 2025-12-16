"use client"

import { useParams } from "next/navigation";
import { createAuthClient } from "better-auth/react"
const { useSession } = createAuthClient()
import { useState, useEffect } from "react";
interface Example {
  id: number;
  userId: string;
  title: string;
  code: string;
  created_at: string;
  updated_at: string;
}
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const params = useParams();
  const postId = params.user;
  const {
    data: session,
    isPending,
    error,
    refetch
  } = useSession();
  const [examples, setExamples] = useState<Example[]>([]);
  const [hasData, setHasData] = useState(false);
  const [selectedExample, setSelectedExample] = useState("");
  const [editingExample, setEditingExample] = useState<Example | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCode, setEditCode] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  useEffect(() => {
    // TODO: Maybe we should add the API_URL as an env var 
    if (session !== null) {
      const fetch_data = async () => {
        const data = await fetch(`${process.env.NEXT_PUBLIC_URL}api/examples/user`)
        const json = await data.json();
        setExamples(json);
        setHasData(true);
      };
      const data = fetch_data();
    }
  }, [session]);

  const handleEditOpen = (example: Example) => {
    setEditingExample(example);
    setEditTitle(example.title);
    setEditCode(example.code);
    setIsEditOpen(true);
  };

  const handleEditSave = async () => {
    if (!editingExample) return;
    try {
      const res = await fetch(`/api/examples/user`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: editingExample.id, 
          title: editTitle, 
          code: editCode 
        })
      });
      const json = await res.json();
      setExamples(Array.isArray(json) ? json : []);
      setIsEditOpen(false);
      setEditingExample(null);
    } catch (err) {
      console.error('Edit failed', err);
    }
  };

  return <section className="mx-auto max-w-5xl p-6 space-y-6">
    {(isPending && !hasData) && <p>Loading session... <Spinner className="size-6 text-amber-500" /></p>}
    {(!isPending && hasData) && <>
      <h1 className="text-2xl font-semibold">Examples of {session?.user.name}</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Updated</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {examples.map((ex: Example) => (
              <tr key={ex.id} className="border-t">
                <td className="px-4 py-2 align-top">{ex.title}</td>
                <td className="px-4 py-2 align-top">
                  <pre className="whitespace-pre-wrap max-w-xl text-sm text-slate-700">{ex.code}</pre>
                </td>
                <td className="px-4 py-2 align-top">{new Date(ex.created_at).toLocaleString()}</td>
                <td className="px-4 py-2 align-top">{new Date(ex.updated_at).toLocaleString()}</td>
                <td className="px-4 py-2 align-top">
                  <button
                    className="mr-2 rounded bg-blue-600 px-3 py-1 text-white text-sm hover:bg-blue-700"
                    onClick={() => handleEditOpen(ex)}
                  >
                    Edit
                  </button>
                  <button
                    className="mr-2 rounded bg-red-600 px-3 py-1 text-white text-sm hover:bg-red-700"
                    onClick={async () => {
                      try {
                        const res = await fetch(`/api/examples/user`, {
                          method: 'DELETE',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ id: ex.id })
                        });
                        const json = await res.json();
                        // API returns updated list after mutations
                        setExamples(Array.isArray(json) ? json : []);
                      } catch (err) {
                        console.error('Delete failed', err);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
    }
    {
      error &&
      <p className="text-red-600 text-sm md:text-base">
        Invalid user. Please log in to view your examples.
      </p>
    }

    <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit Example</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Example title"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Code</label>
            <Textarea
              value={editCode}
              onChange={(e) => setEditCode(e.target.value)}
              placeholder="Example code"
            />
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline" onClick={() => setIsEditOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleEditSave}>
            Save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </section>
}