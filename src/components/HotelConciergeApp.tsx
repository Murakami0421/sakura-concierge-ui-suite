import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { 
  MessageCircle, 
  Mic, 
  Globe, 
  Menu, 
  Info, 
  FileText,
  Clock,
  Wifi,
  Utensils,
  MapPin,
  X,
  Send,
  MessageSquare,
  DollarSign,
  Hand,
  Map,
  ChevronDown,
  Loader2,
  Settings
} from 'lucide-react';

// Import OpenAI service
import { getApiKey, saveApiKey, sendMessageToAI } from '@/utils/openaiService';

// Import hotel images
import hotelLobby from '@/assets/hotel-lobby.jpg';
import hotelRoom from '@/assets/hotel-room.jpg';
import hotelRestaurant from '@/assets/hotel-restaurant.jpg';
import hotelSpa from '@/assets/hotel-spa.jpg';
import hotelExterior from '@/assets/hotel-exterior.jpg';

// Language data
const languages = [
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' }
];

// Translations
const translations = {
  ja: {
    welcome: 'サクラグランドホテルへようこそ',
    hotelName: 'Sakura Grand Hotel',
    chatButton: 'チャットで質問',
    chatSubtext: '何でもお聞きください',
    voiceButton: '音声で質問',
    voiceSubtext: '話しかけてください',
    quickAccess: 'よくある質問',
    checkinTime: 'チェックイン時間',
    wifiPassword: 'Wi-Fiパスワード',
    breakfast: '朝食時間',
    facilities: '施設案内',
    info: '情報',
    faq: 'FAQ',
    menu: 'メニュー',
    phrases: '会話フレーズ集',
    currency: '通貨換算機能',
    pointTalk: '指さし会話',
    areaGuide: '周辺ガイド',
    speaking: '話してください...',
    typeMessage: 'メッセージを入力...'
  },
  en: {
    welcome: 'Welcome to Sakura Grand Hotel',
    hotelName: 'Sakura Grand Hotel',
    chatButton: 'Ask via Chat',
    chatSubtext: 'Ask us anything',
    voiceButton: 'Ask via Voice',
    voiceSubtext: 'Please speak to us',
    quickAccess: 'Quick Access',
    checkinTime: 'Check-in Time',
    wifiPassword: 'Wi-Fi Password',
    breakfast: 'Breakfast Hours',
    facilities: 'Facilities Guide',
    info: 'Information',
    faq: 'FAQ',
    menu: 'Menu',
    phrases: 'Conversation Phrases',
    currency: 'Currency Converter',
    pointTalk: 'Point & Talk',
    areaGuide: 'Area Guide',
    speaking: 'Please speak...',
    typeMessage: 'Type your message...'
  },
  zh: {
    welcome: '欢迎来到樱花大酒店',
    hotelName: 'Sakura Grand Hotel',
    chatButton: '聊天咨询',
    chatSubtext: '有任何问题请咨询',
    voiceButton: '语音咨询',
    voiceSubtext: '请说话',
    quickAccess: '常见问题',
    checkinTime: '入住时间',
    wifiPassword: 'Wi-Fi密码',
    breakfast: '早餐时间',
    facilities: '设施指南',
    info: '信息',
    faq: '常见问题',
    menu: '菜单',
    phrases: '会话短语',
    currency: '货币换算',
    pointTalk: '指点对话',
    areaGuide: '周边指南',
    speaking: '请说话...',
    typeMessage: '输入您的消息...'
  },
  ko: {
    welcome: '사쿠라 그랜드 호텔에 오신 것을 환영합니다',
    hotelName: 'Sakura Grand Hotel',
    chatButton: '채팅으로 문의',
    chatSubtext: '무엇이든 물어보세요',
    voiceButton: '음성으로 문의',
    voiceSubtext: '말씀해 주세요',
    quickAccess: '자주 묻는 질문',
    checkinTime: '체크인 시간',
    wifiPassword: 'Wi-Fi 비밀번호',
    breakfast: '조식 시간',
    facilities: '시설 안내',
    info: '정보',
    faq: 'FAQ',
    menu: '메뉴',
    phrases: '회화 문구집',
    currency: '환율 계산기',
    pointTalk: '가리키며 대화',
    areaGuide: '주변 가이드',
    speaking: '말씀해 주세요...',
    typeMessage: '메시지를 입력하세요...'
  },
  th: {
    welcome: 'ยินดีต้อนรับสู่ซากุระ แกรนด์ โฮเทล',
    hotelName: 'Sakura Grand Hotel',
    chatButton: 'สอบถามผ่านแชท',
    chatSubtext: 'สอบถามอะไรก็ได้',
    voiceButton: 'สอบถามด้วยเสียง',
    voiceSubtext: 'กรุณาพูด',
    quickAccess: 'คำถามที่พบบ่อย',
    checkinTime: 'เวลาเช็คอิน',
    wifiPassword: 'รหัส Wi-Fi',
    breakfast: 'เวลาอาหารเช้า',
    facilities: 'คู่มือสิ่งอำนวยความสะดวก',
    info: 'ข้อมูล',
    faq: 'คำถามที่พบบ่อย',
    menu: 'เมนู',
    phrases: 'วลีสนทนา',
    currency: 'แปลงสกุลเงิน',
    pointTalk: 'ชี้และพูด',
    areaGuide: 'คู่มือพื้นที่',
    speaking: 'กรุณาพูด...',
    typeMessage: 'พิมพ์ข้อความของคุณ...'
  }
};

