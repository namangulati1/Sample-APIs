import React, { useState } from 'react';
import { ClipLoader } from "react-spinners";
import { marked } from 'marked';

function TextGenerator() {
    const [question, setQuestion] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await fetch('http://localhost:8000/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
            });
            console.log('response',response)
            const data = await response.json();
            if(data.result) {
                setResult(data.result);
            }
            else if(data.error) {
                setError("Error: " + data.error.message || "An unknown error occurred");
            }
        } catch (error) {
            console.log('fetch error',error)
            setError("Network error: " + error.message);
        }
        finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Google Gemini Text Generator</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Enter your prompt:
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows="5"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Generate
                </button>
              </div>
            </form>
    
            {/* Show loader if loading */}
            {loading && (
              <div className="flex justify-center mt-6">
                <ClipLoader color={"#2563EB"} loading={loading} size={35} />
              </div>
            )}
    
            {/* Show result if available */}
            {result && (
              <div className="mt-6">
                <h3 className="text-xl font-bold">Generated Text:</h3>
                <div
                  className="mt-2 p-3 bg-gray-100 rounded-md"
                  dangerouslySetInnerHTML={{ __html: marked(result) }}
                />
              </div>
            )}
    
            {/* Show error if available */}
            {error && (
              <div className="mt-6 text-red-500">
                <h3 className="text-xl font-bold">Error:</h3>
                <p className="mt-2">{error}</p>
              </div>
            )}
          </div>
        </div>
      );
}

export default TextGenerator;