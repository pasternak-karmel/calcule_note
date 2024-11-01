"use client";
import {
  Sheet,
  // SheetClose,
  SheetContent,
  SheetDescription,
  // SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AddTraductionForm } from "./traduction-form";

interface TraductionProps {
  children?: React.ReactNode;
  asChild?: boolean;
}

export const AddTraduction = ({ children }: TraductionProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nouvelle classe</SheetTitle>
          <SheetDescription>Entrez les infos de la classe</SheetDescription>
        </SheetHeader>
        <AddTraductionForm />
      </SheetContent>
    </Sheet>
  );
};
export default AddTraduction;
