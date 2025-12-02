import React from "react";
import { Link, useParams, useNavigate } from "react-router";

const NotFound: React.FC = () => {
  const params = useParams<{ group?: string }>();
  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate(0);
  };

  return (
    <div
      style={{
        backgroundImage: 'url("/Dark404.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textAlign: "center",
        padding: "0 20px",
        textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
      }}
    >
      {/* Stylized 404 text */}
      <h1 style={{ fontSize: "6rem", marginBottom: "0.5rem", color: "#8f1520" }}>404</h1>

      {/* Humor-infused message */}
      <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        This page got rizzed away.<br />
        NPC behavior tbh. Touch grass and head back →
      </p>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        <Link
          to={params.group ? `/${params.group}` : "/FHU"}
          style={{
            padding: "10px 20px",
            backgroundColor: "#8f1520",
            color: "#000",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          Go home (touch grass)
        </Link>

        <button
          onClick={handleRefresh}
          style={{
            padding: "10px 20px",
            backgroundColor: "#222",
            color: "#fff",
            borderRadius: "8px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          Refresh (maybe it respawns)
        </button>
      </div>

      {/* Footer message */}
      <p style={{ fontSize: "1rem", opacity: 0.8 }}>
        Or try searching the site — maybe the page just pulled a 6-7 and is shy.
      </p>
    </div>
  );
};

export default NotFound;
