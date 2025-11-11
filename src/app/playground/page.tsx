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

            <div className="w-full flex justify-center items-center gap-8 mt-6">

                <Button
                    variant="default"
                    className="flex items-center gap-2 px-6 py-5 text-base font-medium bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all duration-200 hover:scale-[1.03]"
                >
                    <PlayIcon className="h-5 w-5" />
                    Run Code
                </Button>


                <Button
                    variant="default"
                    className="flex items-center gap-2 px-6 py-5 text-base font-medium bg-amber-400 hover:bg-amber-400 text-amber-900 shadow-md transition-all duration-200 hover:scale-[1.03]"
                >
                    <ScrollIcon className="h-5 w-5" />
                    View Proof
                </Button>
            </div>

            <br/>
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
