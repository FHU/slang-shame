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
      className="h-screen flex flex-col justify-center items-center text-center px-5 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/Dark404.jpg")' }}
    >
      {/* Stylized 404 text */}
      <h1 className="text-9xl mb-2 text-(--color-primary) drop-shadow-lg">
        404
      </h1>

      {/* Humor-infused message */}
      <p className="text-2xl mb-4 text-white drop-shadow-md">
        This page got rizzed away.<br />
        NPC behavior tbh. Touch grass and head back →
      </p>

      {/* Action buttons */}
      <div className="flex gap-4 mb-6">
        <Link
          to={params.group ? `/${params.group}` : "/FHU"}
          className="px-5 py-2.5 bg-(--color-primary) text-black rounded-lg no-underline font-bold shadow-lg hover:opacity-90 transition-opacity"
        >
          Go home (touch grass)
        </Link>

        <button
          onClick={handleRefresh}
          className="px-5 py-2.5 bg-[#222] text-white rounded-lg font-bold border-none cursor-pointer shadow-lg hover:bg-[#333] transition-colors"
        >
          Refresh (maybe it respawns)
        </button>
      </div>

      {/* Footer message */}
      <p className="text-base opacity-80 text-white">
        Or try searching the site — maybe the page just pulled a 6-7 and is shy.
      </p>
    </div>
  );
};

export default NotFound;