import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IMG_BASE_URL, IMG_DEFAULT, getMovieCastById } from 'servises/api';

const Cast = () => {
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setLoading(true);
    getMovieCastById(movieId)
      .then(({ cast }) => setCast(cast))
      .catch(error => alert(error.message))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <ul>
          {cast?.map(({ id, name, character, profile_path }) => (
            <li key={id}>
              <div>
                <img
                  src={profile_path ? IMG_BASE_URL + profile_path : IMG_DEFAULT}
                  alt="actor"
                  width="200"
                  height="300"
                />
                <h2>{name}</h2>
                <h3>Character: {character}</h3>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Cast;