// Background images array
const backgroundImages = [
  hotelLobby,
  hotelRoom,
  hotelRestaurant,
  hotelSpa,
  hotelExterior
];

// Quick access buttons data
const quickButtons = [
  { icon: Clock, key: 'checkinTime', question: 'チェックイン時間を教えてください' },
  { icon: Wifi, key: 'wifiPassword', question: 'Wi-Fiのパスワードを教えてください' },
  { icon: Utensils, key: 'breakfast', question: '朝食の時間と場所を教えてください' },
  { icon: MapPin, key: 'facilities', question: '施設案内をお願いします' }
];

const HotelConciergeApp: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState('ja');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, sender: 'user' | 'bot', isMarkdown?: boolean}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const t = translations[currentLanguage as keyof typeof translations];

  // Check API key on mount
  useEffect(() => {
    const savedApiKey = getApiKey();
    if (!savedApiKey) {
      setShowApiKeyModal(true);
    }
  }, []);

  // Background slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Welcome message effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleQuickQuestion = async (question: string) => {
    setActiveModal('chat');
    setChatMessages([{text: question, sender: 'user'}]);
    await sendMessageToBot(question);
  };

  const handleSendMessage = async () => {
    if (currentMessage.trim() && !isLoading) {
      const message = currentMessage.trim();
      setChatMessages(prev => [...prev, {text: message, sender: 'user'}]);
      setCurrentMessage('');
      await sendMessageToBot(message);
    }
  };

  const sendMessageToBot = async (message: string) => {
    setIsLoading(true);
    try {
      const response = await sendMessageToAI(message);
      setChatMessages(prev => [...prev, {text: response, sender: 'bot', isMarkdown: true}]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '申し訳ございません。現在AIと通信できません。しばらく待ってから再度お試しください。';
      setChatMessages(prev => [...prev, {text: errorMessage, sender: 'bot'}]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      saveApiKey(apiKey.trim());
      setShowApiKeyModal(false);
      setApiKey('');
    }
  };

  const VoiceWaveform = () => (
    <div className="flex items-center justify-center space-x-1">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-white rounded-full"
          animate={{ height: [8, 24, 8] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={backgroundImages[currentImageIndex]}
              alt="Hotel background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-4 pt-safe">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveModal('menu')}
          className="p-3 glass rounded-full text-white hover:bg-white/20 transition-colors"
        >
          <Menu size={24} />
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white text-center flex-1"
        >
          {t.hotelName}
        </motion.h1>

        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="p-3 glass rounded-full text-white hover:bg-white/20 transition-colors flex items-center space-x-1"
          >
            <Globe size={20} />
            <ChevronDown size={16} className={`transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
          </motion.button>

          {/* Language Dropdown */}
          <AnimatePresence>
            {showLanguageDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 glass rounded-2xl p-2 min-w-[160px]"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLanguage(lang.code);
                      setShowLanguageDropdown(false);
                    }}
                    className={`w-full flex items-center space-x-2 p-2 rounded-xl text-white hover:bg-white/20 transition-colors ${
                      currentLanguage === lang.code ? 'bg-white/20' : ''
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 space-y-8">
        {/* Main Action Buttons */}
        <div className="w-full max-w-sm space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveModal('chat')}
            className="w-full h-16 glass rounded-2xl text-white hover:bg-white/25 transition-all flex items-center justify-center space-x-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <MessageCircle size={24} />
            <div className="text-left">
              <div className="font-semibold">{t.chatButton}</div>
              <div className="text-xs opacity-80">{t.chatSubtext}</div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setActiveModal('voice');
              setIsVoiceActive(true);
            }}
            className="w-full h-16 glass rounded-2xl text-white hover:bg-white/25 transition-all flex items-center justify-center space-x-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Mic size={24} />
            <div className="text-left">
              <div className="font-semibold">{t.voiceButton}</div>
              <div className="text-xs opacity-80">{t.voiceSubtext}</div>
            </div>
          </motion.button>
        </div>

        {/* Quick Access Buttons */}
        <div className="w-full max-w-sm">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white text-center mb-4 font-semibold"
          >
            {t.quickAccess}
          </motion.h3>
          <div className="grid grid-cols-2 gap-3">
            {quickButtons.map((button, index) => (
              <motion.button
                key={button.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuickQuestion(button.question)}
                className="h-16 glass rounded-xl text-white hover:bg-white/25 transition-all flex flex-col items-center justify-center space-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <button.icon size={20} />
                <span className="text-xs">{t[button.key as keyof typeof t]}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex justify-between p-4 pb-safe">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveModal('info')}
          className="p-3 glass rounded-full text-white hover:bg-white/20 transition-colors"
        >
          <Info size={24} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveModal('faq')}
          className="p-3 glass rounded-full text-white hover:bg-white/20 transition-colors"
        >
          <FileText size={24} />
        </motion.button>
      </footer>

      {/* Welcome Message */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="glass rounded-3xl p-8 text-center text-white"
            >
              <h2 className="text-2xl font-bold">{t.welcome}</h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {activeModal === 'chat' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/50 flex items-end"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full h-4/5 bg-white rounded-t-3xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{t.chatButton}</h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-3 rounded-2xl ${
                      message.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}>
                      {message.isMarkdown ? (
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown>{message.text}</ReactMarkdown>
                        </div>
                      ) : (
                        message.text
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-2xl flex items-center space-x-2">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-sm">AIが応答中...</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder={t.typeMessage}
                  className="flex-1 p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="p-3 bg-primary text-white rounded-2xl hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Modal */}
      <AnimatePresence>
        {activeModal === 'voice' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="glass rounded-3xl p-8 text-center text-white max-w-sm w-full mx-4"
            >
              <div className="mb-6">
                <motion.div
                  animate={{ scale: isVoiceActive ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-24 h-24 glass rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Mic size={48} />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{t.voiceButton}</h3>
                <p className="text-sm opacity-80">{t.speaking}</p>
              </div>
              
              {isVoiceActive && <VoiceWaveform />}
              
              <button
                onClick={() => {
                  setActiveModal(null);
                  setIsVoiceActive(false);
                }}
                className="mt-6 px-6 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Modal */}
      <AnimatePresence>
        {activeModal === 'menu' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="glass rounded-3xl p-6 text-white max-w-sm w-full mx-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">{t.menu}</h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 hover:bg-white/20 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-3">
                {[
                  { icon: MessageSquare, label: t.phrases },
                  { icon: DollarSign, label: t.currency },
                  { icon: Hand, label: t.pointTalk },
                  { icon: Map, label: t.areaGuide }
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-4 glass rounded-xl hover:bg-white/25 transition-all flex items-center space-x-3"
                  >
                    <item.icon size={24} />
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Modal */}
      <AnimatePresence>
        {activeModal === 'info' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full mx-4 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">{t.info}</h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Hotel Information</h4>
                  <p>Address: 1-2-3 Sakura District, Tokyo</p>
                  <p>Phone: +81-3-1234-5678</p>
                  <p>Email: info@sakuragrand.com</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Operating Hours</h4>
                  <p>Front Desk: 24 hours</p>
                  <p>Restaurant: 6:00-23:00</p>
                  <p>Spa: 24 hours</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ Modal */}
      <AnimatePresence>
        {activeModal === 'faq' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full mx-4 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">{t.faq}</h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                {[
                  { q: 'Check-in time?', a: '15:00 - 24:00' },
                  { q: 'Check-out time?', a: '11:00' },
                  { q: 'Wi-Fi password?', a: 'SakuraGuest2024' },
                  { q: 'Breakfast hours?', a: '6:30 - 10:00' },
                  { q: 'Room service?', a: '24 hours available' }
                ].map((faq, index) => (
                  <div key={index} className="border-b pb-3">
                    <h4 className="font-semibold text-sm">{faq.q}</h4>
                    <p className="text-gray-600 text-sm mt-1">{faq.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* API Key Setup Modal */}
      <AnimatePresence>
        {showApiKeyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] bg-black/70 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full mx-4"
            >
              <div className="text-center mb-6">
                <Settings size={48} className="mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">OpenAI API Key Setup</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>⚠️ <strong>開発・学習用の設定です</strong></p>
                  <p>本番環境では使用しないでください</p>
                  <p>APIキーはブラウザのlocalStorageに保存されます</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    OpenAI API Key
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• OpenAI Platform (platform.openai.com) でAPIキーを取得</p>
                  <p>• GPT-4の利用権限が必要です</p>
                  <p>• 使用量に応じて課金されます</p>
                </div>
                
                <button
                  onClick={handleSaveApiKey}
                  disabled={!apiKey.trim()}
                  className="w-full p-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  保存してアプリを開始
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotelConciergeApp;