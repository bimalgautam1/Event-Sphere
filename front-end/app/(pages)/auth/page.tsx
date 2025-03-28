"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";
import { axiosPublic } from "@/axios/axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FormData {
  username?: string;
  email: string;
  password?: string;
  role: "attendee" | "organizer";
}

interface LoginCredentials {
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    role: "attendee",
  });

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axiosPublic.post("/auth/register", formData);
      if (res.status !== 200) {
        toast.error(res.data.message);
        return;
      }
      toast.success(
        activeTab === "register"
          ? "Registration Successful. Your account has been created."
          : "Login Successful."
      );
      if (activeTab === "register") setActiveTab("login");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (data: LoginCredentials) => {
    const loadingToast = toast.loading("Signing in...");

    try {
      console.log(data, "login data");

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/",
      });

      toast.dismiss(loadingToast);

      if (result?.error) {
        console.error(result.error, "error from signIn");
        throw new Error(
          result.error === "CredentialsSignin"
            ? "Invalid email or password"
            : result.error
        );
      }

      if (result?.ok) {
        toast.success("Logged in successfully");
        router.push("/dashboard");
        router.refresh();
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Welcome
        </CardTitle>
        <CardDescription className="text-center">
          Sign in or create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "login" | "register")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              activeTab === "login"
                ? handleLogin({
                    email: formData.email,
                    password: formData.password!,
                  })
                : handleSubmit(e);
            }}
            className="space-y-4"
          >
            {activeTab === "register" && (
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? "Processing..."
                : activeTab === "login"
                ? "Sign In"
                : "Create Account"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <div className="mt-4 text-sm text-center">
            <p className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors">
              Forgot your password?
            </p>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
