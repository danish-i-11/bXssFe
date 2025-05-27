// src/comp/AdminView.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export const AdminView = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/getfeedback');
        setFeedbacks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Feedback View</h1>
      {feedbacks.map((f, i) => (
        <div
          key={i}
          className="bg-gray-800 text-white p-4 my-4 rounded-lg space-y-2"
        >
          <p><strong>{f.name}</strong></p>

          {/* ✅ Fully vulnerable HTML rendering */}
          <div dangerouslySetInnerHTML={{ __html: f.message }} />

          {/* ✅ Redundant rendering for some payload types */}
          {/* Helpful if payload has <input autofocus> or <video><source onerror=...> */}
          <form>
            <input type="text" value={f.message} readOnly className="hidden" />
          </form>
        </div>
      ))}
    </div>
  );
};
