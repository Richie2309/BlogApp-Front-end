import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/axios"

const CreatePost = () => {

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
  });
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

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
      reader.readAsDataURL(file); // Convert image to base64
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
      console.log('formdata', formData);
      
      const response = await API.post('/posts/create-post', formData);
      if (response.data) {
        navigate('/my-posts'); // Redirect to My Posts section
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating post');
    }
  };
  
return (
    <div className="container mx-auto w-3/4 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>

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
              {/* <button
                type="button"
                className="absolute top-0 right-0 text-white bg-red-500 rounded-full px-2 py-1"
                onClick={handleImageRemove}
              >
                X
              </button> */}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost
