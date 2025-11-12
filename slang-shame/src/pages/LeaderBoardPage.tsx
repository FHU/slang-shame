import { Link, useParams } from 'react-router';

const LeaderboardPage = () => {
  const { group } = useParams();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '24px' }}>
      🚧 Under Construction 🚧

      <Link
        to={`/${group}`}
        style={{ display: 'block', marginTop: '20px', color: 'blue', fontSize: '18px' }}
      >
        Back
      </Link>
    </div>
  );
};

export default LeaderboardPage
