"use client"
import Editor, { DiffEditor, useMonaco, loader, OnMount, Monaco } from '@monaco-editor/react';
import { PlayIcon, ScrollIcon } from "lucide-react"
import { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WASI } from "@runno/wasi";
import ExampleSelector from "@/components/shared/exampleselector";
import { editor } from 'monaco-editor';

export default function Playground() {
    const editorRef = useRef<editor.IStandaloneCodeEditor>(null);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");

    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco): void {
        editorRef.current = editor;
    };

    function setEditorValue(v: string) {
        if (editorRef.current) {
            editorRef.current.setValue(v)
        }
    }

    const runCode = (mode: "eval" | "type") => {
        console.log("Running code:", input);
        console.log(['lambda-calc', mode, `${input}`])
        const result = WASI.start(fetch("/lc.wasm"), {
            args: ['lambda-calc', 'eval', input],
            env: {},
            stdout: (out) => { console.log("stdout", out); setOutput(out) },
            stderr: (err) => { console.error("stderr", err); setError(err) },
            stdin: () => prompt("stdin:"),
            fs: {},
        });
    }

    return (
        <section className="mx-auto max-w-5xl p-6 space-y-4">
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
                    onClick={() => {
                        runCode("eval");
                    }}
                >
                    <PlayIcon className="h-5 w-5" />
                    Run Code
                </Button>


                <Button
                    variant="default"
                    className="flex items-center gap-2 px-6 py-5 text-base font-medium bg-amber-400 hover:bg-amber-400 text-amber-900 shadow-md transition-all duration-200 hover:scale-[1.03]"
                    onClick={() => {
                        runCode("type");
                    }}
                >
                    <ScrollIcon className="h-5 w-5" />
                    View Proof
                </Button>
            </div>

            <br />
            <div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Output/Proof</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600">
                        {error.length > 0 &&
                            <pre className="text-red-600 whitespace-pre-wrap">{error}</pre>
                        }
                        {error.length === 0 && output.length === 0 &&
                            <p>Waiting for user&apos;s action</p>
                        }
                        {error.length === 0 && output.length > 0 &&
                            <pre className="whitespace-pre-wrap">{output}</pre>
                        }
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
