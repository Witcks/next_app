"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import envConfig from "@/config";
import { toast } from "sonner";
import { useAppContext } from "@/app/AppProvider";

export default function LoginForm() {
  const { setSessionToken } = useAppContext();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginBodyType) {
    try {
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_APT_ENDPOINT}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }
        return data;
      });
      toast.success(result?.payload?.message);
      fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify(result),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }
        return data;
      });
      setSessionToken(result?.payload?.data?.token);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errors = error?.payload?.errors as {
        message: string;
        field?: string;
      }[];
      const status = error?.status as number;
      if (status === 422) {
        errors.forEach((err) => {
          form.setError(err.field as "email" | "password", {
            type: "server",
            message: err.message,
          });
        });
      } else {
        toast.error(error?.payload?.message);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[400px] flex-shink-0 w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}
