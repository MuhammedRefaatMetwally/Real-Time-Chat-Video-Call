import { MessageCircle, Users, Zap } from 'lucide-react';

const ChatLoader = () => {
  return (
    <div className="h-[93vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto relative">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
            
            <div className="absolute inset-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center animate-pulse">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-100"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-300"></div>
            <div className="absolute top-2 -left-2 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-500"></div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Connecting to Chat
          </h2>
          
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            Setting up your secure connection and loading your conversations...
          </p>
        </div>

        <div className="flex justify-center space-x-8 mt-12 opacity-60">
          <div className="text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 mx-auto">
              <MessageCircle className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-xs text-gray-500">Messages</span>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 mx-auto">
              <Users className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-xs text-gray-500">Groups</span>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 mx-auto">
              <Zap className="w-6 h-6 text-yellow-500" />
            </div>
            <span className="text-xs text-gray-500">Fast</span>
          </div>
        </div>

        <div className="mt-8 w-full max-w-xs mx-auto">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full animate-pulse transform origin-left scale-x-0 animate-[scale-x_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-x {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default ChatLoader;