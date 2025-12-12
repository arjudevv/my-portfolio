'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { apiEndpoints } from '@/data/api-schema';

export default function ApiDocsPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getMethodColor = (method: string) => {
    const colors: Record<string, string> = {
      GET: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      POST: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      PUT: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
      DELETE: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
      PATCH: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    };
    return colors[method] || 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20 md:pt-32 pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              API Documentation
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              Comprehensive API reference with examples and interactive documentation
            </p>
          </div>

          {/* Endpoints List */}
          <div className="space-y-6">
            {apiEndpoints.map((endpoint, index) => (
              <motion.div
                key={`${endpoint.method}-${endpoint.path}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
              >
                <div
                  className="p-6 md:p-8 cursor-pointer"
                  onClick={() => setSelectedEndpoint(selectedEndpoint === index ? null : index)}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4 flex-wrap">
                      <span
                        className={`px-3 py-1 rounded font-bold text-sm ${getMethodColor(endpoint.method)}`}
                      >
                        {endpoint.method}
                      </span>
                      <code className="text-lg md:text-xl font-mono text-zinc-900 dark:text-zinc-50">
                        {endpoint.path}
                      </code>
                    </div>
                    <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                      {selectedEndpoint === index ? '▼' : '▶'}
                    </button>
                  </div>
                  <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                    {endpoint.description}
                  </p>
                </div>

                {selectedEndpoint === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-zinc-200 dark:border-zinc-800 p-6 md:p-8 bg-white dark:bg-zinc-950"
                  >
                    {/* Parameters */}
                    {endpoint.parameters && endpoint.parameters.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                          Parameters
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                <th className="text-left p-2 text-zinc-700 dark:text-zinc-300">Name</th>
                                <th className="text-left p-2 text-zinc-700 dark:text-zinc-300">Type</th>
                                <th className="text-left p-2 text-zinc-700 dark:text-zinc-300">Location</th>
                                <th className="text-left p-2 text-zinc-700 dark:text-zinc-300">Required</th>
                                <th className="text-left p-2 text-zinc-700 dark:text-zinc-300">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {endpoint.parameters.map((param) => (
                                <tr
                                  key={param.name}
                                  className="border-b border-zinc-100 dark:border-zinc-900"
                                >
                                  <td className="p-2 font-mono text-zinc-900 dark:text-zinc-50">
                                    {param.name}
                                  </td>
                                  <td className="p-2 text-zinc-600 dark:text-zinc-400">{param.type}</td>
                                  <td className="p-2 text-zinc-600 dark:text-zinc-400">{param.in}</td>
                                  <td className="p-2 text-zinc-600 dark:text-zinc-400">
                                    {param.required ? 'Yes' : 'No'}
                                  </td>
                                  <td className="p-2 text-zinc-600 dark:text-zinc-400">
                                    {param.description}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Request Body */}
                    {endpoint.requestBody && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                          Request Body
                        </h3>
                        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
                          <pre className="text-sm text-zinc-700 dark:text-zinc-300 overflow-x-auto">
                            {JSON.stringify(endpoint.requestBody.example || endpoint.requestBody.schema, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Responses */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                        Responses
                      </h3>
                      <div className="space-y-4">
                        {endpoint.responses.map((response) => (
                          <div
                            key={response.status}
                            className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded text-sm font-medium">
                                {response.status}
                              </span>
                              <span className="text-zinc-600 dark:text-zinc-400">
                                {response.description}
                              </span>
                            </div>
                            {response.example && (
                              <pre className="text-sm text-zinc-700 dark:text-zinc-300 overflow-x-auto mt-2">
                                {JSON.stringify(response.example, null, 2)}
                              </pre>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Example cURL */}
                    {endpoint.example && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                            Example Request
                          </h3>
                          <button
                            onClick={() => copyToClipboard(endpoint.example!.curl, index)}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                          >
                            {copiedIndex === index ? '✓ Copied!' : 'Copy cURL'}
                          </button>
                        </div>
                        <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-4 border border-zinc-800">
                          <pre className="text-sm text-zinc-300 overflow-x-auto font-mono">
                            {endpoint.example.curl}
                          </pre>
                        </div>
                        {endpoint.example.response && (
                          <div className="mt-4">
                            <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                              Example Response
                            </h4>
                            <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
                              <pre className="text-sm text-zinc-700 dark:text-zinc-300 overflow-x-auto">
                                {JSON.stringify(endpoint.example.response, null, 2)}
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
