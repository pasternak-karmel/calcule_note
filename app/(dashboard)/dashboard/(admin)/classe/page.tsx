import { Button } from "@/components/ui/button";
import AddTraduction from "../_components/traduction";
import { GetClasses } from "@/actions/getClasses";
import { DataTable } from "./data-table";
import { Columns } from "./columns";

export default async function Classe() {
  const data = await GetClasses();
  return (
    <div>
      <AddTraduction>
        <Button>Ajouter une classe</Button>
      </AddTraduction>
      <h1 className="text-2xl text-center mt-6 underline">Vos classes</h1>
      {"error" in data ? (
        <div className="text-center">{data.error}</div>
      ) : (
        <DataTable columns={Columns} data={data} />
      )}
    </div>
  );
}
