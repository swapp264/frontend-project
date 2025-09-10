import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const TextTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const languages = [
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'nl', name: 'Dutch' }
  ];

  // Mock translation function (replace with RapidAPI call)
  const translateText = useCallback(async (text, targetLang) => {
    setIsLoading(true);
    setError('');
    
    try {
      // This is a mock implementation. Replace with actual RapidAPI call
      // const response = await axios.post('https://api.rapidapi.com/translate', {
      //   text: text,
      //   target: targetLang,
      //   source: 'en'
      // }, {
      //   headers: {
      //     'X-RapidAPI-Key': 'YOUR_API_KEY_HERE',
      //     'X-RapidAPI-Host': 'translate-api.rapidapi.com'
      //   }
      // });
      
      // Mock translation for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTranslations = {
        'es': `[ES] ${text}`,
        'fr': `[FR] ${text}`,
        'de': `[DE] ${text}`,
        'it': `[IT] ${text}`,
        'pt': `[PT] ${text}`,
        'ru': `[RU] ${text}`,
        'ja': `[JA] ${text}`,
        'ko': `[KO] ${text}`,
        'zh': `[ZH] ${text}`,
        'ar': `[AR] ${text}`,
        'hi': `[HI] ${text}`,
        'nl': `[NL] ${text}`
      };
      
      setTranslatedText(mockTranslations[targetLang] || `[${targetLang.toUpperCase()}] ${text}`);
    } catch (err) {
      setError('Translation failed. Please try again.');
      console.error('Translation error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleTranslate = useCallback(() => {
    if (inputText.trim()) {
      translateText(inputText, targetLanguage);
    }
  }, [inputText, targetLanguage, translateText]);

  useEffect(() => {
    if (inputText.trim() && inputText.length > 2) {
      const debounceTimer = setTimeout(() => {
        handleTranslate();
      }, 1000);
      
      return () => clearTimeout(debounceTimer);
    }
  }, [inputText, targetLanguage, handleTranslate]);

  const handleClear = useCallback(() => {
    setInputText('');
    setTranslatedText('');
    setError('');
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Text Translator
        </h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Target Language
          </label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              English Text
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to translate..."
              className="w-full h-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Translated Text
            </label>
            <div className="w-full h-40 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : error ? (
                <div className="text-red-600 text-center">{error}</div>
              ) : (
                <div className="text-gray-900">{translatedText || 'Translation will appear here...'}</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handleTranslate}
            disabled={!inputText.trim() || isLoading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Translating...' : 'Translate'}
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Clear
          </button>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> To use real translation, replace the mock implementation with your RapidAPI key and endpoint in the translateText function.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TextTranslator;
