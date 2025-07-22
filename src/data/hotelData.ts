// 「サクラグランドホテル」の充実したホテルデータ
export const hotelData = {
  hotelSpecificConfig: {
    hotelName: {
      _ja: "サクラグランドホテル",
      _en: "Sakura Grand Hotel",
      _zh: "樱花大酒店",
      _ko: "사쿠라 그랜드 호텔",
      _th: "โรงแรมซากุระ แกรนด์"
    },
    address_ja: "〒100-0004 東京都千代田区大手町1-1-1",
    phoneNumber: "03-1234-5678",
    email: "concierge@sakura-grand.com",
    
    basicInfo: {
      checkinTime_ja: "15:00",
      checkoutTime_ja: "11:00",
      wifiSsid_ja: "SAKURA_GUEST_WIFI",
      wifiPassword: "sakura2024"
    },

    facilities: [
      {
        name_ja: "大浴場「桜湯」",
        name_en: "Spa \"Sakura-yu\"",
        floor_ja: "地下1階",
        operatingHours_ja: "6:00-24:00",
        description_ja: "天然温泉を使用した大浴場"
      },
      {
        name_ja: "フィットネスジム",
        name_en: "Fitness Gym",
        floor_ja: "3階",
        operatingHours_ja: "24時間営業",
        description_ja: "最新設備を揃えたフィットネスジム"
      },
      {
        name_ja: "レストラン「花鳥風月」",
        name_en: "Restaurant \"Kachoufugetsu\"",
        floor_ja: "2階",
        operatingHours_ja: "夕食 18:00-22:00",
        description_ja: "和食を中心とした高級レストラン"
      },
      {
        name_ja: "レストラン「花みずき」",
        name_en: "Restaurant \"Hanamizuki\"",
        floor_ja: "1階",
        operatingHours_ja: "朝食 7:00-10:00",
        description_ja: "朝食専用レストラン"
      }
    ],

    breakfast: {
      venue_ja: "レストラン「花みずき」（1階）",
      hours_ja: "7:00-10:00",
      adultPrice_ja: "大人 2,000円",
      childPrice_ja: "小学生 1,000円（小学生未満無料）"
    },

    faq: [
      {
        question_ja: "Wi-Fiのパスワードを教えてください",
        question_en: "What is the Wi-Fi password?",
        answerContext_ja: "SSID「SAKURA_GUEST_WIFI」、パスワード「sakura2024」です。"
      },
      {
        question_ja: "大浴場の利用時間は？",
        question_en: "What are the spa operating hours?",
        answerContext_ja: "大浴場「桜湯」は地下1階にあり、6:00-24:00までご利用いただけます。天然温泉です。"
      },
      {
        question_ja: "コインランドリーはありますか？",
        question_en: "Is there a coin laundry?",
        answerContext_ja: "3階に24時間営業のコインランドリーがございます。洗濯300円、乾燥200円です。"
      },
      {
        question_ja: "近くにコンビニはありますか？",
        question_en: "Is there a convenience store nearby?",
        answerContext_ja: "徒歩2分の場所にセブン-イレブンがあり、24時間営業です。"
      },
      {
        question_ja: "荷物預かりサービスはありますか？",
        question_en: "Do you have luggage storage service?",
        answerContext_ja: "チェックイン前・チェックアウト後も無料で荷物をお預かりいたします。フロントまでお申し付けください。"
      },
      {
        question_ja: "喫煙所はありますか？",
        question_en: "Is there a smoking area?",
        answerContext_ja: "1階ロビー横と屋上（5階）に喫煙所がございます。"
      },
      {
        question_ja: "外貨両替はできますか？",
        question_en: "Can I exchange foreign currency?",
        answerContext_ja: "フロントで主要通貨の両替が可能です。レートはフロントでご確認ください。"
      },
      {
        question_ja: "ベビーベッドの貸し出しはありますか？",
        question_en: "Do you have baby crib rental?",
        answerContext_ja: "ベビーベッドの無料貸し出しを行っております。事前にご予約をお願いいたします。"
      },
      {
        question_ja: "空港までのアクセス方法は？",
        question_en: "How can I get to the airport?",
        answerContext_ja: "成田空港まで成田エクスプレス+地下鉄で65分、羽田空港まで京急線+地下鉄で45分です。"
      },
      {
        question_ja: "駐車場はありますか？",
        question_en: "Do you have parking?",
        answerContext_ja: "地下駐車場があり、1泊2,000円でご利用いただけます。事前予約をお勧めします。"
      },
      {
        question_ja: "レストランの予約はどうすればいいですか？",
        question_en: "How can I make a restaurant reservation?",
        answerContext_ja: "フロント（03-1234-5678）またはコンシェルジュデスクで承ります。"
      }
    ],

    surroundingGuide_ja: [
      {
        name: "セブン-イレブン 大手町店",
        category: "コンビニ",
        distance: "徒歩2分",
        operatingHours: "24時間営業",
        description: "日用品、軽食、ATMあり"
      },
      {
        name: "ファミリーマート 大手町駅前店",
        category: "コンビニ",
        distance: "徒歩3分",
        operatingHours: "24時間営業",
        description: "コピー機、宅配便受付あり"
      },
      {
        name: "ローソン 大手町ビル店",
        category: "コンビニ",
        distance: "徒歩4分",
        operatingHours: "6:00-24:00",
        description: "ローソン銀行ATMあり"
      },
      {
        name: "オーケー銀座店",
        category: "スーパー",
        distance: "徒歩8分",
        operatingHours: "10:00-21:30",
        description: "食品、日用品、お酒類"
      },
      {
        name: "SEIJO ISHII 大手町店",
        category: "高級スーパー",
        distance: "徒歩5分",
        operatingHours: "7:00-23:00",
        description: "輸入食品、ワイン、デリカテッセン"
      },
      {
        name: "皇居東御苑",
        category: "観光地",
        distance: "徒歩10分",
        operatingHours: "9:00-16:30（時期により変動）",
        description: "江戸城跡の美しい庭園、無料入園"
      },
      {
        name: "心字池",
        category: "観光地",
        distance: "徒歩12分",
        operatingHours: "24時間",
        description: "皇居外苑の美しい池、散策コース"
      },
      {
        name: "グランスタ東京",
        category: "ショッピング",
        distance: "徒歩6分",
        operatingHours: "8:00-22:00",
        description: "東京駅構内の大型商業施設"
      },
      {
        name: "KITTE丸の内",
        category: "ショッピング",
        distance: "徒歩7分",
        operatingHours: "11:00-21:00",
        description: "旧東京中央郵便局の商業施設"
      },
      {
        name: "東京ミッドタウン日比谷",
        category: "ショッピング",
        distance: "徒歩15分",
        operatingHours: "11:00-21:00",
        description: "高級ブランド、レストラン、映画館"
      },
      {
        name: "つきじ青空三代目",
        category: "レストラン（和食）",
        distance: "徒歩5分",
        operatingHours: "11:00-14:00, 17:00-22:00",
        description: "築地直送の新鮮な海鮮料理"
      },
      {
        name: "ラ・ベカス",
        category: "レストラン（洋食）",
        distance: "徒歩8分",
        operatingHours: "12:00-14:00, 18:00-22:00",
        description: "フレンチビストロ、ワインセレクション豊富"
      },
      {
        name: "椿屋カフェ 大手町店",
        category: "カフェ",
        distance: "徒歩4分",
        operatingHours: "7:30-21:00",
        description: "老舗喫茶店、コーヒーとスイーツ"
      },
      {
        name: "スターバックス 大手町タワー店",
        category: "カフェ",
        distance: "徒歩3分",
        operatingHours: "7:00-21:00",
        description: "Wi-Fi完備、電源席あり"
      },
      {
        name: "三菱UFJ銀行ATM",
        category: "ATM",
        distance: "徒歩2分",
        operatingHours: "24時間",
        description: "日本語・英語対応"
      },
      {
        name: "セブン銀行ATM",
        category: "ATM",
        distance: "徒歩2分",
        operatingHours: "24時間",
        description: "多言語対応、海外カード利用可"
      },
      {
        name: "大手町温泉",
        category: "温泉",
        distance: "徒歩10分",
        operatingHours: "11:00-23:00",
        description: "都心の天然温泉、日帰り入浴可"
      },
      {
        name: "東京国際フォーラム",
        category: "イベント会場",
        distance: "徒歩12分",
        operatingHours: "施設により異なる",
        description: "コンサート、展示会、会議場"
      }
    ],

    accessInfo_ja: {
      nearestStation: {
        name: "大手町駅",
        lines: ["丸ノ内線", "東西線", "千代田線", "半蔵門線"],
        walkingTime: "徒歩3分"
      },
      fromMajorAirports: [
        {
          airport: "成田空港",
          methods: [
            {
              route: "成田エクスプレス + 地下鉄",
              duration: "65分",
              cost: "3,070円"
            }
          ]
        },
        {
          airport: "羽田空港",
          methods: [
            {
              route: "京急線 + 地下鉄",
              duration: "45分",
              cost: "610円"
            }
          ]
        }
      ],
      fromTokyoStation: {
        taxi: {
          duration: "10分",
          cost: "1,000-1,500円"
        },
        walking: {
          duration: "15分"
        }
      }
    }
  }
};

// テスト質問集
export const testQuestions = {
  ja: [
    "Wi-Fiのパスワードを教えてください",
    "朝食の時間と料金を教えてください",
    "大浴場の営業時間は？",
    "近くにコンビニはありますか？",
    "チェックアウト後も荷物を預かってもらえますか？",
    "成田空港までの行き方を教えてください",
    "レストランの予約をしたいです",
    "コインランドリーはありますか？",
    "皇居東御苑への行き方は？",
    "駐車場はありますか？",
    "喫煙所はどこにありますか？",
    "外貨両替はできますか？"
  ],
  en: [
    "What is the Wi-Fi password?",
    "What time is breakfast and how much does it cost?",
    "What are the spa operating hours?",
    "Is there a convenience store nearby?",
    "Can I store my luggage after checkout?",
    "How can I get to Narita Airport?",
    "I would like to make a restaurant reservation",
    "Is there a coin laundry?",
    "How can I get to the Imperial Palace East Gardens?",
    "Do you have parking?"
  ]
};