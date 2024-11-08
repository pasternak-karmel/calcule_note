import { Button } from "@/components/ui/button";
import AddTraduction from "../_components/traduction";

export default function ProfesseurPage() {
  return (
    <div>
      <AddTraduction
        redirectOptions="professeur"
        title="professeur"
        description="Entrez les infos du professeur"
      >
        <Button>Ajouter un professeur</Button>
      </AddTraduction>
    </div>
  );
}
