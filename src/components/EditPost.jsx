import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import API from "../services/axios";

const EditPost = () => {
  const { postId } = useParams(); 
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
  });
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    console.log(postId);
    
    const fetchPostDetails = async () => {
      try {
        const response = await API.get(`/posts/get-single-post/${postId}`);

        const { title, content, imageUrl } = response.data.post; 

        setFormData({ title, content, image: imageUrl });
        setImagePreview(imageUrl);
      } catch (err) {
        setError('Error fetching post details');
      }
    };

    if (postId) {
      fetchPostDetails(); 
    }
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setImagePreview(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };

  // const handleImageRemove = () => {
  //   setFormData({ ...formData, image: null });
  //   setImagePreview(null);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setError('Title and content are required.');
      return;
    }

    try {
      await API.put(`/posts/edit-post/${postId}`, formData); 
      navigate('/my-posts'); 
    } catch (err) {
      setError(err.response?.data?.error || 'Error updating post');
    }
  };

  return (
    <div className="container mx-auto w-3/4 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title} 
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            name="content"
            value={formData.content} 
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="6"
            placeholder="Enter content"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          />
          {imagePreview && (
            <div className="relative mt-4">
              <img src={imagePreview} alt="Preview" className="w-full" />
              
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
