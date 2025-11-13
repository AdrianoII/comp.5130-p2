"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-lg shadow-xl border border-gray-200 p-6">
        <CardHeader className="text-center space-y-5">

          <div className="flex justify-center">
            <Image
              src="/logo2.png"
              alt="Project Logo"
              width={80} // 
              height={80}
              className="rounded-md"
              priority
            />
          </div>

          <CardTitle className="text-2xl font-semibold tracking-tight">
            Sign in
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <Button
            asChild
            variant="outline"
            className="w-full h-12 text-base font-medium border-gray-300 hover:bg-gray-50"
          >
            <Link href="/api/auth/signin/github" onClick={async (e) => {
              e.preventDefault();
              console.log("Signing in with github")
              await authClient.signIn.social({
                provider: "github",
              });
            }}>
              <Github className="mr-2 h-5 w-5" />
              Continue with GitHub
            </Link>
          </Button>

          <p className="text-center text-sm text-gray-500">
            By continuing, you agree to chug some Pints.
          </p>
        </CardContent>
      </Card>
    </section >
  );
}
