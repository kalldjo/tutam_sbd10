import { useEffect, useState } from "react";
import axios from "axios";
import backgroundImage from "../assets/movies-bg.jpg";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

  const API = "http://localhost:3000/movies";

  const getMovies = async () => {
    try {
      const res = await axios.get(API);
      setMovies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const addMovie = async () => {
    if (!title || !year || !rating) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(API, {
        title,
        year,
        rating,
      });

      setTitle("");
      setYear("");
      setRating("");
      getMovies();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      getMovies();
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <div className="bg-[#F8F5F0] text-[#1E1E2F]">

    {/*hero section*/}
    <section
      className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-center px-6"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-[#1E1E2F]/70 text-white backdrop-blur-sm p-8 rounded-xl">
        <h1 className="text-6xl font-bold mb-4">
          Welcome Cinephile!
        </h1>

        <p className="text-xl text-gray-300">
            Every movie tells a story worth remembering. <br />
            Save your favorites and build your personal watch history in Kotakhuruf
        </p>
      </div>
    </section>

    <div className="w-full h-[3px] bg-[#C97B63]"></div>


    {/*watcjed movies*/}
    <section className="min-h-screen px-10 py-20">
      <h2 className="text-4xl font-bold mb-10 text-center text-[#1E1E2F]">
        Watched Movies
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-[#EAE3D2] p-6 rounded-lg shadow-lg text-[#1E1E2F] border border-[#C97B63]/30"
          >
            <h3 className="text-2xl font-semibold mb-2">
              {movie.title}
            </h3>

            <p className="text-[#5A5A6E]">
              Release Year: {movie.year}
            </p>

            <p className="text-[#C97B63] mb-4 font-semibold">
              Rating: ⭐ {movie.rating}/5
            </p>

            <button
              onClick={() => deleteMovie(movie._id)}
              className="bg-[#C97B63] text-white px-4 py-2 rounded hover:bg-[#b96b54]"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>

    <div className="w-full h-[3px] bg-[#C97B63]"></div>


    {/*add movie*/}
    <section className="min-h-screen px-10 py-20 bg-[#1E1E2F] text-white">
      <h2 className="text-4xl font-bold mb-10 text-center text-white">
        Add New Movie
      </h2>

      <div className="max-w-xl mx-auto bg-[#EAE3D2] p-8 rounded-lg border border-[#C97B63]/20 shadow-lg">
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 mb-4 bg-[#1A1A2E] text-white placeholder-gray-300 rounded border border-[#C97B63]/20"
        />

        <input
          type="number"
          placeholder="Release Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full p-4 mb-4 bg-[#1A1A2E] text-white placeholder-gray-300 rounded border border-[#C97B63]/20"
        />

        <input
          type="number"
          min="0"
          max="5"
          placeholder="Rating (0-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-4 mb-4 bg-[#1A1A2E] text-white placeholder-gray-300 rounded border border-[#C97B63]/20"
        />

        <button
          onClick={addMovie}
          className="w-full bg-[#C97B63] text-white py-3 rounded font-semibold hover:bg-[#b96b54]"
        >
          Add Movie
        </button>
      </div>
    </section>
  </div>
);
};

export default Home;