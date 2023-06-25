import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://gorest.co.in/public/v2/posts');
      setPosts(response.data);
      fetchAllComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllComments = async (posts) => {
    try {
      const commentPromises = posts.map((post) =>
        axios.get(`https://gorest.co.in/public/v2/comments?post_id=${post.id}`)
      );
      const commentResponses = await Promise.all(commentPromises);
      const allComments = commentResponses.map((response) => response.data);
      console.log(allComments,"all comment");
      setComments(allComments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handlePostComment = async (postId) => {
    try {
      const response = await axios.post('https://gorest.co.in/public/v2/comments', {
        post_id: postId,
        body: newComment,
      });
      console.log(response.data);
      setNewComment('');
      fetchComments(postId);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`https://gorest.co.in/public/v2/comments?post_id=${postId}`);
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: response.data.data,
      }));
      console.log(comments, "NNNNNNNNN")
    } catch (error) {
      console.log(error);
    }
  };
console.log(comments, posts, "TTTTTTTTT")
  return (
    <div>
      <h1>User Posts</h1>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div className="card my-3" key={post.id}>
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.body}</p>
              <Link to={`/user-details/${post.userId}`} className="btn btn-primary">
                View Details
              </Link>
              <div>
                <h6>Comments:</h6>
                {comments.find(c => (c.post_id === post.id)) &&
                  comments.map((comment) => (
                    <p key={comment.id}>{comment.body}</p>
                  ))}
              </div>
              <div>
                <input
                  type="text"
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Add a comment"
                />
                <button onClick={() => handlePostComment(post.id)}>Post Comment</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
};

export default UserPosts;
