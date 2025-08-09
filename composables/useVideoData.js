// composables/useVideoData.js

export const useVideoData = () => {
  return {
    videoCategories: {

      intro: {
        emoji: '🌏',
        title: '中国語学習者のステップ',
        description: '初心者から上級者まで、中国語学習の進め方や習得までの目安をステップごとに紹介します。',
        videos: [
          {
            id: 'intro01',
            title: '初級者はどう進めるべき？',
            youtubeUrl: 'https://www.youtube.com/embed/guide03',
            description: 'どこから始めれば良いか、学習の第一歩をアドバイス。',
            thumbnail: '',
            duration: '2:40'
          },
          {
            id: 'intro02',
            title: '中級・上級者におすすめの学習法は？',
            youtubeUrl: 'https://www.youtube.com/embed/guide05',
            description: '読解力や表現力を伸ばすための勉強法や、次のレベルを目指すための学習のコツを解説します。',
            thumbnail: '',
            duration: '3:10'
          },
          {
            id: 'intro03',
            title: 'どれくらいで中国語が話せるようになる？',
            youtubeUrl: 'https://www.youtube.com/embed/guide05',
            description: '勉強時間の目安や、実際に話せるようになるまでのステップについて、学習者の目線で解説します。',
            thumbnail: '',
            duration: '3:10'
          },
          {
            id: 'intro04',
            title: 'HSK試験の目安時間と語彙数',
            youtubeUrl: 'https://www.youtube.com/embed/guide06',
            description: '各レベルの合格に必要な語彙数・勉強時間の目安を紹介し、目標設定の参考にしていただけます。',
            thumbnail: '',
            duration: '3:00'
          }
        ]
      },

      learning: {
        emoji: '🎓',
        title: 'BizCHINAの活用方法',
        description: 'BizCHINAの特長を活かして、あなたに合った学習スタイルを見つけましょう。コースの選び方から教材の進め方まで、活用方法を詳しくご紹介します。',
        videos: [
          {
            id: 'learn01',
            title: '総合コースと会話コースの違い',
            youtubeUrl: 'https://www.youtube.com/embed/guide02',
            description: '総合コースは基礎力をしっかり身につけたい人に、会話コースは話す力を中心に伸ばしたい人におすすめです。',
            thumbnail: '',
            duration: '3:00'
          },
          {
            id: 'learn02',
            title: '教材の構成と進め方',
            youtubeUrl: 'https://www.youtube.com/embed/plan01',
            description: '教材の種類と使い方を紹介します。',
            thumbnail: '',
            duration: '2:45'
          },
          {
            id: 'learn03',
            title: '講師の選び方と質のこだわり',
            youtubeUrl: 'https://www.youtube.com/embed/textbook01',
            description: '講師採用の基準や研修制度について解説します。',
            thumbnail: '',
            duration: '2:50'
          },
          {
            id: 'learn04',
            title: 'サブスクとチケットの違い',
            youtubeUrl: 'https://www.youtube.com/embed/teacherPolicy01',
            description: '柔軟な料金プランの特徴を解説します。',
            thumbnail: '',
            duration: '3:00'
          }
        ]
      },

      teacher: {
        emoji: '👩‍🏫',
        title: '講師の紹介',
        description: 'BizCHINAの魅力的な講師陣を動画で紹介します。',
        videos: [
          { id: 'teacher01', title: '姜金辰講師', youtubeUrl: 'https://www.youtube.com/embed/i0l8rV5Y1FA', description: 'やさしく丁寧な授業で人気の講師A。', thumbnail: '', duration: '2:20' },
          { id: 'teacher02', title: '方媛講師', youtubeUrl: 'https://www.youtube.com/embed/2n-lnJYL5cs', description: 'ネイティブレベルの発音と実践的な指導。', thumbnail: '', duration: '2:10' },
          { id: 'teacher03', title: '董明講師', youtubeUrl: 'https://www.youtube.com/embed/TEgELDCd_Wc', description: '学習者目線での説明が得意な講師C。', thumbnail: '', duration: '2:30' },
          { id: 'teacher04', title: '高远远講師', youtubeUrl: 'https://www.youtube.com/embed/_GgF7BsNl68', description: 'やさしく丁寧な授業で人気の講師A。', thumbnail: '', duration: '2:20' },
          { id: 'teacher05', title: '孙东旭講師', youtubeUrl: 'https://www.youtube.com/embed/LeNrSGIeXRc', description: 'ネイティブレベルの発音と実践的な指導。', thumbnail: '', duration: '2:10' },
          { id: 'teacher06', title: '乔十惠講師', youtubeUrl: 'https://www.youtube.com/embed/FiFVyoGZsE8', description: '学習者目線での説明が得意な講師C。', thumbnail: '', duration: '2:30' },
          { id: 'teacher07', title: '隋安邦講師', youtubeUrl: 'https://www.youtube.com/embed/-3rYHLbggus', description: 'ネイティブレベルの発音と実践的な指導。', thumbnail: '', duration: '2:10' },
          { id: 'teacher08', title: '张晓凤講師', youtubeUrl: 'https://www.youtube.com/embed/E447FggdTFc', description: '学習者目線での説明が得意な講師C。', thumbnail: '', duration: '2:30' }
        ]
      },
      grammar: {
        emoji: '🧠',
        title: '文法講座',
        description: '中国語の文法をテーマごとに解説する動画シリーズ。',
        videos: [
          { id: 'grammar01', title: '初級上1課　「姓」「叫」の用法', youtubeUrl: 'https://www.youtube.com/embed/R5vapH3fCrw', description: '中国語の文法基礎を解説。', thumbnail: '', duration: '3:00' },
          { id: 'grammar02', title: '初級上2課　「是」の用法', youtubeUrl: 'https://www.youtube.com/embed/K9RC-NTKgnE', description: '文末や動詞の後ろに使われる「了」の意味と使い分け。', thumbnail: '', duration: '3:20' },
          { id: 'grammar03', title: '初級上3課　「想」「要」の用法', youtubeUrl: 'https://www.youtube.com/embed/PEA29mgN0do', description: '中国語の文法基礎を解説。', thumbnail: '', duration: '3:00' },
          { id: 'grammar04', title: '初級上4課　「名詞+形容詞」の用法', youtubeUrl: 'https://www.youtube.com/embed/qmaoaPphufk', description: '文末や動詞の後ろに使われる「了」の意味と使い分け。', thumbnail: '', duration: '3:20' },
          { id: 'grammar05', title: '初級上5課　「了」の用法', youtubeUrl: 'https://www.youtube.com/embed/ARm3UcKAyAg', description: '中国語の文法基礎を解説。', thumbnail: '', duration: '3:00' },
          { id: 'grammar06', title: '初級上6課　「有」「没有」の用法', youtubeUrl: 'https://www.youtube.com/embed/Iy5BwGi0RYc', description: '文末や動詞の後ろに使われる「了」の意味と使い分け。', thumbnail: '', duration: '3:20' },
          { id: 'grammar07', title: '初級上7課　「助動詞」の用法', youtubeUrl: 'https://www.youtube.com/embed/fKSmg7KgMt4', description: '中国語の文法基礎を解説。', thumbnail: '', duration: '3:00' },
          { id: 'grammar08', title: '初級上8課　「好+動詞」の用法', youtubeUrl: 'https://www.youtube.com/embed/BLNpIvweMOg', description: '文末や動詞の後ろに使われる「了」の意味と使い分け。', thumbnail: '', duration: '3:20' }
        ]
      },
      hsk: {
        emoji: '📘',
        title: 'HSK単語',
        description: '各レベルのHSK単語を効率よく覚えられるように、重要単語や覚え方のコツを動画で紹介します。',
        videos: [
          {
            id: 'hsk01',
            title: 'HSK1級の必須単語100',
            youtubeUrl: 'https://www.youtube.com/embed/EEZg7_EJpAo',
            description: '初級者向けの基本単語をわかりやすく紹介します。',
            thumbnail: '',
            duration: '3:00'
          },
          {
            id: 'hsk02',
            title: 'HSK2級の頻出単語',
            youtubeUrl: 'https://www.youtube.com/embed/2ijB-JUfCjs',
            description: '試験によく出る単語と例文を使った覚え方を解説。',
            thumbnail: '',
            duration: '3:15'
          },
          {
            id: 'hsk03',
            title: 'HSK3級 単語の語感と使い方',
            youtubeUrl: 'https://www.youtube.com/embed/oPLbaS6Y9ao',
            description: '中級単語の使い分けや文脈での理解をサポートします。',
            thumbnail: '',
            duration: '3:30'
          },
          {
            id: 'hsk04',
            title: 'HSK4級 頻出単語ベスト100',
            youtubeUrl: 'https://www.youtube.com/embed/GxuqP97YCHw',
            description: '長文読解や作文に使える重要単語を厳選して紹介します。',
            thumbnail: '',
            duration: '3:20'
          },
          {
            id: 'hsk05',
            title: 'HSK5級 動詞・形容詞の使い分け',
            youtubeUrl: 'https://www.youtube.com/embed/NiY6u3ClNxE',
            description: '上級者向け語彙のニュアンスと例文での使い方を学びます。',
            thumbnail: '',
            duration: '3:40'
          },
          {
            id: 'hsk06',
            title: 'HSK6級 読解に強くなる語彙力',
            youtubeUrl: 'https://www.youtube.com/embed/bvRd1G1zIzQ',
            description: '複雑な語彙を効率よく覚える方法を紹介します。',
            thumbnail: '',
            duration: '3:50'
          },
          {
            id: 'hsk07',
            title: 'カテゴリー別に覚える単語法',
            youtubeUrl: 'https://www.youtube.com/embed/LzLF5MmFCqc',
            description: '場面やテーマ別に単語をまとめて覚えるコツを解説。',
            thumbnail: '',
            duration: '3:10'
          }
        ]
      },
      platform: {
        emoji: '🖥️',
        title: 'サイトの使い方',
        description: '予約方法やマイページ操作など、使い方を丁寧に紹介します。',
        videos: [
          { id: 'plat01', title: 'マイページの使い方', youtubeUrl: 'https://www.youtube.com/embed/plat01', description: '初めての方向けナビ動画。', thumbnail: 'https://via.placeholder.com/260x150', duration: '2:15' },
          { id: 'plat02', title: 'レンスン予約とキャンセル方法', youtubeUrl: 'https://www.youtube.com/embed/plat02', description: 'スムーズに予約操作をしよう。', thumbnail: 'https://via.placeholder.com/260x150', duration: '2:30' },
          { id: 'plat03', title: '退会について', youtubeUrl: 'https://www.youtube.com/embed/plat03', description: '先生の情報を事前にチェック。', thumbnail: 'https://via.placeholder.com/260x150', duration: '2:20' }
        ]
      }

    }
  }
}
