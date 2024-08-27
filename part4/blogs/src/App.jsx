import { useEffect, useState } from "react";
import BlogsForm from "./components/BlogsForm";
import BlogsList from "./components/BlogsList";
import blogsServices from "./services/blogs";
import "./styles/app.css";

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Obtener todos los blogs
    blogsServices
      .getAll()
      .then((initialBlogs) => {
        setBlogs(initialBlogs);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="app">
      <h1>Blogs</h1>
      <BlogsForm blogs={blogs} setBlogs={setBlogs} />
      <BlogsList blogs={blogs} setBlogs={setBlogs} />
    </div>
  );
}

export default App;
