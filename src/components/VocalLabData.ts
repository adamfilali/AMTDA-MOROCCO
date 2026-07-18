export interface LanguageLesson {
  id: string;
  lang: 'fr' | 'en' | 'zh';
  category: 'polite' | 'vocab' | 'expression';
  phrase: string;
  translation: string;
  pinyin?: string; // for Chinese
}

export interface Proverb {
  id: string;
  lang: 'fr' | 'en';
  text: string;
  translation: string;
  meaning: string;
}

export const VOCAL_LAB_LESSONS: LanguageLesson[] = [
  // ==================== FRENCH (50 PHRASES) ====================
  { id: 'fr_1', lang: 'fr', category: 'polite', phrase: "S'il vous plaît, aidez-moi.", translation: "Requesting assistance politely." },
  { id: 'fr_2', lang: 'fr', category: 'polite', phrase: "Merci infiniment pour votre aide.", translation: "Expressing deep gratitude." },
  { id: 'fr_3', lang: 'fr', category: 'polite', phrase: "Bonjour, comment allez-vous aujourd'hui ?", translation: "Polite daily greeting." },
  { id: 'fr_4', lang: 'fr', category: 'polite', phrase: "Excusez-moi du dérangement.", translation: "Apologizing for a mild disruption." },
  { id: 'fr_5', lang: 'fr', category: 'polite', phrase: "Je vous en prie, après vous.", translation: "Politely letting someone go first." },
  { id: 'fr_6', lang: 'fr', category: 'polite', phrase: "Pardonnez-moi, je n'ai pas fait exprès.", translation: "Apologizing sincerely for an accident." },
  { id: 'fr_7', lang: 'fr', category: 'polite', phrase: "C'est un grand plaisir de vous rencontrer.", translation: "Pleasure of meeting someone." },
  { id: 'fr_8', lang: 'fr', category: 'polite', phrase: "Bonne journée et prenez bien soin de vous.", translation: "Warm farewell wishing safety." },
  { id: 'fr_9', lang: 'fr', category: 'polite', phrase: "Puis-je vous poser une question, s'il vous plaît ?", translation: "Asking permission to ask a question." },
  { id: 'fr_10', lang: 'fr', category: 'polite', phrase: "Enchanté de faire votre connaissance.", translation: "Nice meeting you." },
  { id: 'fr_11', lang: 'fr', category: 'polite', phrase: "Faites comme chez vous, je vous prie.", translation: "Making a guest feel comfortable." },
  { id: 'fr_12', lang: 'fr', category: 'polite', phrase: "Merci pour ce délicieux repas de fête.", translation: "Thanking for food/meal." },
  { id: 'fr_13', lang: 'fr', category: 'polite', phrase: "Je vous souhaite une excellente réussite.", translation: "Wishing success." },
  { id: 'fr_14', lang: 'fr', category: 'polite', phrase: "Toutes mes félicitations pour vos progrès !", translation: "Congratulating on progress." },
  { id: 'fr_15', lang: 'fr', category: 'polite', phrase: "Bon courage pour vos examens de fin d'année.", translation: "Encouraging for upcoming exams." },
  
  { id: 'fr_16', lang: 'fr', category: 'vocab', phrase: "L'inclusion scolaire", translation: "School inclusion for children of all backgrounds." },
  { id: 'fr_17', lang: 'fr', category: 'vocab', phrase: "La persévérance", translation: "Steadfastness in doing something despite difficulty." },
  { id: 'fr_18', lang: 'fr', category: 'vocab', phrase: "L'empathie bienveillante", translation: "The ability to understand and share the feelings of others with kindness." },
  { id: 'fr_19', lang: 'fr', category: 'vocab', phrase: "La solidarité active", translation: "Mutual support and cooperation in action." },
  { id: 'fr_20', lang: 'fr', category: 'vocab', phrase: "La rééducation orthophonique", translation: "Speech and language therapy." },
  { id: 'fr_21', lang: 'fr', category: 'vocab', phrase: "L'autonomie personnelle", translation: "Developing independence in child's life." },
  { id: 'fr_22', lang: 'fr', category: 'vocab', phrase: "La créativité artistique", translation: "Expressing ideas through colorful shapes and drawings." },
  { id: 'fr_23', lang: 'fr', category: 'vocab', phrase: "L'intelligence collective", translation: "Shared or group cognitive ability." },
  { id: 'fr_24', lang: 'fr', category: 'vocab', phrase: "La confiance en soi", translation: "Believing in your own powers and abilities." },
  { id: 'fr_25', lang: 'fr', category: 'vocab', phrase: "L'apprentissage ludique", translation: "Learning while having fun with games." },
  { id: 'fr_26', lang: 'fr', category: 'vocab', phrase: "Le dépassement de soi", translation: "Pushing past one's limits and evolving." },
  { id: 'fr_27', lang: 'fr', category: 'vocab', phrase: "L'écoute bienveillante", translation: "Listening to others with empathy and without judgment." },
  { id: 'fr_28', lang: 'fr', category: 'vocab', phrase: "La psychomotricité fine", translation: "Coordination of small muscles, in movements involving hands." },
  { id: 'fr_29', lang: 'fr', category: 'vocab', phrase: "L'école pour tous", translation: "The absolute right of education for every single child." },
  { id: 'fr_30', lang: 'fr', category: 'vocab', phrase: "La diversité humaine", translation: "Acknowledge and respect human differences." },
  { id: 'fr_31', lang: 'fr', category: 'vocab', phrase: "La concentration mentale", translation: "Focusing attention on a specific task." },
  { id: 'fr_32', lang: 'fr', category: 'vocab', phrase: "L'intégration sociale", translation: "Social inclusion of people with disabilities." },
  { id: 'fr_33', lang: 'fr', category: 'vocab', phrase: "La patience infinie", translation: "Sustaining efforts without irritation." },
  { id: 'fr_34', lang: 'fr', category: 'vocab', phrase: "L'amitié solide", translation: "Strong and loyal friendly bonds." },
  { id: 'fr_35', lang: 'fr', category: 'vocab', phrase: "Le soutien familial", translation: "Family's foundational help and encouragement." },

  { id: 'fr_36', lang: 'fr', category: 'expression', phrase: "Prenez votre temps pour lire la phrase.", translation: "Encouragement to read slowly." },
  { id: 'fr_37', lang: 'fr', category: 'expression', phrase: "Chaque petit effort mène à la réussite.", translation: "Reassurance of the compounding value of effort." },
  { id: 'fr_38', lang: 'fr', category: 'expression', phrase: "Nous sommes fiers de ton courage aujourd'hui !", translation: "Expressing pride in child's bravery." },
  { id: 'fr_39', lang: 'fr', category: 'expression', phrase: "Ensemble, nous surmontons les difficultés.", translation: "Affirming teamwork and support." },
  { id: 'fr_40', lang: 'fr', category: 'expression', phrase: "Regarde bien la forme des lettres.", translation: "Helping child focus on letter geometries." },
  { id: 'fr_41', lang: 'fr', category: 'expression', phrase: "Écoute le son de ma voix.", translation: "Directing focus to phonological pronunciation." },
  { id: 'fr_42', lang: 'fr', category: 'expression', phrase: "Tu as fait un travail formidable !", translation: "Praising excellent output." },
  { id: 'fr_43', lang: 'fr', category: 'expression', phrase: "Inspire profondément puis expire calmement.", translation: "Mindful breathing instruction to soothe ADHD/anxiety." },
  { id: 'fr_44', lang: 'fr', category: 'expression', phrase: "Le dessin nous permet de nous évader.", translation: "Artistic expression as cognitive release." },
  { id: 'fr_45', lang: 'fr', category: 'expression', phrase: "La musique adoucit les cœurs de la classe.", translation: "Promoting music-therapy in schools." },
  { id: 'fr_46', lang: 'fr', category: 'expression', phrase: "Chantons en chœur pour fêter l'amitié.", translation: "Joyful group activity encouragement." },
  { id: 'fr_47', lang: 'fr', category: 'expression', phrase: "Cette école est un havre de paix.", translation: "Describing school as a safe space." },
  { id: 'fr_48', lang: 'fr', category: 'expression', phrase: "Ton imagination est une force incroyable.", translation: "Praising child's imagination." },
  { id: 'fr_49', lang: 'fr', category: 'expression', phrase: "Le livre est une porte ouverte sur le monde.", translation: "Metaphor for reading and exploration." },
  { id: 'fr_50', lang: 'fr', category: 'expression', phrase: "Demain est un nouveau jour plein de sourires.", translation: "Positive psychological outlook." },

  // ==================== ENGLISH (50 PHRASES) ====================
  { id: 'en_1', lang: 'en', category: 'polite', phrase: "Please help me.", translation: "Formule de politesse pour demander de l'aide." },
  { id: 'en_2', lang: 'en', category: 'polite', phrase: "Thank you very much for your kindness.", translation: "Formule chaleureuse pour exprimer sa gratitude." },
  { id: 'en_3', lang: 'en', category: 'polite', phrase: "Good morning, how are you today?", translation: "Salutations amicales du matin." },
  { id: 'en_4', lang: 'en', category: 'polite', phrase: "Excuse me for interrupting.", translation: "S'excuser poliment d'interrompre." },
  { id: 'en_5', lang: 'en', category: 'polite', phrase: "You are welcome, it is a pleasure.", translation: "De rien, c'est un plaisir." },
  { id: 'en_6', lang: 'en', category: 'polite', phrase: "I am sorry, it was an accident.", translation: "Je suis désolé, c'était un accident." },
  { id: 'en_7', lang: 'en', category: 'polite', phrase: "It is wonderful to meet you.", translation: "C'est merveilleux de vous rencontrer." },
  { id: 'en_8', lang: 'en', category: 'polite', phrase: "Have a great day and take care.", translation: "Bonne journée et prenez soin de vous." },
  { id: 'en_9', lang: 'en', category: 'polite', phrase: "May I ask a question, please?", translation: "Puis-je poser une question, s'il vous plaît ?" },
  { id: 'en_10', lang: 'en', category: 'polite', phrase: "Pleased to meet your acquaintance.", translation: "Enchanté de faire votre connaissance." },
  { id: 'en_11', lang: 'en', category: 'polite', phrase: "Please make yourself at home.", translation: "Faites comme chez vous." },
  { id: 'en_12', lang: 'en', category: 'polite', phrase: "Thank you for the delicious meal.", translation: "Merci pour ce délicieux repas." },
  { id: 'en_13', lang: 'en', category: 'polite', phrase: "I wish you outstanding success.", translation: "Je vous souhaite un excellent succès." },
  { id: 'en_14', lang: 'en', category: 'polite', phrase: "Congratulations on your amazing progress!", translation: "Félicitations pour vos formidables progrès !" },
  { id: 'en_15', lang: 'en', category: 'polite', phrase: "Good luck with your school tests.", translation: "Bonne chance pour vos tests scolaires." },

  { id: 'en_16', lang: 'en', category: 'vocab', phrase: "Inclusive education", translation: "L'éducation inclusive pour tous." },
  { id: 'en_17', lang: 'en', category: 'vocab', phrase: "Perseverance", translation: "La persévérance face aux défis." },
  { id: 'en_18', lang: 'en', category: 'vocab', phrase: "Loving kindness", translation: "La bienveillance aimante." },
  { id: 'en_19', lang: 'en', category: 'vocab', phrase: "Social solidarity", translation: "La solidarité sociale." },
  { id: 'en_20', lang: 'en', category: 'vocab', phrase: "Speech therapy", translation: "La thérapie de la parole (orthophonie)." },
  { id: 'en_21', lang: 'en', category: 'vocab', phrase: "Personal autonomy", translation: "L'autonomie personnelle." },
  { id: 'en_22', lang: 'en', category: 'vocab', phrase: "Artistic expression", translation: "L'expression artistique." },
  { id: 'en_23', lang: 'en', category: 'vocab', phrase: "Group wisdom", translation: "La sagesse du groupe / intelligence collective." },
  { id: 'en_24', lang: 'en', category: 'vocab', phrase: "Self-confidence", translation: "La confiance en soi." },
  { id: 'en_25', lang: 'en', category: 'vocab', phrase: "Playful learning", translation: "L'apprentissage ludique par le jeu." },
  { id: 'en_26', lang: 'en', category: 'vocab', phrase: "Surpassing yourself", translation: "Le dépassement de soi." },
  { id: 'en_27', lang: 'en', category: 'vocab', phrase: "Empathic listening", translation: "L'écoute empathique." },
  { id: 'en_28', lang: 'en', category: 'vocab', phrase: "Fine motor skills", translation: "La motricité fine." },
  { id: 'en_29', lang: 'en', category: 'vocab', phrase: "School for everyone", translation: "L'école pour tous." },
  { id: 'en_30', lang: 'en', category: 'vocab', phrase: "Human diversity", translation: "La diversité humaine." },
  { id: 'en_31', lang: 'en', category: 'vocab', phrase: "Mental focus", translation: "La concentration mentale." },
  { id: 'en_32', lang: 'en', category: 'vocab', phrase: "Community integration", translation: "L'intégration communautaire." },
  { id: 'en_33', lang: 'en', category: 'vocab', phrase: "Infinite patience", translation: "La patience infinie." },
  { id: 'en_34', lang: 'en', category: 'vocab', phrase: "Strong friendship", translation: "Une amitié solide." },
  { id: 'en_35', lang: 'en', category: 'vocab', phrase: "Family support", translation: "Le soutien familial." },

  { id: 'en_36', lang: 'en', category: 'expression', phrase: "Take your time to read.", translation: "Prenez votre temps pour lire." },
  { id: 'en_37', lang: 'en', category: 'expression', phrase: "Every small step counts towards success.", translation: "Chaque petit pas compte vers la réussite." },
  { id: 'en_38', lang: 'en', category: 'expression', phrase: "We are incredibly proud of you!", translation: "Nous sommes incroyablement fiers de toi !" },
  { id: 'en_39', lang: 'en', category: 'expression', phrase: "Together we can overcome any hardship.", translation: "Ensemble, nous pouvons surmonter tout obstacle." },
  { id: 'en_40', lang: 'en', category: 'expression', phrase: "Look closely at the letters.", translation: "Regarde attentivement les lettres." },
  { id: 'en_41', lang: 'en', category: 'expression', phrase: "Listen to the melody of pronunciation.", translation: "Écoute la mélodie de la prononciation." },
  { id: 'en_42', lang: 'en', category: 'expression', phrase: "You did a fantastic job!", translation: "Tu as fait un travail fantastique !" },
  { id: 'en_43', lang: 'en', category: 'expression', phrase: "Breathe in deeply, then breathe out.", translation: "Inspire profondément, puis expire." },
  { id: 'en_44', lang: 'en', category: 'expression', phrase: "Painting brings peace to the mind.", translation: "La peinture apporte la paix à l'esprit." },
  { id: 'en_45', lang: 'en', category: 'expression', phrase: "Music heals the heart of children.", translation: "La musique guérit le cœur des enfants." },
  { id: 'en_46', lang: 'en', category: 'expression', phrase: "Sing out loud and be happy.", translation: "Chante fort et sois heureux." },
  { id: 'en_47', lang: 'en', category: 'expression', phrase: "This classroom is a peaceful sanctuary.", translation: "Cette classe est un sanctuaire paisible." },
  { id: 'en_48', lang: 'en', category: 'expression', phrase: "Your imagination is a superpower.", translation: "Ton imagination est un super-pouvoir." },
  { id: 'en_49', lang: 'en', category: 'expression', phrase: "Books open the gates of wonders.", translation: "Les livres ouvrent les portes des merveilles." },
  { id: 'en_50', lang: 'en', category: 'expression', phrase: "Tomorrow is full of bright smiles.", translation: "Demain est plein de sourires éclatants." },

  // ==================== CHINESE (50 PHRASES) ====================
  { id: 'zh_1', lang: 'zh', category: 'polite', phrase: "请帮帮我。", pinyin: "Qǐng bāng bāng wǒ.", translation: "S'il vous plaît, aidez-moi / Please help me." },
  { id: 'zh_2', lang: 'zh', category: 'polite', phrase: "非常感谢您的帮助。", pinyin: "Fēicháng gǎnxiè nín de bāngzhù.", translation: "Merci infiniment pour votre aide / Thank you very much." },
  { id: 'zh_3', lang: 'zh', category: 'polite', phrase: "您好，今天怎么样？", pinyin: "Nǐ hǎo, jīntiān zěnmeyàng?", translation: "Bonjour, comment allez-vous aujourd'hui ?" },
  { id: 'zh_4', lang: 'zh', category: 'polite', phrase: "对不起，打扰一下。", pinyin: "Duìbùqǐ, dǎrǎo yīxià.", translation: "Excusez-moi du dérangement." },
  { id: 'zh_5', lang: 'zh', category: 'polite', phrase: "不用客气，这是我的荣幸。", pinyin: "Bùyòng kèqi, zhè shì wǒ de róngxìng.", translation: "Je vous en prie, c'est mon honneur." },
  { id: 'zh_6', lang: 'zh', category: 'polite', phrase: "对不起，我不是故意的。", pinyin: "Duìbùqǐ, wǒ búshì gùyì de.", translation: "Pardonnez-moi, ce n'était pas intentionnel." },
  { id: 'zh_7', lang: 'zh', category: 'polite', phrase: "很高兴认识您。", pinyin: "Hěn gāoxìng rènshi nín.", translation: "Ravi de faire votre connaissance." },
  { id: 'zh_8', lang: 'zh', category: 'polite', phrase: "祝您有美好的一天，保重。", pinyin: "Zhù nín yǒu měihǎo de yītiān, bǎozhòng.", translation: "Bonne journée et prenez soin de vous." },
  { id: 'zh_9', lang: 'zh', category: 'polite', phrase: "请问，我可以问一个问题吗？", pinyin: "Qǐngwèn, wǒ kěyǐ wèn yīgè wèntí ma?", translation: "S'il vous plaît, puis-je poser une question ?" },
  { id: 'zh_10', lang: 'zh', category: 'polite', phrase: "幸会，很高兴见到你。", pinyin: "Xìnghuì, hěn gāoxìng jiàndào nǐ.", translation: "Ravi de vous rencontrer." },
  { id: 'zh_11', lang: 'zh', category: 'polite', phrase: "请不要拘束，像在自己家一样。", pinyin: "Qǐng bùyào jūshù, xiàng zài zìjǐ jiā yīyàng.", translation: "Faites comme chez vous." },
  { id: 'zh_12', lang: 'zh', category: 'polite', phrase: "谢谢你准备的美味饭菜。", pinyin: "Xièxiè nǐ zhǔnbèi de měiwèi fàncài.", translation: "Merci pour ce délicieux repas." },
  { id: 'zh_13', lang: 'zh', category: 'polite', phrase: "祝你取得优异的成绩。", pinyin: "Zhù nǐ qǔdé yōuyì de chéngjī.", translation: "Je vous souhaite d'excellents résultats." },
  { id: 'zh_14', lang: 'zh', category: 'polite', phrase: "祝贺你取得了巨大的进步！", pinyin: "Zhùhè nǐ qǔdéle jùdà de jìnbù!", translation: "Félicitations pour vos formidables progrès !" },
  { id: 'zh_15', lang: 'zh', category: 'polite', phrase: "祝你期末考试顺利。", pinyin: "Zhù nǐ qīmò kǎoshì shùnlì.", translation: "Bonne chance pour vos examens." },

  { id: 'zh_16', lang: 'zh', category: 'vocab', phrase: "包容教育", pinyin: "Bāoróng jiàoyù", translation: "L'éducation inclusive pour tous." },
  { id: 'zh_17', lang: 'zh', category: 'vocab', phrase: "坚韧不拔", pinyin: "Jiānrènbùbá", translation: "La persévérance inébranlable." },
  { id: 'zh_18', lang: 'zh', category: 'vocab', phrase: "仁爱之心", pinyin: "Rén'ài zhī xīn", translation: "La bienveillance aimante / Loving kindness." },
  { id: 'zh_19', lang: 'zh', category: 'vocab', phrase: "社会团结", pinyin: "Shèhuì tuánjié", translation: "La solidarité sociale." },
  { id: 'zh_20', lang: 'zh', category: 'vocab', phrase: "言语治疗", pinyin: "Yányǔ zhìliáo", translation: "L'orthophonie (Speech therapy)." },
  { id: 'zh_21', lang: 'zh', category: 'vocab', phrase: "个人自主", pinyin: "Gèrén zìzhǔ", translation: "L'autonomie personnelle." },
  { id: 'zh_22', lang: 'zh', category: 'vocab', phrase: "艺术表达", pinyin: "Yìshù biǎodá", translation: "L'expression artistique." },
  { id: 'zh_23', lang: 'zh', category: 'vocab', phrase: "集体智慧", pinyin: "Jítǐ zhìhuì", translation: "L'intelligence collective." },
  { id: 'zh_24', lang: 'zh', category: 'vocab', phrase: "自信心", pinyin: "Zìxìnxīn", translation: "La confiance en soi / Self-confidence." },
  { id: 'zh_25', lang: 'zh', category: 'vocab', phrase: "寓教于乐", pinyin: "Yùjiàoyúlè", translation: "L'apprentissage ludique." },
  { id: 'zh_26', lang: 'zh', category: 'vocab', phrase: "超越自我", pinyin: "Chāoyuè zìwǒ", translation: "Le dépassement de soi." },
  { id: 'zh_27', lang: 'zh', category: 'vocab', phrase: "倾听他人", pinyin: "Qīngtīng tārén", translation: "L'écoute bienveillante." },
  { id: 'zh_28', lang: 'zh', category: 'vocab', phrase: "精细动作", pinyin: "Jīngxì dòngzuò", translation: "La motricité fine (Fine motor skills)." },
  { id: 'zh_29', lang: 'zh', category: 'vocab', phrase: "有教无类", pinyin: "Yǒujiàowúlèi", translation: "L'éducation pour tous sans distinction." },
  { id: 'zh_30', lang: 'zh', category: 'vocab', phrase: "人类多样性", pinyin: "Rénlèi duōyàngxìng", translation: "La diversité humaine." },
  { id: 'zh_31', lang: 'zh', category: 'vocab', phrase: "专注力", pinyin: "Zhuānzhùlì", translation: "La concentration mentale / Focus." },
  { id: 'zh_32', lang: 'zh', category: 'vocab', phrase: "融入社会", pinyin: "Róngrù shèhuì", translation: "L'intégration sociale." },
  { id: 'zh_33', lang: 'zh', category: 'vocab', phrase: "无限耐心", pinyin: "Wúxiàn nàixīn", translation: "La patience infinie." },
  { id: 'zh_34', lang: 'zh', category: 'vocab', phrase: "深厚友谊", pinyin: "Shēnhòu yǒuyì", translation: "Une amitié solide." },
  { id: 'zh_35', lang: 'zh', category: 'vocab', phrase: "家庭支持", pinyin: "Jiātíng zhīchí", translation: "Le soutien familial." },

  { id: 'zh_36', lang: 'zh', category: 'expression', phrase: "慢慢读，不用急。", pinyin: "Mànmàn dú, bùyòng jí.", translation: "Prenez votre temps pour lire, pas de hâte." },
  { id: 'zh_37', lang: 'zh', category: 'expression', phrase: "每一步的努力都很重要。", pinyin: "Měi yī bù de nǔlì dōu hěn zhòngyào.", translation: "Chaque petit pas d'effort compte." },
  { id: 'zh_38', lang: 'zh', category: 'expression', phrase: "我们为你今天的勇敢感到骄傲！", pinyin: "Wǒmen wèi nǐ jīntiān de yǒnggǎn gǎndào jiāo'ào!", translation: "Nous sommes fiers de ton courage aujourd'hui !" },
  { id: 'zh_39', lang: 'zh', category: 'expression', phrase: "携手共进，克服一切困难。", pinyin: "Xiéshǒu gòngjìn, kèfú yīqiè kùnnan.", translation: "Ensemble, surmontons toutes les épreuves." },
  { id: 'zh_40', lang: 'zh', category: 'expression', phrase: "仔细看字母的形状。", pinyin: "Zǐxì kàn zìmǔ de xíngzhuàng.", translation: "Regarde bien la forme des lettres." },
  { id: 'zh_41', lang: 'zh', category: 'expression', phrase: "倾听纯正的发音旋律。", pinyin: "Qīngtīng chúnzhèng de fāyīn xuánlǜ.", translation: "Écoute la mélodie d'une prononciation pure." },
  { id: 'zh_42', lang: 'zh', category: 'expression', phrase: "你今天做得太棒了！", pinyin: "Nǐ jīntiān zuò de tài bàng le!", translation: "Tu as fait un travail formidable aujourd'hui !" },
  { id: 'zh_43', lang: 'zh', category: 'expression', phrase: "深呼吸，然后慢慢吐气。", pinyin: "Shēnhūxī, ránhòu mànmàn tǔqì.", translation: "Inspire profondément, puis expire calmement." },
  { id: 'zh_44', lang: 'zh', category: 'expression', phrase: "画画让我们的心灵平静。", pinyin: "Huàhuà ràng wǒmen de xīnlíng píngjìng.", translation: "Le dessin apporte le calme à nos esprits." },
  { id: 'zh_45', lang: 'zh', category: 'expression', phrase: "音乐温暖孩子们的心灵。", pinyin: "Yīnyuè wēnnuǎn háizimen de xīnlíng.", translation: "La musique réchauffe le cœur des enfants." },
  { id: 'zh_46', lang: 'zh', category: 'expression', phrase: "让我们大声歌唱，快乐成长。", pinyin: "Ràng wǒmen dàshēng gēchàng, kuàilè chéngzhǎng.", translation: "Chantons fort et grandissons heureux." },
  { id: 'zh_47', lang: 'zh', category: 'expression', phrase: "这间教室是一个宁静的港湾。", pinyin: "Zhè jiān jiàoshì shì yīgè níngjìng de gǎngwān.", translation: "Cette classe est un havre de paix." },
  { id: 'zh_48', lang: 'zh', category: 'expression', phrase: "你的想象力是无限的力量。", pinyin: "Nǐ de xiǎngxiànglì shì wúxiàn de lìliàng.", translation: "Ton imagination est une force infinie." },
  { id: 'zh_49', lang: 'zh', category: 'expression', phrase: "书籍打开了奇迹的大门。", pinyin: "Shūjí dǎkāile qíjì de dàmén.", translation: "Les livres ouvrent la porte des merveilles." },
  { id: 'zh_50', lang: 'zh', category: 'expression', phrase: "明天会有更多明媚的笑容。", pinyin: "Míngtiān huì yǒu gèng duō míngmèi de xiàoróng.", translation: "Demain amènera des sourires encore plus radieux." }
];

