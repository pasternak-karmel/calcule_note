"use client";

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
import { CreateProfesseur } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function AddProfesseurForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof CreateProfesseur>>({
    resolver: zodResolver(CreateProfesseur),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof CreateProfesseur>) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/professeur`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || `Erreur HTTP: ${response.status}`);
      }

      toast.success("Succès", {
        description: result.message,
      });
      form.reset();
      router.push(`/professeur/${result.message}`);
    } catch (err) {
      toast.error("Erreur", {
        description:
          err instanceof Error
            ? err.message
            : "Une erreur inconnue est survenue.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-auto space-y-1 grid gap-6"
        >
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading}>
            {loading ? "En cours..." : "Créer"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
