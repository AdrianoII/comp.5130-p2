"use client"
import Editor, { DiffEditor, useMonaco, loader, OnMount, Monaco } from '@monaco-editor/react';
import { PlayIcon, ScrollIcon } from "lucide-react"
import { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WASI } from "@runno/wasi";
import ExampleSelector from "@/components/shared/exampleselector";
import { editor } from 'monaco-editor';
import { authClient } from "@/lib/auth-client";

export default function Playground() {
    const editorRef = useRef<editor.IStandaloneCodeEditor>(null);
    const [input, setInput] = useState("")

    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco): void {
        editorRef.current = editor;
    };

    function setEditorValue(v: string) {
        if (editorRef.current) {
            editorRef.current.setValue(v)
        }
    }

    useEffect(() => {

        const maybeElem = document.querySelector("#div");
        if (maybeElem) {
            console.log(maybeElem.innerHTML)
        } else {
            console.log(maybeElem)
        }
    }, []);



    useEffect(() => {
        const result = WASI.start(fetch("/lc.wasm"), {
            // args: ["binary-name", "--do-something", "some-file.txt"],
            args: [],
            env: {},
            stdout: (out) => console.log("stdout", out),
            stderr: (err) => console.error("stderr", err),
            stdin: () => prompt("stdin:"),
            fs: {
                "/some-file.txt": {
                    path: "/some-file.txt",
                    timestamps: {
                        access: new Date(),
                        change: new Date(),
                        modification: new Date(),
                    },
                    mode: "string",
                    content: "Some content for the file.",
                },
            },
        });
    }, [])

    return (
        <section className="mx-auto max-w-5xl p-6 space-y-4">
            <Button
                variant="destructive"
                className="flex items-center gap-2 text-success text-4lg"
                onClick={async () => {
                    console.log("Signing in with github")
                    await authClient.signIn.social({
                        /**
                         * The social provider ID
                         * @example "github", "google", "apple"
                         */
                        provider: "github",
                        // /**
                        //  * A URL to redirect after the user authenticates with the provider
                        //  * @default "/"
                        //  */
                        // callbackURL: "/dashboard",
                        // /**
                        //  * A URL to redirect if an error occurs during the sign in process
                        //  */
                        // errorCallbackURL: "/error",
                        // /**
                        //  * A URL to redirect if the user is newly registered
                        //  */
                        // newUserCallbackURL: "/welcome",
                        // /**
                        //  * disable the automatic redirect to the provider. 
                        //  * @default false
                        //  */
                        // disableRedirect: true,
                    });
                }
                }
            >AUTH</Button>
            <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-semibold mb-2">
                    Select a code example
                </h1>
                <div className="w-full max-w-md flex justify-center mt-2">
                    <ExampleSelector onChange={(v: string) => {
                        setInput(v)
                        setEditorValue(v);
                    }} />
                </div>
            </div>
            <h1 className="text-2xl font-semibold">Playground</h1>
            <div>
                <Editor
                    height="50vh"
                    theme="vs-light"
                    defaultLanguage="haskell"
                    defaultValue={input}
                    onChange={(v, e) => setInput(v === undefined ? "" : v)}
                    onMount={handleEditorDidMount}
                />
            </div>

            <div className='w-full flex flex-row content-center justify-center items-center gap-16'>
                <Button
                    variant="outline"
                    className="flex items-center gap-2 text-success text-4lg text-green-600"
                >
                    <PlayIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="flex items-center gap-2 text-success text-4lg text-yellow-700"
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
