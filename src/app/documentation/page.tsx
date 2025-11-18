export default function Documentation() {
  return (
    <article className="mx-auto max-w-5xl p-6 prose prose-amber lg:prose-xl">
      <h1 className="font-semibold">Documentation</h1>
      <p>
        A simple command-line interpreter for untyped and simply-typed lambda calculus, written in Haskell.
        It can <strong>evaluate lambda terms to normal form</strong> and <strong>infer their types</strong> using the Curry-Howard correspondence (Simply Typed Lambda Calculus).
      </p>

      <h2>Features</h2>

      <ul>
        <li><strong>Evaluation</strong>: Computes the normal form of a lambda term using normal-order (leftmost, outermost) reduction.</li>
        <li><strong>Type Inference</strong>: Infers the type of a lambda term in the simply-typed lambda calculus using Algorithm W.</li>
      </ul>

      <h2>Compilation</h2>

      <pre><code className="language-sh">ghc -o lambda-calc Lambda.hs
      </code></pre>

      <h2>Usage</h2>

      <pre><code className="language-sh">./lambda-calc eval &quot;&lt;lambda_term&gt;&quot;
        ./lambda-calc type &quot;&lt;lambda_term&gt;&quot;
      </code></pre>

      <ul>
        <li><strong>eval</strong>: Parses and evaluates the input lambda term.</li>
        <li><strong>type</strong>: Parses and infers the type of the input lambda term.</li>
      </ul>

      <h2>Syntax</h2>

      <ul>
        <li><strong>Variables:</strong> <code>x</code>, <code>y</code>, <code>foo</code></li>
        <li><strong>Abstraction (lambda):</strong> <code>\x. term</code></li>
        <li><strong>Application:</strong> <code>f x</code>, <code>(\x. x) y</code></li>
        <li><strong>Parentheses</strong> are supported for grouping: <code>(\x. x)</code></li>
      </ul>

      <h3>Examples:</h3>
      <ul>
        <li><code>\x. x</code> — the identity function</li>
        <li><code>(\x. x) (\y. y)</code> — application</li>
        <li><code>\f. \x. f (f x)</code> — double function application</li>
      </ul>

      <h2>Example Commands</h2>

      <h3>Example 1: Evaluation (Identity Function)</h3>

      <p><strong>Command</strong></p>
      <pre><code className="language-sh">./lambda-calc eval &quot;\x. x&quot;
      </code></pre>

      <p><strong>Output</strong></p>
      <pre><code className="language-text">Input: \x. x
        Parsed: (\x. x)
        Result: (\x. x)
      </code></pre>

      <h3>Example 2: Evaluation (Application of Identity)</h3>

      <p><strong>Command</strong></p>
      <pre><code className="language-sh">./lambda-calc eval &quot;(\x. x) (\y. y)&quot;
      </code></pre>

      <p><strong>Output</strong></p>
      <pre><code className="language-text">Input: (\x. x) (\y. y)
        Parsed: ((\x. x) (\y. y))
        Result: (\y. y)
      </code></pre>

      <h3>Example 3: Evaluation (Self-application)</h3>

      <p><strong>Command</strong></p>
      <pre><code className="language-sh">./lambda-calc eval &quot;(\x. x x) (\y. y)&quot;
      </code></pre>

      <p><strong>Output</strong></p>
      <pre><code className="language-text">Input: (\x. x x) (\y. y)
        Parsed: ((\x. x x) (\y. y))
        Result: (\y. y)
      </code></pre>

      <h3>Example 4: Type Inference (Identity Function)</h3>

      <p><strong>Command</strong></p>
      <pre><code className="language-sh">./lambda-calc type &quot;\x. x&quot;
      </code></pre>

      <p><strong>Output</strong></p>
      <pre><code className="language-text">Input: \x. x
        Parsed: (\x. x)
        Type: t0 -&gt; t0
      </code></pre>

      <h3>Example 5: Type Inference (Function Composition)</h3>

      <p><strong>Command</strong></p>
      <pre><code className="language-sh">./lambda-calc type &quot;\f. \x. f (f x)&quot;
      </code></pre>

      <p><strong>Output</strong></p>
      <pre><code className="language-text">Input: \f. \x. f (f x)
        Parsed: (\f. (\x. (f (f x))))
        Type: (t0 -&gt; t0) -&gt; t0 -&gt; t0
      </code></pre>

      <h3>Example 6: Type Error (Non-typable term)</h3>

      <p><strong>Command</strong></p>
      <pre><code className="language-sh">./lambda-calc type &quot;(\x. x x)&quot;
      </code></pre>

      <p><strong>Output</strong></p>
      <pre><code className="language-text">Input: (\x. x x)
        Parsed: (\x. (x x))
        Type Error: Infinite type (occurs check failed): t0 in (t0 -&gt; t1)
      </code></pre>

      <h2>Notes</h2>

      <ul>
        <li><strong>Type Variables:</strong> When inferring types, fresh type variables are generated as <code>t0</code>, <code>t1</code>, etc.</li>
        <li><strong>Non-typable Terms:</strong> The interpreter will return a type error if the term is not typable in the simply-typed lambda calculus.</li>
        <li><strong>Variable Capture:</strong> The evaluator handles variable capture by alpha-renaming when necessary.</li>
      </ul>

      <h2>Example Lambda Terms</h2>

      <table>
        <thead>
          <tr>
            <th>Term</th>
            <th>Meaning</th>
            <th>Example Evaluation (Result)</th>
            <th>Example Type (inferred)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>\x. x</code></td>
            <td>Identity</td>
            <td><code>\x. x</code></td>
            <td><code>t0 -&gt; t0</code></td>
          </tr>
          <tr>
            <td><code>\x. \y. x</code></td>
            <td>K combinator</td>
            <td><code>\x. (\y. x)</code></td>
            <td><code>t0 -&gt; t1 -&gt; t0</code></td>
          </tr>
          <tr>
            <td><code>(\x. x) (\y. y)</code></td>
            <td>Application of identity</td>
            <td><code>\y. y</code></td>
            <td><code>t0 -&gt; t0</code></td>
          </tr>
          <tr>
            <td><code>\f. \x. f (f x)</code></td>
            <td>Twice combinator (S)</td>
            <td><code>\f. (\x. f (f x))</code></td>
            <td><code>(t0 -&gt; t0) -&gt; t0 -&gt; t0</code></td>
          </tr>
          <tr>
            <td><code>(\x. x x) (\y. y)</code></td>
            <td>Self-application, evaluates</td>
            <td><code>\y. y</code></td>
            <td>Type Error (not typable)</td>
          </tr>
          <tr>
            <td><code>(\x. x x) (\x. x x)</code></td>
            <td>Omega, diverges</td>
            <td>(No result: infinite loop)</td>
            <td>Type Error (not typable)</td>
          </tr>
        </tbody>
      </table>

      <h2>Error Handling</h2>

      <ul>
        <li><strong>Unbound Variable:</strong> If a variable is not in scope during type inference, the interpreter reports it.</li>
        <li><strong>Infinite Type:</strong> If the occurs check fails (for example, attempting to unify a type variable with a type containing itself), a type error is printed.</li>
        <li><strong>Parser Errors:</strong> Malformed terms produce parsing errors.</li>
      </ul>

      <h2>Advanced</h2>

      <ul>
        <li><strong>Extendable:</strong> The interpreter is a good base for expanding to more advanced type systems, adding let-bindings, or supporting more complex grammars.</li>
      </ul>

    </article>
  );
}
