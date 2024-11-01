"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { useCurrentUser } from "@/hooks/use-current-user";
import { CreateTraductionSchema } from "@/schemas";
import { useRouter } from "next/navigation";
// import { BeatLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
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

export function AddTraductionForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  
  const form = useForm<z.infer<typeof CreateTraductionSchema>>({
    resolver: zodResolver(CreateTraductionSchema),
    defaultValues: {
      nom: ""
    },
  });


  const onSubmit = async (values: z.infer<typeof CreateTraductionSchema>) => {
   
  };



  return (

   <div>
     <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-auto space-y-1 grid gap-6"
      >
        {/* <div className="grid gap-4"> */}
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Nom"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

            )}

          />
           <Button
            type="submit"
            disabled={loading}
          
          >
            {loading ? "En cours..." : "Valider la traduction"}
          </Button>
          </form>
    </Form>
   </div>
  );
}
