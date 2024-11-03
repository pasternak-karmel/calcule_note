"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateTraductionSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AddTraductionForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof CreateTraductionSchema>>({
    resolver: zodResolver(CreateTraductionSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof CreateTraductionSchema>) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/classe`, {
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
          <Button disabled={loading}>
            {loading ? "En cours..." : "Créer"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
