import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './api/postslice';

function PostsList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.posts);
  const { products } = useSelector((state) => state.product);
  console.log(products)

  useEffect(() => {
   dispatch(fetchPosts());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <ul>
      {items.map((post) => (
        <li key={post.id}>
          <strong>{post.title}</strong> — {post.body}
        </li>
      ))}
    </ul>
  );
}

export default PostsList;
