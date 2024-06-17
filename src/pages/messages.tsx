// src/pages/messages.tsx
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import styles from './dashboard.module.css'; // Ensure this path is correct
import { GetServerSideProps, NextPage } from 'next';
import clientPromise from '../lib/mongodb'; // Adjust the path to your db file
import { Movie } from './types/movie'; // Adjust the path to your types file
import NavBar from '@/components/NavBar';

interface MoviesPageProps {
movies: Movie[];
error?: string;
}

export const getServerSideProps: GetServerSideProps<MoviesPageProps> = async () => {
try {
const client = await clientPromise;
const db = client.db('sample_mflix'); // Replace with your database name
const movies = await db.collection('movies').find({}).toArray();


return {
  props: { movies: JSON.parse(JSON.stringify(movies)) },
};
} catch (error) {
console.error(error);
return {
props: { movies: [], error: 'Failed to fetch movies' },
};
}
};

const Movies: NextPage<MoviesPageProps> = ({ movies, error }) => {
if (error) {
return <div>Error: {error}</div>;
}

if (!movies || movies.length === 0) {
return <div>No movies found</div>;
}

return (
<div>
<h1>Movies</h1>
<SignedIn>
{/* Content to display when user is signed in */}
<p>Welcome! You are signed in.</p>

    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <li key={movie._id}>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
        </li>
      ))}
    </ul>
  </SignedIn>
  <SignedOut>
    {/* Redirect to sign-in page when user is signed out */}
    <RedirectToSignIn />
  </SignedOut>
</div>
);
};

export default Movies;