import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";


const MyPosts = () => {
  const [posts, setPosts] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await API.get('/posts/my-posts');
        setPosts(response.data.posts || []);
      } catch (err) {
        console.log('Error fetching posts', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMyPosts();
  }, []);

  const handleEdit = (postId) => {    
    navigate(`/edit-post/${postId}`); 
  };

  const handleDelete = async () => {
    try {
      if (postToDelete) {        
        await API.delete(`/posts/delete-post/${postToDelete}`); 
        setPosts(posts.filter(post => post._id !== postToDelete)); 
        setShowModal(false);
      }
    } catch (err) {
      console.log('Error deleting post', err); 
    }
  };

  const openModal = (postId) => {
    setPostToDelete(postId); 
    setShowModal(true); 
  };

  const closeModal = () => {
    setShowModal(false); 
    setPostToDelete(null); 
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6 w-4/6">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">My Posts</h1>

        {posts.length === 0 ? (
          <h2 className="text-2xl font-semibold text-gray-600 text-center">No posts available</h2>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {posts.map(post => (
              <div key={post._id} className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold text-gray-800 mt-2">{post.title}</h2>
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="Blog post"
                    className="w-full h-48 object-cover rounded-lg mt-4"
                  />
                )}
                <p className="text-gray-600 mt-4">{post.content}</p>
                <div className="mt-4 flex justify-between">
                  <button 
                    onClick={() => handleEdit(post._id)} 
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-4 rounded">
                    Edit
                  </button>
                  <button 
                    onClick={() => openModal(post._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this post?</p>
            <div className="mt-6 flex justify-between">
              <button 
                onClick={closeModal} 
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
