import { getUser } from "@/lib/session";

const Dashboard = async () => {
  const user = await getUser();
  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};
export default Dashboard;