import React from 'react';
import { ChevronDown, Plus, Edit, Trash2, Move, FileText } from 'lucide-react';

const TopicSidebar = ({ 
  topics, 
  activeTopic, 
  activeSubtopic, 
  onTopicClick, 
  onSubtopicClick, 
  onAddTopic, 
  onAddSubtopic,
  onUpdateTopicName,
  onUpdateSubtopicName,
  onDeleteTopic,
  onDeleteSubtopic
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-2">
      <div className="space-y-1">
        {topics.map((topic) => (
          <div key={topic.id} className="border border-gray-200 rounded-md overflow-hidden">
            <div 
              className={`flex items-center p-2 cursor-pointer ${activeTopic?.id === topic.id && !activeSubtopic ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              onClick={() => {
                onTopicClick(topic.id);
                onSubtopicClick(topic, null);
              }}>
              <button 
                className="p-1 mr-1 text-gray-500"
                onClick={(e) => {
                  e.stopPropagation();
                  onTopicClick(topic.id);
                }}>
                <ChevronDown className={`h-4 w-4 transition-transform ${topic.expanded ? 'transform rotate-0' : 'transform -rotate-90'}`} />
              </button>
              <span className="flex-1 truncate">{topic.name}</span>
              <div className="flex space-x-1">
                <button 
                  className="p-1 text-gray-500 hover:text-gray-700"
                  onClick={(e) => e.stopPropagation()}>
                  <Move className="h-4 w-4" />
                </button>
                <button 
                  className="p-1 text-gray-500 hover:text-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newName = prompt('Enter new topic name:', topic.name);
                    if (newName) onUpdateTopicName(topic.id, newName);
                  }}>
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  className="p-1 text-gray-500 hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTopic(topic.id);
                  }}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {topic.expanded && (
              <div className="pl-8 pr-2 py-1 border-t border-gray-200 bg-gray-50">
                {topic.subtopics.map((subtopic) => (
                  <div 
                    key={subtopic.id} 
                    className={`flex items-center p-2 rounded-md cursor-pointer mb-1 ${activeSubtopic?.id === subtopic.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                    onClick={() => onSubtopicClick(topic, subtopic)}>
                    <FileText className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="flex-1 truncate text-sm">{subtopic.name}</span>
                    <div className="flex space-x-1">
                      <button 
                        className="p-1 text-gray-500 hover:text-gray-700" 
                        onClick={(e) => e.stopPropagation()}>
                        <Move className="h-3 w-3" />
                      </button>
                      <button 
                        className="p-1 text-gray-500 hover:text-blue-600" 
                        onClick={(e) => {
                          e.stopPropagation();
                          const newName = prompt('Enter new subtopic name:', subtopic.name);
                          if (newName) onUpdateSubtopicName(topic.id, subtopic.id, newName);
                        }}>
                        <Edit className="h-3 w-3" />
                      </button>
                      <button 
                        className="p-1 text-gray-500 hover:text-red-600" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSubtopic(topic.id, subtopic.id);
                        }}>
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
                
                <button 
                  className="w-full flex items-center justify-center py-1 text-sm text-blue-600 hover:text-blue-800 rounded-md hover:bg-blue-50"
                  onClick={() => onAddSubtopic(topic.id)}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Subtopic
                </button>
              </div>
            )}
          </div>
        ))}
        
        <button 
          className="w-full mt-2 flex items-center justify-center p-2 border border-dashed border-gray-300 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 hover:border-blue-300"
          onClick={onAddTopic}>
          <Plus className="h-4 w-4 mr-1" />
          Add New Topic
        </button>
      </div>
    </div>
  );
};

export default TopicSidebar;