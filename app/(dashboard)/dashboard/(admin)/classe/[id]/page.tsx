export default async function ClasseId({ params }: { params: string }) {
  const { id } = await params;
  return (
    <div>
      <div>{id}</div>
    </div>
  );
}