export const CULTURE_PROVERBS: Proverb[] = [
  // FRENCH PROVERBS (10)
  {
    id: 'prov_fr_1',
    lang: 'fr',
    text: "Petit à petit, l'oiseau fait son nid.",
    translation: "Step by step, the bird builds its nest.",
    meaning: "La régularité et la patience mènent infailliblement à de grandes réalisations."
  },
  {
    id: 'prov_fr_2',
    lang: 'fr',
    text: "Vouloir, c'est pouvoir.",
    translation: "Where there is a will, there is a way.",
    meaning: "La force de la volonté permet de triompher des obstacles les plus impressionnants."
  },
  {
    id: 'prov_fr_3',
    lang: 'fr',
    text: "L'union fait la force.",
    translation: "Unity is strength.",
    meaning: "L'entraide et le collectif rendent les personnes solidaires invincibles."
  },
  {
    id: 'prov_fr_4',
    lang: 'fr',
    text: "Rien ne sert de courir, il faut partir à point.",
    translation: "Slow and steady wins the race.",
    meaning: "La constance et la préparation prévalent sur la hâte désordonnée."
  },
  {
    id: 'prov_fr_5',
    lang: 'fr',
    text: "Après la pluie, vient le beau temps.",
    translation: "Every cloud has a silver lining.",
    meaning: "Après chaque épreuve difficile succèdent toujours le réconfort et l'apaisement."
  },
  {
    id: 'prov_fr_6',
    lang: 'fr',
    text: "Qui cherche, trouve.",
    translation: "He who seeks, finds.",
    meaning: "En persévérant activement, on finit par concevoir d'excellentes solutions."
  },
  {
    id: 'prov_fr_7',
    lang: 'fr',
    text: "La patience est amère, mais son fruit est doux.",
    translation: "Patience is bitter, but its fruit is sweet.",
    meaning: "Les efforts endurés patiemment finissent par porter une immense récompense."
  },
  {
    id: 'prov_fr_8',
    lang: 'fr',
    text: "Mieux vaut tard que jamais.",
    translation: "Better late than never.",
    meaning: "Il est toujours louable d'accomplir une bonne action, quel que soit le retard."
  },
  {
    id: 'prov_fr_9',
    lang: 'fr',
    text: "Il n'y a pas de raccourci pour les endroits qui en valent la peine.",
    translation: "There are no shortcuts to places worth going.",
    meaning: "Les plus beaux apprentissages demandent de l'attention et du temps."
  },
  {
    id: 'prov_fr_10',
    lang: 'fr',
    text: "Tout vient à point à qui sait attendre.",
    translation: "All things come to those who wait.",
    meaning: "Savoir cultiver la patience permet de récolter de magnifiques réussites."
  },

  // ENGLISH PROVERBS (10)
  {
    id: 'prov_en_1',
    lang: 'en',
    text: "Where there's a will, there's a way.",
    translation: "Vouloir, c'est pouvoir.",
    meaning: "If you are determined to do something, you will find a way to accomplish it."
  },
  {
    id: 'prov_en_2',
    lang: 'en',
    text: "Many hands make light work.",
    translation: "L'union fait la force / Plusieurs mains rendent le travail léger.",
    meaning: "When many people collaborate, difficult tasks become easy to finish."
  },
  {
    id: 'prov_en_3',
    lang: 'en',
    text: "Every cloud has a silver lining.",
    translation: "Après la pluie, vient le beau temps.",
    meaning: "There is always something positive or comforting to be found in difficult times."
  },
  {
    id: 'prov_en_4',
    lang: 'en',
    text: "Actions speak louder than words.",
    translation: "Les actes parlent plus fort que les mots.",
    meaning: "What you actually do has a far greater impact than what you simply say."
  },
  {
    id: 'prov_en_5',
    lang: 'en',
    text: "Patience is a virtue.",
    translation: "La patience est une vertu.",
    meaning: "The ability to remain calm and persistent is a highly valuable trait."
  },
  {
    id: 'prov_en_6',
    lang: 'en',
    text: "Don't judge a book by its cover.",
    translation: "Il ne faut pas juger un livre à sa couverture.",
    meaning: "Do not form an opinion based purely on outward visual appearances."
  },
  {
    id: 'prov_en_7',
    lang: 'en',
    text: "Practice makes perfect.",
    translation: "C'est en forgeant qu'on devient forgeron.",
    meaning: "Regular training and repetition lead to absolute skill and success."
  },
  {
    id: 'prov_en_8',
    lang: 'en',
    text: "A journey of a thousand miles begins with a single step.",
    translation: "Un voyage de mille lieues commence par un seul pas.",
    meaning: "Even the grandest projects are accomplished by taking small daily efforts."
  },
  {
    id: 'prov_en_9',
    lang: 'en',
    text: "An apple a day keeps the doctor away.",
    translation: "Une pomme par jour tient le médecin éloigné.",
    meaning: "Eating healthy food and living naturally preserves physical well-being."
  },
  {
    id: 'prov_en_10',
    lang: 'en',
    text: "Knowledge is power.",
    translation: "Savoir, c'est pouvoir / La connaissance est une force.",
    meaning: "Education and knowledge equip minds with the tools to change the world."
  }
];
