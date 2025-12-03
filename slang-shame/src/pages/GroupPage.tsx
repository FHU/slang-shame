import GroupTitle from '../components/GroupTitle';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Client, Databases } from "appwrite";

export const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const databases = new Databases(client);

interface Group {
  $id: string;
  groupName: string;
  // description?: string;
}

function GroupCard({ group }: { group: Group }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "#fafafa"
      }}
    >
      <img
        src="https://fhu.edu/wp-content/uploads/faculty-placeholder.jpg"
        alt={group.groupName}
        style={{
          width: "80px",
          height: "80px",
          objectFit: "cover",
          borderRadius: "50%"
        }}
      />

      <div style={{ flexGrow: 1 }}>
        <h2 style={{ margin: 0 }}>{group.groupName}</h2>
      </div>

      <Link
        to={`/${group.$id}`}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          border: "none",
          background: "#1d4ed8",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
          textDecoration: "none"
        }}
      >
        Open
      </Link>
    </div>
  );
}

export const GroupPage = () => {
  const params = useParams();
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const res = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DB_ID,
          import.meta.env.VITE_APPWRITE_GROUP_TABLE
        );

        const mapped: Group[] = res.documents.map((doc: any) => ({
          $id: doc.$id,
          groupName: doc.groupName,
          // description: doc.description,
        }));

        setGroups(mapped);
      } catch (err) {
        console.error("Error fetching groups:", err);
      }
    };

    loadGroups();
  }, []);

  return (
    <>
      <div>
      <GroupTitle />
      {params.group}
    </div>

    <div className="flex justify-center items-center mt-4">
      <Link
        to={`/${params.group}/report/123`}
        className="text-4xl font-bold text-blue-600 text-center no-underline"
    >
        Report Someone
      </Link>
    </div>

    <div className="flex justify-center items-center mt-4">
      <Link to={`/${params.group}/leaderboard`}>
          <div className="text-4xl font-bold text-blue-600 text-center no-underline">
            Leaderboard
          </div>
        </Link>

    </div>

    <div className="flex justify-center items-center mt-4"></div>
      <h1>Groups</h1>

      {groups.map((g) => (
        <GroupCard key={g.$id} group={g} />
      ))}
    </>
  );
};

export default GroupPage;