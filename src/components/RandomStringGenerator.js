import React, { useState, useCallback, useEffect } from 'react';

const RandomStringGenerator = () => {
  const [generatedString, setGeneratedString] = useState('');
  const [stringLength, setStringLength] = useState(10);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [history, setHistory] = useState([]);
  const [autoGenerate, setAutoGenerate] = useState(false);

  const generateRandomString = useCallback(() => {
    let charset = '';
    
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (charset === '') {
      setGeneratedString('Please select at least one character type');
      return;
    }
    
    let result = '';
    for (let i = 0; i < stringLength; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setGeneratedString(result);
    
    // Add to history
    setHistory(prev => {
      const newHistory = [
        {
          id: Date.now(),
          string: result,
          length: stringLength,
          timestamp: new Date().toLocaleTimeString()
        },
        ...prev
      ];
      return newHistory.slice(0, 10); // Keep only last 10 entries
    });
  }, [stringLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  // Auto-generate effect
  useEffect(() => {
    if (autoGenerate) {
      const interval = setInterval(() => {
        generateRandomString();
      }, 2000); // Generate every 2 seconds
      
      return () => clearInterval(interval);
    }
  }, [autoGenerate, generateRandomString]);

  // Generate initial string on component mount
  useEffect(() => {
    generateRandomString();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Random String Generator
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                String Length: {stringLength}
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={stringLength}
                onChange={(e) => setStringLength(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>100</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900">Character Types</h3>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Uppercase Letters (A-Z)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Lowercase Letters (a-z)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Numbers (0-9)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Symbols (!@#$%^&*)</span>
              </label>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={autoGenerate}
                  onChange={(e) => setAutoGenerate(e.target.checked)}
                  className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Auto-generate every 2 seconds</span>
              </label>
            </div>
          </div>

          {/* Generated String Display */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Generated String
              </label>
              <div className="relative">
                <textarea
                  value={generatedString}
                  readOnly
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm resize-none"
                />
                <button
                  onClick={() => copyToClipboard(generatedString)}
                  className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  title="Copy to clipboard"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={generateRandomString}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Generate New String
              </button>
              <button
                onClick={() => copyToClipboard(generatedString)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Strings</h3>
              <button
                onClick={clearHistory}
                className="text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                Clear History
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-sm text-gray-900 truncate">
                      {item.string}
                    </div>
                    <div className="text-xs text-gray-500">
                      Length: {item.length} • {item.timestamp}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.string)}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Copy to clipboard"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={generateRandomString}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Generate New String
          </button>
          <button
            onClick={() => copyToClipboard(generatedString)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomStringGenerator;
