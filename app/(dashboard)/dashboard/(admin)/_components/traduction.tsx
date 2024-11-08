"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AddProfesseurForm } from "./professeur-form";
import { AddTraductionForm } from "./traduction-form";

interface TraductionProps {
  children?: React.ReactNode;
  asChild?: boolean;
  redirectOptions: string;
  title: string;
  description: string;
}

export const AddTraduction = ({
  children,
  redirectOptions,
  title,
  description,
}: TraductionProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nouvelle {title}</SheetTitle>
          <SheetDescription>Entrez les infos {description}</SheetDescription>
        </SheetHeader>
        {redirectOptions === "classe" ? (
          <AddTraductionForm />
        ) : (
          <AddProfesseurForm />
        )}
      </SheetContent>
    </Sheet>
  );
};
export default AddTraduction;
