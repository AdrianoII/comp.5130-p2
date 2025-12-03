// app/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react"
export default function Home() {
  return (
    <div className="mx-auto max-w-5xl prose prose-amber lg:prose-xl text-center">
      <div className="mb-6 text-center">
        <p className="text-xs uppercase tracking-wider text-gray-500">Overview</p>
        <h1 className="mt-2 text-2xl font-semibold leading-tight">
          <strong className="text-amber-600">Pint</strong>: Intersection + Depedent Types!
        </h1>
        <p className="mt-2 max-w-3xl lg:max-w-full text-sm text-justify leading-6 text-gray-600">
          <strong className="text-amber-600">Pint</strong> builds upon <a className="" href="https://github.com/sweirich/pi-forall">Piforall</a>, a simple, minimalistic, bidirectional type checker for dependent types written in Haskell, and extends it with <strong>intersection</strong> types and their dual, <strong>union</strong> types, to encode user-defined types and support advanced reasoning principles like inductive-induction while maintaining a small kernel.
          These extensions include intersections, unions, and first-class functions to model object-oriented systems and codata type interfaces, where intersections capture multiple interfaces (A and B) and unions capture variant or dynamic interfaces (A or B), which are particularly useful for modeling dynamic object-oriented behavior.
          The system also features coercions represented as explicit term annotations, enabling verified reasoning about type conversions, and uses subtyping both to model inheritance and to express a notion of type equality, where mutual subtyping yields type equivalence.
        </p>
        <p className="mt-2 max-w-3xl lg:max-w-full text-sm text-justify leading-6 text-gray-600">
        <strong className="text-amber-600">Pint</strong> further incorporates impredicative quantifiers (forall and exists) in the style of System F to generalize dependent function and pair types, ensuring that logical abstractions and data constructors coexist within the same kernel.
        It includes universes from the Cedille type theory, with Prop for “small” impredicative types and Type for “large” types analogous to sets, and uses quantities to capture the essence of type erasure required for intersection and union types, clarify the compile-time versus run-time distinction, and express linear, stateful resources in imperative programs.
        The main innovation is to represent intersection and union types via a computationally irrelevant path parameter, similar in spirit to cubical type theory, and all these extensions live in a single calculus with an intrinsic, syntax-directed, bidirectional type theory so that every feature reuses the same small, trusted kernel rather than enlarging it.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Contributions</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-justify text-gray-600">
            <ul className="list-disc list-inside space-y-1 text-gray-900">
              <li>
                Can generalize and encode <a href="https://personal.cis.strath.ac.uk/conor.mcbride/PlentyO-CR.pdf"
                  className="text-blue-600 hover:underline">
                  Conor's system
                </a>
                .
              </li>
              <li>
                Erasure and then check for program equivalence, which is easy to implement
                in implicit systems vs index erasure.
              </li>
              <li>
                Typing rules.
              </li>
              <li>
                Forall.
              </li>
              <li>
                Lack of erasure in typing rules makes it easy to implement.
              </li>
              <li>
                Small kernel size without trading off expressivity.
              </li>
              <li>
                Formally verified core via Coq translation.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Interpreter</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-justify text-gray-600">
            We extend the Piforall implementation with intersection types by modifying its type checker and inference rules to handle type intersections during unification and evaluation. This involves extending the core type representation and adjusting the elaboration phase to preserve intersection structure in the generated core terms, ensuring that type soundness and normalization are maintained.
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Source Code</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-center text-gray-600">
              Our source code and our proofs are publicly available on <a href="https://github.com/SmoothThunk/pi-forall" >GitHub</a>.
              <br />
              Feel free to explore, contribute, or raise issues if you have any questions or suggestions!
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
