import { useEffect, useState } from "react";
import API from "../services/axios";

const Home = () => {
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await API.get('/posts/get-posts'); 
        setPosts(response.data || []);
      } catch (err) {
        console.log('Error fetching posts', err); 
      } finally {
        setLoading(false);  
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6 w-4/6">
      <h1 className="text-3xl font-bold mb-6">Recent Blogs</h1>

      {posts.length === 0 ? (
        <h2 className="text-2xl font-semibold text-gray-600">No posts available</h2>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {posts.map(post => (
            <div key={post._id} className="bg-white shadow-md rounded-lg p-4">
              <div className="text-sm font-bold text-gray-700">
                {post.author?.userName || "Unknown Author"}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mt-2">{post.title}</h2>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Blog post"
                  className="w-full h-48 object-cover rounded-lg mt-4"
                />
              )}
              <p className="text-gray-600 mt-4">{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
