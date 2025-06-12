import { useEffect, useState } from 'react';
import API from '../utils/api';

export default function MatchPage() {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [proofDocument, setProofDocument] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await API.get('/match');
        setMatches(response.data);
      } catch (error) {
        alert('Failed to fetch matched items');
      }
    };
    fetchMatches();
  }, []);

  const handleSubmitClaim = async (e) => {
    e.preventDefault();
    if (!proofDocument || !selectedMatch) {
      alert('Please select proof and a match');
      return; // Prevent further execution
    }
    const formData = new FormData();
    // Use correct field names as expected by backend
    formData.append('lostItem', selectedMatch.lostItem._id);
    formData.append('foundItem', selectedMatch.foundItem._id);
    formData.append('proofDocument', proofDocument);

    try {
      const response = await API.post('/claims', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Claim request submitted!');
      setSelectedMatch(null);
      setProofDocument(null);
    } catch (error) {
      // Show backend error message if available
      const msg = error?.response?.data?.message || 'Failed to submit claim';
      alert(msg);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Matched Lost & Found Items</h2>
      {matches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <div className="grid gap-6">
          {matches.map((match, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">Match #{index + 1}</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Lost Item</p>
                  <p>{match.lostItem.itemName}</p>
                  <p>{match.lostItem.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Found Item</p>
                  <p>{match.foundItem.itemName}</p>
                  <p>{match.foundItem.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMatch(match)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit Claim
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedMatch && (
        <form onSubmit={handleSubmitClaim} className="mt-10 bg-gray-50 p-4 rounded shadow">
          <h3 className="text-2xl font-semibold mb-2">Submit Claim for Selected Match</h3>
          <input
            type="file"
            name="proofDocument"
            accept=".pdf,.jpg,.png"
            onChange={(e) => setProofDocument(e.target.files[0])}
            required
            className="block mb-3"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Submit Claim
          </button>
        </form>
      )}
    </div>
  );
}