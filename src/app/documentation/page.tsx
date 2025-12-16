"use client";

import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/shared/languageswitcher";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Documentation() {
  const pathname = usePathname();
  const { t } = useTranslation("common");
  return (<main className="prose-math">
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          {t("documentation.title")}
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6 space-y-4">
        <p>
          {t("documentation.desc")}
        </p>

        <h2 className="text-xl font-semibold">{t("documentation.inductive")}</h2>
        <p>
          {t("documentation.1")}
        </p>

        <pre className="rounded bg-muted p-3 text-sm overflow-x-auto">
          <code>{`data Bool = True | False`}</code>
        </pre>

        <p>
          {t("documentation.2")}
        </p>

        <pre className="rounded bg-muted p-3 text-sm overflow-x-auto">
          <code>{`if True  then M else N = M
if False then M else N = N`}</code>
        </pre>

        <h2 className="text-xl font-semibold">{t("documentation.church")}</h2>
        <p>
          {t("documentation.3")}
        </p>

        <pre className="rounded bg-muted p-3 text-sm overflow-x-auto">
          <code>{`true  x y = x
false x y = y`}</code>
        </pre>

        <p>
          {t("documentation.4")}
        </p>

        <pre className="rounded bg-muted p-3 text-sm overflow-x-auto">
          <code>{`type Bool = forall R. R -> R -> R

true  : Bool
false : Bool`}</code>
        </pre>

        <h2 className="text-xl font-semibold">{t("documentation.induction")}</h2>
        <p>
          {t("documentation.5")}
        </p>

        <pre className="rounded bg-muted p-3 text-sm overflow-x-auto">
          <code>{`boolInd :
  forall P : Bool -> Type.
  P true -> P false ->
  forall b : Bool. P b`}</code>
        </pre>

        <p>
          {t("documentation.6")}
        </p>

        <h2 className="text-xl font-semibold">
          {t("documentation.dependent")}
        </h2>
        <p>
          {t("documentation.7")}
        </p>

        <pre className="rounded bg-muted p-3 text-sm overflow-x-auto">
          <code>{`BoolIsInd : Bool -> Type
BoolIsInd b =
  forall P : Bool -> Type.
  P true -> P false -> P b`}</code>
        </pre>

        <p>
          {t("documentation.8")}
        </p>

        <pre className="rounded bg-muted p-3 text-sm overflow-x-auto">
          <code>{`trueIsInd  : BoolIsInd true
trueIsInd  p_true p_false = p_true

falseIsInd : BoolIsInd false
falseIsInd p_true p_false = p_false`}</code>
        </pre>

        <p>
          {t("documentation.9")}
        </p>

        <pre className="rounded bg-muted p-3 text-sm overflow-x-auto">
          <code>{`BoolI : [ b : Bool | BoolIsInd b ]

[true,  trueIsInd]  : BoolI
[false, falseIsInd] : BoolI`}</code>
        </pre>

        <h2 className="text-xl font-semibold">{t("documentation.takeaways")}</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            {t("documentation.takeaways1")}
          </li>
          <li>
            {t("documentation.takeaways2")}
          </li>
          <li>
            {t("documentation.takeaways3")}
          </li>
        </ul>
      </CardContent>
    </Card>
  </main>)
};