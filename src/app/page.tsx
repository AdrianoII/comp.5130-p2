// app/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react"
export default function Home() {
  return (
    <div className="mx-auto max-w-5xl prose prose-amber lg:prose-xl">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider text-gray-500">Overview</p>
        <h1 className="mt-2 text-2xl font-semibold leading-tight">
          <strong className="text-amber-600">Pint</strong>: Intersection + Depedent Types!
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
          <strong className="text-amber-600">Pint</strong> is an extension to the educational language <a className="" href="https://github.com/sweirich/pi-forall">Piforall</a>, which adds support for intersection data types.
          Pint, which allows to encode expressive types like inductive-inductive and inductive-recursive types. Building on traditional Sigma types, this extension makes Piforall more expressive while also ultimately building a formally verified compiler.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Benefits</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            Pint enables developers and researchers to explore richer type systems and formal reasoning within a Haskell-based language. Its support for advanced type constructs can simplify proofs, reduce boilerplate in dependently typed code, and improve the reliability of complex language features. The formal verification aspect also ensures greater confidence in compiler correctness, which is valuable for both theoretical exploration and practical language design.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Interpreter</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            We extend the Piforall implementation with intersection types by modifying its type checker and inference rules to handle type intersections during unification and evaluation. This involves extending the core type representation and adjusting the elaboration phase to preserve intersection structure in the generated core terms, ensuring that type soundness and normalization are maintained.
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Source Code</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Our source code and our proofs are publicly available on <a href="https://github.com/SmoothThunk/pi-forall" >GitHub</a>. Feel free to explore, contribute, or raise issues if you have any questions or suggestions!
              <br />
              <div className="flex justify-center mt-4">
                <a href="https://github.com/SmoothThunk/pi-forall" aria-label="Pi-forall GitHub">
                  <Github size={64} />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
