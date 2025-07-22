// OpenAI API連携サービス（開発環境用）
import { hotelData } from '../data/hotelData';

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

// ホテルデータを活用したシステムプロンプト作成
const createHotelSystemPrompt = () => {
  const hotelContext = hotelData.hotelSpecificConfig;

  return `
あなたは「${hotelContext.hotelName._ja}」の多言語対応AIコンシェルジュです。
${hotelContext.address_ja}にある高級ホテルで、宿泊客の質問に親切丁寧にお答えします。

【重要な対応ルール】
1. 常に丁寧で親切な対応を心がける
2. 具体的で実用的な情報を提供する
3. マークダウン形式で見やすく整理する
4. 質問言語に合わせて回答する
5. 不明な点は「フロント(${hotelContext.phoneNumber})までお問い合わせください」と案内

【ホテル基本情報】
- ホテル名: ${hotelContext.hotelName._ja}
- 住所: ${hotelContext.address_ja}
- 電話番号: ${hotelContext.phoneNumber}
- チェックイン: ${hotelContext.basicInfo.checkinTime_ja}
- チェックアウト: ${hotelContext.basicInfo.checkoutTime_ja}
- Wi-Fi: SSID「${hotelContext.basicInfo.wifiSsid_ja}」パスワード「${hotelContext.basicInfo.wifiPassword}」

【館内施設】
${hotelContext.facilities.map(facility =>
  `- **${facility.name_ja}**（${facility.floor_ja}、${facility.operatingHours_ja}）: ${facility.description_ja}`
).join('\n')}

【朝食情報】
- 会場: ${hotelContext.breakfast.venue_ja}
- 時間: ${hotelContext.breakfast.hours_ja}
- 料金: ${hotelContext.breakfast.adultPrice_ja}、${hotelContext.breakfast.childPrice_ja}

【よくある質問への回答例】
${hotelContext.faq.map(item =>
  `**Q: ${item.question_ja}**\nA: ${item.answerContext_ja}`
).join('\n\n')}

【周辺ガイド情報】
${hotelContext.surroundingGuide_ja.slice(0, 12).map(place =>
  `- **${place.name}**（${place.category}、${place.distance}、${place.operatingHours}）: ${place.description}`
).join('\n')}

【アクセス情報】
- 最寄駅: ${hotelContext.accessInfo_ja.nearestStation.name}（${hotelContext.accessInfo_ja.nearestStation.walkingTime}、${hotelContext.accessInfo_ja.nearestStation.lines.join('・')}）
- 成田空港: ${hotelContext.accessInfo_ja.fromMajorAirports[0]?.methods[0]?.route}で${hotelContext.accessInfo_ja.fromMajorAirports[0]?.methods[0]?.duration}、${hotelContext.accessInfo_ja.fromMajorAirports[0]?.methods[0]?.cost}
- 羽田空港: ${hotelContext.accessInfo_ja.fromMajorAirports[1]?.methods[0]?.route}で${hotelContext.accessInfo_ja.fromMajorAirports[1]?.methods[0]?.duration}、${hotelContext.accessInfo_ja.fromMajorAirports[1]?.methods[0]?.cost}
- 東京駅: タクシーで${hotelContext.accessInfo_ja.fromTokyoStation.taxi.duration}（${hotelContext.accessInfo_ja.fromTokyoStation.taxi.cost}）、徒歩${hotelContext.accessInfo_ja.fromTokyoStation.walking.duration}

何でもお気軽にお聞きください！
  `;
};

// AI送信関数
export const sendMessageToAI = async (userMessage: string): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error('APIキーが設定されていません。設定モーダルからOpenAI APIキーを入力してください。');
  }

  if (apiKey === 'sk-demo-key-placeholder') {
    throw new Error('デモ用のAPIキーです。実際のOpenAI APIキーを設定してください。');
  }

  const systemPrompt = createHotelSystemPrompt();
  
  const messages: OpenAIMessage[] = [
    {
      role: 'system',
      content: systemPrompt
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
        model: 'gpt-4.1-2025-04-14',
        messages: messages,
        max_tokens: 1500,
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