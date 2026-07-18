import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, VideoOff, Mic, MicOff, Users, Share2, Copy, Check, MessageSquare, 
  Send, Hand, Sparkles, Monitor, ShieldCheck, Play, ArrowRight, X, PhoneOff, Cast, Plus
} from 'lucide-react';
import { playChime } from './AudioPlayer';

interface VirtualClassroomProps {
  lang: 'fr' | 'ar' | 'en' | 'zh';
}

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  isTeacher: boolean;
}

export default function VirtualClassroom({ lang }: VirtualClassroomProps) {
  const [role, setRole] = useState<'none' | 'teacher' | 'student'>('none');
  const [accessCode, setAccessCode] = useState<string>('');
  const [enteredCode, setEnteredCode] = useState<string>('');
  const [isLive, setIsLive] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  
  // Media states
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [micActive, setMicActive] = useState<boolean>(true);
  const [screenShareActive, setScreenShareActive] = useState<boolean>(false);
  
  // Whiteboard drawing states
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#0B722C');
  const [lineWidth, setLineWidth] = useState<number>(3);
  
  // Real camera stream reference
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Simulated classroom interactions
  const [students, setStudents] = useState<Array<{ name: string; active: boolean; handRaised: boolean }>>([
    { name: 'Sami Filali', active: true, handRaised: false },
    { name: 'Kenza Alaoui', active: true, handRaised: true },
    { name: 'Youssef Bennani', active: true, handRaised: false },
    { name: 'Lina Mansouri', active: false, handRaised: false },
    { name: 'Mehdi Amrani', active: true, handRaised: false }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'Sami Filali', text: 'Bonjour Monsieur, l\'image est très claire !', time: '10:02', isTeacher: false },
    { id: '2', sender: 'Enseignant AMTDA', text: 'Bonjour les enfants, préparez votre ardoise.', time: '10:03', isTeacher: true },
    { id: '3', sender: 'Kenza Alaoui', text: 'Est-ce qu\'on va dessiner les lettres ?', time: '10:04', isTeacher: false }
  ]);
  const [newMessage, setNewMessage] = useState<string>('');

  // Translations
  const t = {
    fr: {
      title: "Classe Virtuelle Inclusive 🎥",
      subtitle: "Dispensez des cours à distance en temps réel avec vidéo, audio et partage d'accès.",
      startClass: "Démarrer une Classe (Enseignant)",
      joinClass: "Rejoindre une Classe (Élève)",
      accessCodeLabel: "Code de session unique",
      enterCodePlace: "Ex: AMTDA-2026",
      joinBtn: "Rejoindre la classe ➔",
      startBtn: "Lancer la diffusion LIVE 🎬",
      camera: "Caméra",
      mic: "Micro",
      screen: "Partage d'écran",
      liveStatus: "EN DIRECT",
      stopClass: "Quitter la session",
      whiteboard: "Tableau Blanc de l'École 📝",
      whiteboardDesc: "Dessinez des lettres ou écrivez des mots en direct pour les élèves.",
      chatTitle: "Discussion en Direct 💬",
      chatPlace: "Écrire un message pour la classe...",
      sendBtn: "Envoyer",
      studentsTitle: "Élèves connectés ({count})",
      copyCode: "Copier le code d'accès",
      handRaised: "a levé la main !",
      setupCamera: "Activer la vraie caméra",
      accessGranted: "Accès autorisé"
    },
    ar: {
      title: "القسم الافتراضي الدامج 🎥",
      subtitle: "تقديم دروس عن بعد في الوقت الفعلي مع الفيديو والصوت ومشاركة رمز الدخول.",
      startClass: "بدء حصة دراسية (أستاذ)",
      joinClass: "الانضمام إلى حصة (تلميذ)",
      accessCodeLabel: "رمز الحصة الفريد",
      enterCodePlace: "مثال: AMTDA-2026",
      joinBtn: "انضمام للقسم ➔",
      startBtn: "إطلاق البث المباشر 🎬",
      camera: "الكاميرا",
      mic: "الميكروفون",
      screen: "مشاركة الشاشة",
      liveStatus: "مباشر الآن",
      stopClass: "مغادرة الحصة",
      whiteboard: "السبورة المدرسية التفاعلية 📝",
      whiteboardDesc: "اكتب الحروف أو الكلمات مباشرة أمام التلاميذ.",
      chatTitle: "المحادثة المباشرة 💬",
      chatPlace: "اكتب رسالة للقسم...",
      sendBtn: "إرسال",
      studentsTitle: "التلاميذ المتصلون ({count})",
      copyCode: "نسخ رمز الدخول",
      handRaised: "رفع يده !",
      setupCamera: "تشغيل الكاميرا الحقيقية",
      accessGranted: "تم السماح بالولوج"
    },
    en: {
      title: "Inclusive Virtual Classroom 🎥",
      subtitle: "Teach remote students in real-time with live video, audio, and secure session codes.",
      startClass: "Host a Class (Teacher)",
      joinClass: "Join a Class (Student)",
      accessCodeLabel: "Unique Session Code",
      enterCodePlace: "E.g., AMTDA-2026",
      joinBtn: "Join Classroom ➔",
      startBtn: "Launch Live Stream 🎬",
      camera: "Camera",
      mic: "Microphone",
      screen: "Screen Share",
      liveStatus: "LIVE",
      stopClass: "Leave Session",
      whiteboard: "Interactive School Board 📝",
      whiteboardDesc: "Draw letters or write words in real-time for your students.",
      chatTitle: "Live Class Chat 💬",
      chatPlace: "Write a message to the class...",
      sendBtn: "Send",
      studentsTitle: "Connected Students ({count})",
      copyCode: "Copy Access Code",
      handRaised: "raised hand!",
      setupCamera: "Activate Real Web Camera",
      accessGranted: "Access Granted"
    },
    zh: {
      title: "包容性虚拟课堂 🎥",
      subtitle: "通过实时视频、语音和共享访问码为远程学生授课。",
      startClass: "启动课程 (教师)",
      joinClass: "加入课程 (学生)",
      accessCodeLabel: "专属课堂代码",
      enterCodePlace: "例如: AMTDA-2026",
      joinBtn: "加入课堂 ➔",
      startBtn: "启动直播 🎬",
      camera: "摄像头",
      mic: "麦克风",
      screen: "共享屏幕",
      liveStatus: "直播中",
      stopClass: "退出课堂",
      whiteboard: "互动教学板 📝",
      whiteboardDesc: "实时绘制字母或书写文字供学生观看。",
      chatTitle: "课堂实时群聊 💬",
      chatPlace: "向课堂发送消息...",
      sendBtn: "发送",
      studentsTitle: "已连接学生 ({count})",
      copyCode: "复制课堂代码",
      handRaised: "举手了！",
      setupCamera: "开启真实摄像头",
      accessGranted: "已授权访问"
    }
  };

  const currentT = t[lang] || t.fr;

  // Generate random access code on host creation
  const handleHostInit = () => {
    playChime('success');
    const randomCode = 'AMTDA-' + Math.floor(1000 + Math.random() * 9000);
    setAccessCode(randomCode);
    setRole('teacher');
    setIsLive(true);
  };

  const handleStudentJoin = () => {
    if (!enteredCode.trim()) {
      alert("Veuillez saisir un code d'accès / الرجاء إدخال رمز الولوج !");
      return;
    }
    playChime('success');
    setAccessCode(enteredCode.toUpperCase());
    setRole('student');
    setIsLive(true);
  };

  // Stop real media camera stream
  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Turn on/off real user camera with browser permissions
  const toggleCamera = async () => {
    playChime('click');
    if (cameraActive) {
      stopCameraStream();
    } else {
      try {
        const constraints = { video: { width: 640, height: 480 }, audio: false };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraActive(true);
      } catch (err) {
        console.warn("Real camera access denied or unavailable. Fallback to rich educational avatar animation.", err);
        setCameraActive(true); // Fallback mode
      }
    }
  };

  // Cleanup stream on component unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Sync canvas with videoRef when fallback
  useEffect(() => {
    if (isLive && role === 'teacher' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw initial welcome message
        ctx.fillStyle = '#92C83E';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText("TABLEAU BLANC AMTDA", canvas.width / 2, 40);
        ctx.fillStyle = '#94A3B8';
        ctx.font = '12px sans-serif';
        ctx.fillText("Écrivez ou dessinez ici avec votre souris", canvas.width / 2, 70);
      }
    }
  }, [isLive, role]);

  // Handle access code clipboard copy
  const copyToClipboard = () => {
    playChime('click');
    navigator.clipboard.writeText(accessCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    playChime('hover');
    const msg: Message = {
      id: Date.now().toString(),
      sender: role === 'teacher' ? 'Enseignant AMTDA' : 'Vous (Élève)',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isTeacher: role === 'teacher'
    };

    setMessages([...messages, msg]);
    setNewMessage('');

    // Simulate quick automated supportive answer from students if teacher sent something
    if (role === 'teacher') {
      setTimeout(() => {
        const studentResponses = [
          "D'accord, je comprends !",
          "C'est compris !",
          "J'ai terminé l'exercice !",
          "Super !"
        ];
        const randomStudent = students[Math.floor(Math.random() * students.length)].name;
        const autoMsg: Message = {
          id: Date.now().toString() + '-auto',
          sender: randomStudent,
          text: studentResponses[Math.floor(Math.random() * studentResponses.length)],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isTeacher: false
        };
        setMessages(prev => [...prev, autoMsg]);
        playChime('success');
      }, 2500);
    }
  };

  // Toggle student hand raise (simulation)
  const toggleStudentHand = (index: number) => {
    playChime('click');
    const updated = [...students];
    updated[index].handRaised = !updated[index].handRaised;
    setStudents(updated);
  };

  // Drawing functions on blackboard
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    playChime('click');
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="bg-emerald-50/40 rounded-3xl border border-emerald-100 p-6 shadow-xl relative" id="virtual-classroom-module">
      
      {/* Dynamic Animated Indicator */}
      {isLive && (
        <div className="absolute top-6 right-6 flex items-center gap-2 bg-rose-500 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider animate-pulse uppercase">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          {currentT.liveStatus}
        </div>
      )}

      {/* Main Header */}
      <div className="mb-6 text-left">
        <h3 className="text-xl font-bold text-[#0B722C] font-sans tracking-tight flex items-center gap-2">
          <Video className="w-6 h-6 text-[#92C83E]" />
          {currentT.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          {currentT.subtitle}
        </p>
      </div>

      {/* SETUP PHASE / ROLE SELECTION */}
      {!isLive && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto py-8">
          
          {/* TEACHER BOX */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-[#92C83E]/15 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-[#0B722C]" />
              </div>
              <h4 className="font-bold text-slate-800 text-base">{currentT.startClass}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Créez une classe instantanée sécurisée. Activez votre caméra, utilisez le tableau noir éducatif et partagez le code aux enfants.
              </p>
            </div>
            
            <button
              onClick={handleHostInit}
              className="mt-6 w-full py-3 bg-[#0B722C] hover:bg-emerald-700 text-white font-bold text-xs rounded-xl tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> {currentT.startBtn}
            </button>
          </div>

          {/* STUDENT BOX */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-slate-800 text-base">{currentT.joinClass}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Insérez le code d'accès partagé par votre professeur ou orthophoniste pour assister à la classe en temps réel.
              </p>

              <div className="space-y-1 text-left max-w-xs mx-auto">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{currentT.accessCodeLabel}</label>
                <input
                  type="text"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                  placeholder={currentT.enterCodePlace}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-center font-mono font-bold focus:outline-none focus:border-blue-500 text-slate-800 uppercase"
                />
              </div>
            </div>

            <button
              onClick={handleStudentJoin}
              className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" /> {currentT.joinBtn}
            </button>
          </div>

        </div>
      )}

      {/* LIVE INTERACTIVE STREAM SCREEN */}
      {isLive && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT 2 COLS: STREAM VIDEO & WHITEBOARD */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* LIVE FEED CONTAINER */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden aspect-video shadow-inner">
              
              {/* Real Camera Video Tag */}
              {cameraActive ? (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover transform -scale-x-100"
                  playsInline
                  muted
                />
              ) : (
                /* Fallback Educational Animation */
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-slate-950 to-slate-900">
                  <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#92C83E] animate-spin" />
                    <div className="w-14 h-14 rounded-full bg-[#0B722C] flex items-center justify-center text-white font-bold text-lg">
                      {role === 'teacher' ? 'Prof' : 'AMTDA'}
                    </div>
                  </div>
                  
                  <h4 className="text-white text-sm font-bold">
                    {role === 'teacher' ? "Flux vidéo de l'Enseignant AMTDA" : "En attente du flux de la classe..."}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mt-1">
                    {role === 'teacher' 
                      ? "La diffusion est active. Cliquez ci-dessous pour connecter votre vraie caméra."
                      : "La liaison en temps réel est prête. Soyez attentif et écoutez attentivement."}
                  </p>
                </div>
              )}

              {/* Status and overlay tools */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                <div className="flex gap-2">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/10">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {currentT.accessGranted}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                    🔑 {accessCode}
                  </span>
                </div>

                {role === 'teacher' && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={toggleCamera}
                      className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                        cameraActive ? 'bg-[#0B722C] text-white hover:bg-emerald-600' : 'bg-rose-500/80 text-white hover:bg-rose-600'
                      }`}
                      title={currentT.setupCamera}
                    >
                      {cameraActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => { playChime('click'); setMicActive(!micActive); }}
                      className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                        micActive ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-rose-500/80 text-white hover:bg-rose-600'
                      }`}
                    >
                      {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* INTERACTIVE WHITEBOARD */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Monitor className="w-4 h-4 text-[#0B722C]" />
                    {currentT.whiteboard}
                  </h4>
                  <p className="text-[10px] text-slate-400">{currentT.whiteboardDesc}</p>
                </div>

                {/* Color & tools picker */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {['#0B722C', '#F58220', '#133C8B', '#E11D48'].map((c) => (
                      <button
                        key={c}
                        onClick={() => { playChime('hover'); setColor(c); }}
                        className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                          color === c ? 'scale-125 border-slate-900 shadow-xs' : 'border-slate-200'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>

                  <select
                    value={lineWidth}
                    onChange={(e) => setLineWidth(Number(e.target.value))}
                    className="bg-slate-50 border border-slate-200 text-[10px] font-bold px-1.5 py-0.5 rounded-md text-slate-700 outline-none"
                  >
                    <option value={2}>Fin</option>
                    <option value={4}>Moyen</option>
                    <option value={8}>Épais</option>
                  </select>

                  <button
                    onClick={clearCanvas}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                  >
                    Effacer
                  </button>
                </div>
              </div>

              {/* DRAWING CANVAS */}
              <div className="border border-slate-100 rounded-xl overflow-hidden bg-slate-950">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={250}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="w-full h-[200px] cursor-crosshair"
                />
              </div>
            </div>

          </div>

          {/* RIGHT COL: STUDENTS & CHAT */}
          <div className="space-y-6">
            
            {/* SESSION ACCESS CODE BOX */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Session active</h4>
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200/50 p-2.5 rounded-xl">
                <span className="font-mono text-base font-black text-slate-800 tracking-wide">{accessCode}</span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 bg-[#0B722C]/10 hover:bg-[#0B722C]/20 text-[#0B722C] font-bold text-[10px] px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copié !" : "Copier"}
                </button>
              </div>
            </div>

            {/* CHAT PANEL */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col justify-between h-[300px]">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-[#0B722C]" />
                  {currentT.chatTitle}
                </h4>
                <span className="text-[9px] bg-[#92C83E]/20 text-[#0B722C] px-1.5 py-0.5 rounded-md font-bold">Classe</span>
              </div>

              {/* Message scroll list */}
              <div className="flex-1 overflow-y-auto py-2 space-y-2 text-left my-2 scrollbar-thin scrollbar-thumb-slate-200">
                {messages.map((m) => (
                  <div key={m.id} className="text-xs">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className={`font-bold ${m.isTeacher ? 'text-[#0B722C]' : 'text-slate-500'}`}>{m.sender}</span>
                      <span className="text-slate-400 text-[9px]">{m.time}</span>
                    </div>
                    <p className={`mt-0.5 px-2.5 py-1.5 rounded-xl inline-block max-w-[90%] ${
                      m.isTeacher ? 'bg-[#92C83E]/15 text-slate-800 rounded-tl-xs' : 'bg-slate-100 text-slate-800 rounded-tr-xs'
                    }`}>
                      {m.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* New message form */}
              <form onSubmit={handleSendMessage} className="flex gap-1.5 pt-2 border-t border-slate-100">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={currentT.chatPlace}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-[#0B722C]"
                />
                <button
                  type="submit"
                  className="bg-[#0B722C] hover:bg-emerald-600 text-white p-2 rounded-xl transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* STUDENTS LIST PANEL */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3 h-[200px] flex flex-col">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-sky-600" />
                {currentT.studentsTitle.replace('{count}', String(students.length))}
              </h4>

              <div className="flex-1 overflow-y-auto space-y-1.5 text-left scrollbar-thin">
                {students.map((student, idx) => (
                  <div key={student.name} className="flex justify-between items-center bg-slate-50 p-2 rounded-xl border border-slate-200/20 text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${student.active ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span className="font-semibold text-slate-700">{student.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {student.handRaised && (
                        <span className="text-[10px] text-amber-600 font-bold flex items-center gap-0.5 animate-bounce">
                          🖐️
                        </span>
                      )}
                      
                      <button
                        onClick={() => toggleStudentHand(idx)}
                        className={`p-1 rounded-md transition-all cursor-pointer ${
                          student.handRaised ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-400 hover:text-amber-500'
                        }`}
                        title="Demande de parole"
                      >
                        <Hand className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EXIT SESSION BUTTON */}
            <button
              onClick={() => { playChime('click'); stopCameraStream(); setRole('none'); setIsLive(false); }}
              className="w-full py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <PhoneOff className="w-4 h-4" /> {currentT.stopClass}
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
