"use client";

import Editor, { Monaco } from "@monaco-editor/react";
import { PlayIcon, ScrollIcon, HelpCircleIcon } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { WASI } from "@runno/wasi";
import ExampleSelector from "@/components/shared/exampleselector";
import { editor } from "monaco-editor";

export default function Playground() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  function handleEditorDidMount(
    editorInstance: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ): void {
    editorRef.current = editorInstance;
  }

  function setEditorValue(v: string) {
    if (editorRef.current) {
      editorRef.current.setValue(v);
    }
  }

  const runCode = (mode: "eval" | "type") => {
    setError("");
    setOutput("");

    WASI.start(fetch("/lc.wasm"), {
      args: ["lambda-calc", mode, input],
      env: {},
      stdout: (out) => {
        console.log("stdout", out);
        setOutput((prev) => (prev ? `${prev}\n${out}` : out));
      },
      stderr: (err) => {
        console.error("stderr", err);
        setError((prev) => (prev ? `${prev}\n${err}` : err));
      },
      stdin: () => prompt("stdin:") ?? "",
      fs: {},
    });
  };

  return (
    <section className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Main heading */}
      <header className="space-y-2 text-center flex items-center justify-center relative">
        <h1 className="text-2xl sm:text-3xl font-semibold">Playground</h1>
        <Button
          variant="ghost"
          size="icon-lg"
          className="rounded-full ml-2 text-amber-600"
          onClick={() => setIsHelpOpen(true)}
          aria-label="Help"
        >
          <HelpCircleIcon className="h-5 w-5" />
        </Button>
      </header>
        <p className="text-sm text-gray-600">
          Select an example or write your own lambda term, then run or view its type.
        </p>
      {/* Example selector */}
      <div className="flex flex-col items-center text-center space-y-3">
        <h2 className="text-lg font-semibold">Select a code example</h2>
        <div className="w-full max-w-md flex justify-center">
          <ExampleSelector
            onChange={(v: string) => {
              setInput(v);
              setEditorValue(v);
            }}
          />
        </div>
      </div>

      {/* Editor */}
      <div className="w-full rounded-lg border bg-white shadow-sm overflow-hidden">
        <Editor
          height="50vh"
          theme="vs-light"
          defaultLanguage="haskell"
          value={input}
          onChange={(v) => setInput(v ?? "")}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            wordWrap: "on",
            ariaLabel: "Lambda calculus code editor",
          }}
        />
      </div>

      {/* Actions */}
      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-2">
        <Button
          variant="default"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-5 text-base font-medium bg-emerald-700 hover:bg-emerald-800 text-white shadow-md transition-all duration-200 hover:scale-[1.03]"
          onClick={() => runCode("eval")}
        >
          <PlayIcon className="h-5 w-5" aria-hidden="true" focusable="false" />
          Run Code
        </Button>

        <Button
          variant="default"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-5 text-base font-medium bg-amber-400 hover:bg-amber-400 text-amber-900 shadow-md transition-all duration-200 hover:scale-[1.03]"
          onClick={() => runCode("type")}
        >
          <ScrollIcon
            className="h-5 w-5"
            aria-hidden="true"
            focusable="false"
          />
          View Proof
        </Button>
      </div>

      {/* Output */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Output / Proof</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-700">
          <div aria-live="polite" aria-atomic="true">
            {error.length > 0 && (
              <pre className="text-red-600 whitespace-pre-wrap">
                {error}
              </pre>
            )}

            {error.length === 0 && output.length === 0 && (
              <p>Waiting for user&apos;s action</p>
            )}

            {error.length === 0 && output.length > 0 && (
              <pre className="whitespace-pre-wrap">{output}</pre>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Help Modal */}
      <Sheet open={isHelpOpen} onOpenChange={setIsHelpOpen}>
        <SheetContent  className="p-4" side="right">
          <SheetHeader>
            <SheetTitle>Playground Tutorial</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 py-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Getting Started</h3>
              <p className="text-gray-700">
                Welcome to the Pint Playground! You can write lambda expressions and execute them to see the results or check their types!
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Select Examples</h3>
              <p className="text-gray-700">
                Use the example selector to load pre-built programs curated by us and learn from them.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Manage Examples</h3>
              <p className="text-gray-700">
                You can use the topbar to authenticate and manage your own code examples. 
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Run Code</h3>
              <p className="text-gray-700">
                Click the &ldquo;Run Code&rdquo; button to evaluate your program and see the output.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">View Proof</h3>
              <p className="text-gray-700">
                Click the &ldquo;View Proof&rdquo; button to see the type of your program.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Syntax</h3>
              <p className="text-gray-700">
                Use standard lambda calculus syntax. For detailed documentation, please refer to our documentation page.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
