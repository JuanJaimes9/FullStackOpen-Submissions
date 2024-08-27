import React from "react";
import blogsServices from "../services/blogs";

function BlogsList({ blogs, setBlogs }) {
  function deleteBlog(id) {
    const blogToDelete = blogs.find((b) => b.id === id);

    if (blogToDelete) {
      if (window.confirm(`Do you want to delete ${blogToDelete.title}?`)) {
        blogsServices
          .deleteBlog(id)
          .then(() => {
            setBlogs(blogs.filter((b) => b.id !== id));
          })
          .catch((error) => {
            console.error(`${blogToDelete.title} can't be removed`, error);
          });
      }
    }
  }

  function handleVote(id) {
    const blogToVote = blogs.find((b) => b.id === id);

    if (blogToVote) {
      const updatedBlog = { ...blogToVote, votes: blogToVote.votes + 1 };

      blogsServices.update(blogToVote.id, updatedBlog).then((votedBlog) => {
        setBlogs(blogs.map((b) => (b.id === votedBlog.id ? votedBlog : b)));
      });
    }
  }

  return (
    <div className="blogList">
      {blogs.map((blog) => (
        <div className="blog" key={blog.id}>
          <h3 className="blogTitle">{blog.title}</h3>
          <p className="blogAuthor">{blog.author}</p>
          <p className="blogVotes">{blog.votes}</p>
          <div className="buttonsDiv">
            <a href={blog.url} className="visitButton" target="_blank">
              Visit Blog
            </a>
            <button className="voteBtn" onClick={() => handleVote(blog.id)}>
              Vote
            </button>
          </div>
          <button className="deleteButton" onClick={() => deleteBlog(blog.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default BlogsList;
