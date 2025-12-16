// app/page.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/shared/languageswitcher";
import { useTranslation } from "react-i18next";

export default function Home() {
  const pathname = usePathname();
  const { t } = useTranslation("common");
  
  return (
    <div className="mx-auto max-w-5xl prose prose-amber lg:prose-xl text-center">
      <div className="mb-6 text-center">
        <p className="text-xs uppercase tracking-wider text-gray-500">{t("home.overviewLabel")}</p>
        <h1 className="mt-2 text-2xl font-semibold leading-tight">
          <strong className="text-amber-600">Pint</strong>{t("home.heroSubtitle")}
        </h1>
        <p className="mt-2 max-w-3xl lg:max-w-full text-sm text-justify leading-6 text-gray-600">
          <strong className="text-amber-600">Pint</strong>{t("home.description.body1")}<a className="" href="https://github.com/sweirich/pi-forall">Piforall</a>{t("home.description.body2")}<strong>intersection</strong>{t("home.description.body3")}<strong>union</strong>{t("home.description.body4")}
        </p>
        <p className="mt-2 max-w-3xl lg:max-w-full text-sm text-justify leading-6 text-gray-600">
          <strong className="text-amber-600">Pint</strong>{t("home.description.body5")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("home.contributions.title")}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-justify text-gray-600">
            <ul className="list-disc list-inside space-y-1 text-gray-900">
              <li>
                {t("home.contributions.bullet1")} <a href="https://personal.cis.strath.ac.uk/conor.mcbride/PlentyO-CR.pdf"
                  className="text-blue-600 hover:underline">
                  Conor&apos;s system
                </a>
                .
              </li>
              <li>
                {t("home.contributions.bullet2")}
              </li>
              <li>
                {t("home.contributions.bullet3")}
              </li>
              <li>
                {t("home.contributions.bullet4")}
              </li>
              <li>
                {t("home.contributions.bullet5")}
              </li>
              <li>
                {t("home.contributions.bullet6")}
              </li>
              <li>
                {t("home.contributions.bullet7")}
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("home.interpreter.title")}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-justify text-gray-600">
            {t("home.interpreter.body")}
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("home.source.title")}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-center text-gray-600">
              {t("home.source.body.beforeGithub")} <a href="https://github.com/SmoothThunk/pi-forall" >GitHub</a>.
              <br />
              {t("home.source.body.afterGithub")}
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
