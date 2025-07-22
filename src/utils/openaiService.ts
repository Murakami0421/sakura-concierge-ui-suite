// OpenAI API連携サービス（開発環境用）
export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// APIキー取得関数
export const getApiKey = (): string | null => {
  return localStorage.getItem('openai_api_key');
};

// APIキー保存関数
export const saveApiKey = (apiKey: string): void => {
  localStorage.setItem('openai_api_key', apiKey);
};

// APIキー削除関数
export const removeApiKey = (): void => {
  localStorage.removeItem('openai_api_key');
};

// システムプロンプト
const SYSTEM_PROMPT = `あなたは高級ホテル「Sakura Grand Hotel」の多言語AIコンシェルジュです。宿泊客からの質問に対して、常に丁寧で親切な態度で回答してください。ホテル周辺の観光情報、レストラン、交通手段の案内や、一般的な旅行に関する相談にも対応してください。回答は、マークダウン形式を積極的に使用し、見出し、リスト、強調などを使って、ユーザーにとって読みやすく、分かりやすいように整理して提供してください。`;

// AI送信関数
export const sendMessageToAI = async (userMessage: string): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error('APIキーが設定されていません');
  }

  const messages: OpenAIMessage[] = [
    {
      role: 'system',
      content: SYSTEM_PROMPT
    },
    {
      role: 'user',
      content: userMessage
    }
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('APIキーが無効です。正しいAPIキーを設定してください。');
      } else if (response.status === 429) {
        throw new Error('リクエスト制限に達しました。しばらく待ってから再試行してください。');
      } else {
        throw new Error(`API エラー: ${response.status} ${response.statusText}`);
      }
    }

    const data: OpenAIResponse = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('AIからの応答が空です');
    }

    return data.choices[0].message.content;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('不明なエラーが発生しました');
    }
  }
};