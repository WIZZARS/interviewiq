
import React from 'react';
import { InterviewTopic } from '../types';

interface TopicSelectorProps {
  onSelectTopic: (topic: InterviewTopic) => void;
  onStart: () => void;
  selectedTopic: InterviewTopic | null;
  isLoading: boolean;
}

const topics: InterviewTopic[] = ['HR', 'Technical', 'General'];

export const TopicSelector: React.FC<TopicSelectorProps> = ({ onSelectTopic, onStart, selectedTopic, isLoading }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Virtual Mock Interview System
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          CS Mini Project I. Get real-time feedback and a comprehensive report to ace your next interview.
        </p>

        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-semibold mb-6">1. Select Your Interview Topic</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => onSelectTopic(topic)}
                className={`p-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedTopic === topic
                    ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mb-4">2. Start the Interview</h2>
          <p className="text-gray-400 mb-6">
            Please allow access to your camera and microphone when prompted.
          </p>
          <button
            onClick={onStart}
            disabled={!selectedTopic || isLoading}
            className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-lg"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Starting...
              </>
            ) : 'Start Interview'}
          </button>
        </div>
      </div>
    </div>
  );
};
