import React from "react";
import { useState } from "react";
import blogsServices from "../services/blogs";

export default function MoviesForm({ blogs, setBlogs }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // encuentra el blog basado en el título
    const existingBlog = blogs.find((blog) => blog.title === title);

    if (existingBlog) {
      //Confirma si el user quiere cambiar el blog
      if (
        window.confirm(
          `${existingBlog.title} is in the list, doy yo want to change it?`
        )
      ) {
        //Crea un nuevo objeto con los cambios
        const titleChange = {
          ...existingBlog,
          title: title,
          author: author,
          url: url,
        };

        //Llama a blogsServices para actualizar el blog
        blogsServices
          .update(existingBlog.id, titleChange)
          .then((updatedBlog) => {
            // Actualiza la oista de blogs con el blog modificado
            setBlogs(
              blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
            );

            //Limpia los campos de entrada
            setTitle("");
            setAuthor("");
            setUrl("");
          });
      }
    }

    const newId = Math.floor(Math.random() * 1000);

    const newBlog = {
      id: newId,
      title: title,
      author: author,
      url: url,
      votes: 0,
    };

    blogsServices
      .createBlog(newBlog)
      .then((createdBlog) => {
        setBlogs(blogs.concat(createdBlog));
        setTitle("");
        setAuthor("");
        setUrl("");
      })
      .catch((error) => {
        console.error(`Error adding blog`, error);
      });

    console.log(`The blog ${title} has been added!`);
  }

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }
  function handleChangeAuthor(e) {
    setAuthor(e.target.value);
  }
  function handleChangeUrl(e) {
    setUrl(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      Title:
      <input
        type="text"
        onChange={handleChangeTitle}
        value={title}
        placeholder="Add title"
      />
      Author:
      <input
        type="text"
        onChange={handleChangeAuthor}
        value={author}
        placeholder="Add autor"
      />
      URL:
      <input
        type="text"
        onChange={handleChangeUrl}
        value={url}
        placeholder="Add URL"
      />
      <button type="submit">Add Blog</button>
    </form>
  );
}
