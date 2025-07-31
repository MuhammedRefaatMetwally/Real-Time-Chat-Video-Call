import React, { useState } from 'react';
import { Video, Phone, PhoneOff, VideoOff, Loader2 } from 'lucide-react';

const CallButton = ({ handleVideoCall, handleVoiceCall, disabled = false }) => {
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [isVoiceLoading, setIsVoiceLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const onVideoCall = async () => {
    setIsVideoLoading(true);
    try {
      await handleVideoCall();
    } finally {
      setIsVideoLoading(false);
      setShowOptions(false);
    }
  };

  const onVoiceCall = async () => {
    setIsVoiceLoading(true);
    try {
      if (handleVoiceCall) {
        await handleVoiceCall();
      } else {
        await handleVideoCall();
      }
    } finally {
      setIsVoiceLoading(false);
      setShowOptions(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => !disabled && setShowOptions(!showOptions)}
        disabled={disabled || isVideoLoading || isVoiceLoading}
        className={`
          relative z-10 w-14 h-14 rounded-full flex items-center justify-center
          transition-all duration-300 transform hover:scale-105 active:scale-95
          shadow-lg hover:shadow-xl
          ${disabled 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
          }
          ${showOptions ? 'ring-4 ring-green-200' : ''}
        `}
        title="Start a call"
      >
        {(isVideoLoading || isVoiceLoading) ? (
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        ) : (
          <Video className="w-6 h-6 text-white" />
        )}
        
        {!disabled && (
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
        )}
      </button>

      {showOptions && !disabled && (
        <>
          <div 
            className="fixed inset-0 z-20"
            onClick={() => setShowOptions(false)}
          />
          
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-30">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 min-w-[200px] animate-[slideUp_0.2s_ease-out]">
              <button
                onClick={onVideoCall}
                disabled={isVideoLoading}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  {isVideoLoading ? (
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  ) : (
                    <Video className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 text-sm">Video Call</div>
                  <div className="text-xs text-gray-500">Start with camera</div>
                </div>
              </button>

              {/* Voice Call Option */}
              <button
                onClick={onVoiceCall}
                disabled={isVoiceLoading}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-green-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  {isVoiceLoading ? (
                    <Loader2 className="w-5 h-5 text-green-600 animate-spin" />
                  ) : (
                    <Phone className="w-5 h-5 text-green-600" />
                  )}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 text-sm">Voice Call</div>
                  <div className="text-xs text-gray-500">Audio only</div>
                </div>
              </button>

              {/* Divider */}
              <div className="h-px bg-gray-100 my-2"></div>

              {/* Quick Actions */}
              <div className="px-3 py-2">
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">
                  Quick Start
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={onVideoCall}
                    disabled={isVideoLoading}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-3 text-xs font-medium transition-colors flex items-center justify-center space-x-1"
                  >
                    <Video className="w-3 h-3" />
                    <span>Video</span>
                  </button>
                  <button
                    onClick={onVoiceCall}
                    disabled={isVoiceLoading}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 px-3 text-xs font-medium transition-colors flex items-center justify-center space-x-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Audio</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px) translateX(-50%);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default CallButton;