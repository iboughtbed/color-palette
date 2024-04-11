import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { OAuthSignIn } from "../_components/oauth-signin";

export default function SignInPage() {
  return (
    <>
      <div className="relative flex min-h-screen flex-col items-center justify-center">
        <Card className="md:min-w-80">
          <CardHeader>
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <CardDescription>
              Choose your preferred sign in method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OAuthSignIn />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
