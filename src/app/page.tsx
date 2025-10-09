// app/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider text-gray-500">Overview</p>
        <h1 className="mt-2 text-2xl font-semibold leading-tight">
          Pint is an extension to the educational language Piforall, which adds support for intersection data types.
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
          Pint, which allows to encode expressive types like inductive-inductive and inductive-recursive types. Building on traditional Sigma types, this extension makes Piforall more expressive while also ultimately building a formally verified compiler.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Benefits</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Interpreter</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Source Code</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
