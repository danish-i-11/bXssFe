// src/comp/Feedback.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Feedback = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/feedback', { name, message });
      setStatus('Message submitted!');
      setName('');
      setMessage('');
    } catch (error) {
      setStatus('Error submitting message');
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getfeedback');
      setFeedbacks(response.data);
      setShowFeedbacks(true);
    } catch (error) {
      console.error('Error fetching feedbacks', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 relative">
      {/* Admin Panel Button */}
      {isAdmin && (
        <button
          onClick={() => navigate('/admin')}
          className="absolute top-4 left-4 bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Admin Panel
        </button>
      )}

      <button
        onClick={fetchFeedbacks}
        className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md"
      >
        View Feedbacks
      </button>

      <div className="max-w-xl mx-auto mt-20 bg-gray-900 p-6 rounded-2xl shadow-lg space-y-4">
        <h1 className="text-2xl font-bold text-center">Blind XSS Feedback</h1>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-700 p-3 rounded-xl"
          required
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
          className="w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-700 p-3 rounded-xl h-32"
          required
        />

        <button
          onClick={handleSubmit}
          className="bg-white text-black w-full py-3 rounded-xl hover:bg-gray-300"
        >
          Submit
        </button>

        {status && <p className="text-center text-gray-300 mt-2">{status}</p>}
      </div>

      {showFeedbacks && (
        <div className="mt-10 max-w-2xl mx-auto bg-gray-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Submitted Feedbacks</h2>
          <div className="space-y-4">
            {feedbacks.map((feedback, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-xl">
                <p className="font-semibold">{feedback.name}</p>
                <p className="mt-2">{feedback.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
