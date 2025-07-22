import React from 'react';

const DeployInfo = () => {
  const isProduction = import.meta.env.PROD;

  return (
    <div className="fixed bottom-2 left-2 text-xs text-white/50 bg-black/20 px-2 py-1 rounded z-50">
      {isProduction ? '🌐 本番環境' : '🔧 開発環境'}
    </div>
  );
};

export default DeployInfo;