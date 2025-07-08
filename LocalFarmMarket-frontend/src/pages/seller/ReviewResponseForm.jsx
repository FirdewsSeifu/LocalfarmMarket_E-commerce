import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ReviewResponseForm = ({ review, productId, onResponseSubmit }) => {
  const [response, setResponse] = useState(review.sellerResponse || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`/api/seller/products/${productId}/reviews/${review._id}/response`, {
        response
      });
      toast.success('Response submitted successfully');
      onResponseSubmit(response);
    } catch (error) {
      console.log(error)
      toast.error('Failed to submit response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 border-t pt-4">
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Seller Response
        </label>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          rows="3"
          className="w-full p-2 border rounded"
          placeholder="Write a response to this review..."
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`px-3 py-1 text-sm rounded ${loading ? 'bg-gray-300' : 'bg-green-500 hover:bg-green-600 text-white'}`}
        >
          {loading ? 'Submitting...' : 'Submit Response'}
        </button>
      </div>
    </form>
  );
};

export default ReviewResponseForm;