"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Documentation() {
  return (<main className="prose-math">
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Example of Dependent Intersection Types
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6 space-y-4">
        <p>
          Dependent intersection types can encode expressive data such as
          inductive-inductive and inductive-recursive types. As a running
          example, consider booleans and the way they support if-then-else
          and induction.
        </p>

        <h2 className="text-xl font-semibold">Inductive Bool datatype</h2>
        <p>
          Start with an ordinary datatype of booleans with two constructors
          and the usual elimination rule.
        </p>

        <pre className="rounded bg-muted p-3 text-sm overflow-x-auto">
          <code>{`data Bool = True | False`}</code>
        </pre>

        <p>
          This type is inductive in the sense that the only values of Bool
          are True and False, which justifies an if-then-else construct that
          only needs to consider these two cases.
        </p>

        <pre className="rounded bg-muted p-3 text-sm overflow-x-auto">
          <code>{`if True  then M else N = M
if False then M else N = N`}</code>
        </pre>

        <h2 className="text-xl font-semibold">Church encoding of Bool</h2>
        <p>
          In the untyped λ-calculus, a boolean is a function that selects one
          of two arguments, corresponding to the two branches of an
          if-then-else expression.
        </p>

        <pre className="rounded bg-muted p-3 text-sm overflow-x-auto">
          <code>{`true  x y = x
false x y = y`}</code>
        </pre>

        <p>
          In System F, this behavior is captured by the polymorphic encoding
          Bool = ∀R. R → R → R, which generalizes over the result type of the
          branches.
        </p>

        <pre className="rounded bg-muted p-3 text-sm overflow-x-auto">
          <code>{`type Bool = forall R. R -> R -> R

true  : Bool
false : Bool`}</code>
        </pre>

        <h2 className="text-xl font-semibold">Induction principle</h2>
        <p>
          The usual induction principle for booleans says that to show a
          property P : Bool → Type for all booleans, it suffices to show it
          for true and false.
        </p>

        <pre className="rounded bg-muted p-3 text-sm overflow-x-auto">
          <code>{`boolInd :
  forall P : Bool -> Type.
  P true -> P false ->
  forall b : Bool. P b`}</code>
        </pre>

        <p>
          The calculus of constructions cannot define such a function solely
          from the polymorphic encoding Bool = forall R. R -&gt; R -&gt; R,
          so something additional is needed.
        </p>

        <h2 className="text-xl font-semibold">
          Dependent intersections for Bool
        </h2>
        <p>
          One can define a predicate BoolIsInd : Bool → Type that states
          that a given boolean b satisfies the induction principle: whenever
          a property holds for true and false, it also holds for b.
        </p>

        <pre className="rounded bg-muted p-3 text-sm overflow-x-auto">
          <code>{`BoolIsInd : Bool -> Type
BoolIsInd b =
  forall P : Bool -> Type.
  P true -> P false -> P b`}</code>
        </pre>

        <p>
          The specific values true and false can be shown to satisfy
          BoolIsInd using simple programs that choose the appropriate proof.
        </p>

        <pre className="rounded bg-muted p-3 text-sm overflow-x-auto">
          <code>{`trueIsInd  : BoolIsInd true
trueIsInd  p_true p_false = p_true

falseIsInd : BoolIsInd false
falseIsInd p_true p_false = p_false`}</code>
        </pre>

        <p>
          A refined boolean type can then be defined as a dependent
          intersection of a Church boolean and a proof that it satisfies the
          induction principle.
        </p>

        <pre className="rounded bg-muted p-3 text-sm overflow-x-auto">
          <code>{`BoolI : [ b : Bool | BoolIsInd b ]

[true,  trueIsInd]  : BoolI
[false, falseIsInd] : BoolI`}</code>
        </pre>

        <h2 className="text-xl font-semibold">Takeaways</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            The underlying type Bool describes the computational interface of
            booleans (how they select branches).
          </li>
          <li>
            The property BoolIsInd refines booleans with an inductive
            specification, ensuring that proofs by case analysis are valid.
          </li>
          <li>
            Dependent intersection types package a value with such a
            property, letting the same code serve both computation and proof
            roles.
          </li>
        </ul>
      </CardContent>
    </Card>
  </main>)
};