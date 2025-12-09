import { Link, useParams } from 'react-router';

const LeaderboardPage = () => {
  const { group } = useParams();

  return (
    <div className="min-h-screen bg-white dark:bg-(--color-black) transition-colors flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-(--color-primary) mb-8">
          🚧 Under Construction 🚧
        </h1>

        <Link
          to={`/${group}`}
          className="inline-block mt-8 text-2xl font-semibold text-(--color-secondary) hover:text-(--color-primary) transition-colors underline"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default LeaderboardPage
