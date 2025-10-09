"use client"
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { PlayIcon, ScrollIcon } from "lucide-react"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Playground() {

    const [input, setInput] = useState("")

    return (
        <section className="mx-auto max-w-5xl p-6 space-y-4">
            <h1 className="text-2xl font-semibold">Playground</h1>

            <div>
                <Editor
                    height="50vh"
                    theme="vs-light"
                    defaultLanguage="haskell"
                    defaultValue={input}
                    onChange={(v, e) => setInput(v === undefined ? "" : v)}

                />
            </div>

            <div className='w-full flex flex-row content-center justify-center items-center gap-16'>
                <Button
                    // variant="secondary"
                    className="flex items-center gap-2 text-success text-4lg text-green-600"
                >
                    <PlayIcon className="h-4 w-4" />
                </Button>
                <Button
                    // variant="secondary"
                    className="flex items-center gap-2 text-success text-4lg text-yellow-100"
                >
                    <ScrollIcon className="h-4 w-4" />
                </Button>
            </div>

            <div>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Output/Proof</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
