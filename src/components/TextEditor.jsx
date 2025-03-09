import React from 'react';
import { Save, Plus, FileText, Upload, AlertTriangle } from 'lucide-react';
import EditorToolbar from './EditorToolbar';

const TextEditor = ({
  activeTab,
  activeTopic,
  activeSubtopic,
  editorContent,
  promptContent,
  onContentChange,
  onPromptChange,
  onSaveContent,
  onAddSubtopic,
  onFileUpload
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Editor header */}
      <div className="border-b border-gray-200 p-2">
        {activeSubtopic ? (
          <div className="flex items-center">
            <h3 className="text-lg font-medium flex-1">Editing: {activeSubtopic.name}</h3>
            <button 
              className="text-blue-600 hover:text-blue-800 px-3 py-1 text-sm rounded-md border border-blue-600 hover:bg-blue-50"
              onClick={onSaveContent}>
              <Save className="h-4 w-4 inline mr-1" />
              Save Changes
            </button>
          </div>
        ) : activeTopic && activeTab === 'topics' ? (
          <div className="flex items-center">
            <h3 className="text-lg font-medium flex-1">Topic: {activeTopic.name}</h3>
            <div className="flex space-x-2">
              <button 
                className="text-blue-600 hover:text-blue-800 px-3 py-1 text-sm rounded-md border border-blue-600 hover:bg-blue-50"
                onClick={() => onAddSubtopic(activeTopic.id)}>
                <Plus className="h-4 w-4 inline mr-1" />
                Add Subtopic
              </button>
              <button 
                className="text-blue-600 hover:text-blue-800 px-3 py-1 text-sm rounded-md border border-blue-600 hover:bg-blue-50"
                onClick={onSaveContent}>
                <Save className="h-4 w-4 inline mr-1" />
                Save Changes
              </button>
            </div>
          </div>
        ) : activeTab === 'prompt' ? (
          <div className="flex items-center">
            <h3 className="text-lg font-medium flex-1">Unit Teaching Prompt</h3>
            <button 
              className="text-blue-600 hover:text-blue-800 px-3 py-1 text-sm rounded-md border border-blue-600 hover:bg-blue-50"
              onClick={onSaveContent}>
              <Save className="h-4 w-4 inline mr-1" />
              Save Changes
            </button>
          </div>
        ) : (
          <h3 className="text-lg font-medium">Select a topic or subtopic to edit</h3>
        )}
      </div>
      
      {/* Editor toolbar */}
      <EditorToolbar />
      
      {/* Editor content area */}
      <div className="flex-1 p-4 bg-white">
        {activeTab === 'prompt' ? (
          <div>
            <textarea 
              className="w-full h-64 border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={promptContent}
              onChange={(e) => onPromptChange(e.target.value)}
            />
            
            <div className="mt-4">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-start" role="alert">
                <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold">Warning</p>
                  <p className="text-sm">Changes to the prompt will affect how the AI responds to students in this unit.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          activeTopic || activeSubtopic ? (
            <textarea 
              className="w-full h-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editorContent}
              onChange={(e) => onContentChange(e.target.value)}
              placeholder={activeSubtopic ? "Enter content for this subtopic..." : "Enter content for this topic..."}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <FileText className="h-12 w-12 mb-2" />
              <p className="text-lg">Select a topic or subtopic to start editing</p>
            </div>
          )
        )}
      </div>
      
      {/* File upload footer */}
      <div className="border-t border-gray-200 p-3 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center">
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            onChange={onFileUpload}
          />
          <label 
            htmlFor="file-upload" 
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4 cursor-pointer">
            <Upload className="h-4 w-4 mr-1" />
            <span>Upload Files</span>
          </label>
          <div className="border-l border-gray-300 pl-4">
            <span className="text-sm text-gray-500">Drag and drop files here or use the upload button</span>
          </div>
        </div>
        
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          onClick={onSaveContent}>
          <Save className="h-4 w-4 inline mr-1" />
          Save All Changes
        </button>
      </div>
    </div>
  );
};

export default TextEditor;