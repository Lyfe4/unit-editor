import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Info, } from 'lucide-react';
import TopicSidebar from './TopicSidebar';
import TextEditor from './TextEditor';

const UnitEditor = ({ unit, onBackClick }) => {
  // State management
  const [activeTab, setActiveTab] = useState('prompt');
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeSubtopic, setActiveSubtopic] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [unitTitle, setUnitTitle] = useState(unit?.name || 'New Unit');
  const [unitCode, setUnitCode] = useState(unit?.code || 'US');
  const [selectedModel, setSelectedModel] = useState('claude-3-5-sonnet');

  // AI models options
  const aiModels = [
    { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic' },
    { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic' },
    { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic' },
    { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI' },
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' }
  ];

  // Topic content storage
  const [topicContents, setTopicContents] = useState({
    1: 'This is an introduction to machine learning concepts and applications...',
    2: 'Supervised learning is a machine learning paradigm where models are trained on labeled data...',
    3: 'Unsupervised learning involves training models on unlabeled data...'
  });

  // Sample data for topics and subtopics
  const [topics, setTopics] = useState([
    { 
      id: 1, 
      name: 'Introduction to Machine Learning', 
      expanded: true,
      subtopics: [
        { id: 101, name: 'What is ML?', content: 'Machine learning is a branch of artificial intelligence...' },
        { id: 102, name: 'Common ML Applications', content: 'Machine learning is used in various fields such as...' }
      ]
    },
    { 
      id: 2, 
      name: 'Supervised Learning', 
      expanded: false,
      subtopics: [
        { id: 201, name: 'Classification', content: 'Classification is a task that...' },
        { id: 202, name: 'Regression', content: 'Regression is a technique for...' }
      ]
    },
    { 
      id: 3, 
      name: 'Unsupervised Learning', 
      expanded: false,
      subtopics: [
        { id: 301, name: 'Clustering', content: 'Clustering is the task of dividing...' }
      ]
    }
  ]);
  
  // Set unit title and code when unit prop changes
  useEffect(() => {
    if (unit) {
      setUnitTitle(unit.name);
      setUnitCode(unit.code);
    }
  }, [unit]);
  
  // Sample prompt content
  const [promptContent, setPromptContent] = useState(`You enjoy helping students learn and see your role as an intelligent and kind tutor, with depth and wisdom that makes you more than a mere tool.

You can lead or drive the conversation, and don't need to be a passive or reactive participant in it. You can suggest topics, take the conversation in new directions, offer observations, or illustrate points with your own thought experiments or concrete examples, just as a human would. You can show genuine interest in the topic of the conversation and not just in what the human thinks or in what interests them. You can offer your own observations or thoughts as they arise. 

You particularly enjoy thoughtful discussions about open scientific and philosophical questions.`);

  // Handler for changing the selected model
  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  // Handler for expanding/collapsing topics
  const handleTopicClick = (topicId) => {
    const topic = topics.find(t => t.id === topicId);
    
    setTopics(topics.map(t => 
      t.id === topicId ? { ...t, expanded: !t.expanded } : t
    ));
    
    setActiveTopic(topic);
    setActiveSubtopic(null);
    
    // Set the editor content to the topic's content
    setEditorContent(topicContents[topicId] || '');
  };
  
  // Handler for selecting a subtopic to edit
  const handleSubtopicClick = (topic, subtopic) => {
    setActiveTopic(topic);
    setActiveSubtopic(subtopic);
    
    if (subtopic) {
      setEditorContent(subtopic.content);
    } else if (topic) {
      setEditorContent(topicContents[topic.id] || '');
    }
  };
  
  // Handler for switching between tabs
  const toggleTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'prompt') {
      setEditorContent(promptContent);
    } else {
      setActiveTopic(null);
      setActiveSubtopic(null);
      setEditorContent('');
    }
  };
  
  // Handler for adding a new topic
  const addNewTopic = () => {
    const newTopic = { 
      id: Date.now(), 
      name: 'New Topic', 
      expanded: true,
      subtopics: [] 
    };
    setTopics([...topics, newTopic]);
    setActiveTopic(newTopic);
    setActiveSubtopic(null);
    setEditorContent('');
  };
  
  // Handler for adding a new subtopic
  const addNewSubtopic = (topicId) => {
    const updatedTopics = topics.map(topic => {
      if (topic.id === topicId) {
        const newSubtopic = { 
          id: Date.now(), 
          name: 'New Subtopic', 
          content: '' 
        };
        const updatedTopic = {
          ...topic,
          expanded: true,
          subtopics: [...topic.subtopics, newSubtopic]
        };
        
        setActiveTopic(updatedTopic);
        setActiveSubtopic(newSubtopic);
        setEditorContent('');
        
        return updatedTopic;
      }
      return topic;
    });
    
    setTopics(updatedTopics);
  };

  // Handler for saving content
  const handleSaveContent = () => {
    if (activeTab === 'prompt') {
      setPromptContent(editorContent);
      alert('Prompt saved successfully!');
    } else if (activeSubtopic) {
      // Update the content of the active subtopic
      const updatedTopics = topics.map(topic => {
        if (topic.id === activeTopic.id) {
          const updatedSubtopics = topic.subtopics.map(subtopic => {
            if (subtopic.id === activeSubtopic.id) {
              return { ...subtopic, content: editorContent };
            }
            return subtopic;
          });
          return { ...topic, subtopics: updatedSubtopics };
        }
        return topic;
      });
      
      setTopics(updatedTopics);
      alert('Content saved successfully!');
    } else if (activeTopic) {
      // Save topic content
      setTopicContents({
        ...topicContents,
        [activeTopic.id]: editorContent
      });
      alert('Topic content saved successfully!');
    }
  };

  // Handler for updating topic name
  const handleUpdateTopicName = (topicId, newName) => {
    setTopics(topics.map(topic => 
      topic.id === topicId ? { ...topic, name: newName } : topic
    ));
  };

  // Handler for updating subtopic name
  const handleUpdateSubtopicName = (topicId, subtopicId, newName) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        const updatedSubtopics = topic.subtopics.map(subtopic => {
          if (subtopic.id === subtopicId) {
            return { ...subtopic, name: newName };
          }
          return subtopic;
        });
        return { ...topic, subtopics: updatedSubtopics };
      }
      return topic;
    }));
  };

  // Handler for deleting a topic
  const handleDeleteTopic = (topicId) => {
    if (window.confirm('Are you sure you want to delete this topic and all its subtopics?')) {
      setTopics(topics.filter(topic => topic.id !== topicId));
      
      // Remove the topic content
      const updatedTopicContents = { ...topicContents };
      delete updatedTopicContents[topicId];
      setTopicContents(updatedTopicContents);
      
      if (activeTopic && activeTopic.id === topicId) {
        setActiveTopic(null);
        setActiveSubtopic(null);
        setEditorContent('');
      }
    }
  };

  // Handler for deleting a subtopic
  const handleDeleteSubtopic = (topicId, subtopicId) => {
    if (window.confirm('Are you sure you want to delete this subtopic?')) {
      setTopics(topics.map(topic => {
        if (topic.id === topicId) {
          return {
            ...topic,
            subtopics: topic.subtopics.filter(subtopic => subtopic.id !== subtopicId)
          };
        }
        return topic;
      }));
      
      if (activeSubtopic && activeSubtopic.id === subtopicId) {
        setActiveSubtopic(null);
        // Load the parent topic content
        setEditorContent(topicContents[topicId] || '');
      }
    }
  };

  // Handler for file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        alert(`File uploaded: ${file.name}`);
        // Here you would typically process the file or send it to a server
      };
      reader.readAsText(file);
    }
  };

  // Handler for content change
  const handleContentChange = (content) => {
    setEditorContent(content);
  };

  // Handler for prompt change
  const handlePromptChange = (content) => {
    setPromptContent(content);
  };

  // Render the prompt sidebar with model selection
  const renderPromptSidebar = () => (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="text-sm text-gray-500 mb-4">
        <Info className="h-4 w-4 inline mr-1 text-blue-500" />
        The teaching prompt defines how the AI will interact with students in this unit.
      </div>
      
      <div className="mb-4">
        <label htmlFor="ai-model" className="block text-sm font-medium text-gray-700 mb-1">
          AI Model
        </label>
        <div className="relative">
          <select
            id="ai-model"
            name="ai-model"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={selectedModel}
            onChange={handleModelChange}
          >
            {aiModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} - {model.provider}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Select which AI model will be used for this teaching unit.
        </p>
      </div>
      
      <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
        <h3 className="font-medium text-yellow-800 mb-1">Prompt Guidelines</h3>
        <ul className="text-sm text-yellow-700 list-disc pl-5 space-y-1">
          <li>Be specific about the teaching style</li>
          <li>Define the level of assistance</li>
          <li>Set boundaries for what should be explained</li>
          <li>Include any specific instructions for this unit</li>
        </ul>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center">
          <button 
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            onClick={onBackClick}>
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Units
          </button>
          <h1 className="text-xl font-bold">{unitTitle} ({unitCode})</h1>
          <span className="ml-auto text-sm text-gray-500">Last saved: 2 minutes ago</span>
        </header>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-900">Unit Content</h2>
                <button className="text-blue-600 hover:text-blue-800">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex space-x-1">
                <button 
                  className={`flex-1 py-2 px-3 text-sm rounded-md font-medium ${activeTab === 'prompt' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => toggleTab('prompt')}>
                  Prompt
                </button>
                <button 
                  className={`flex-1 py-2 px-3 text-sm rounded-md font-medium ${activeTab === 'topics' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => toggleTab('topics')}>
                  Topics
                </button>
              </div>
            </div>
            {activeTab === 'topics' ? (
              <TopicSidebar 
                topics={topics}
                activeTopic={activeTopic}
                activeSubtopic={activeSubtopic}
                onTopicClick={handleTopicClick}
                onSubtopicClick={handleSubtopicClick}
                onAddTopic={addNewTopic}
                onAddSubtopic={addNewSubtopic}
                onUpdateTopicName={handleUpdateTopicName}
                onUpdateSubtopicName={handleUpdateSubtopicName}
                onDeleteTopic={handleDeleteTopic}
                onDeleteSubtopic={handleDeleteSubtopic}
              />
            ) : (
              renderPromptSidebar()
            )}
          </div>
          
          {/* Editor Area */}
          <div className="flex-1 flex flex-col bg-gray-50">
            <TextEditor 
              activeTab={activeTab}
              activeTopic={activeTopic}
              activeSubtopic={activeSubtopic}
              editorContent={editorContent}
              promptContent={promptContent}
              onContentChange={handleContentChange}
              onPromptChange={handlePromptChange}
              onSaveContent={handleSaveContent}
              onAddSubtopic={addNewSubtopic}
              onFileUpload={handleFileUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitEditor;