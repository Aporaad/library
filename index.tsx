
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { 
  Book, Search, Moon, Sun, Bookmark, Download, Star, ChevronLeft, ChevronRight, 
  Menu, X, LayoutGrid, Library, User, Settings, Bot, Loader2, Clock, ArrowRight, 
  Eye, FileText, MessageSquare, Share2, LogIn, UserPlus, Heart, Trash2, Send, 
  Sparkles, TrendingUp, AlertTriangle, CheckCircle, Type, Plus, Github, Globe, 
  BarChart3, PieChart, ShoppingCart, Copy, Mail, Info, CreditCard, ShieldCheck, 
  Lock, Unlock, AlignLeft, Palette, List, BookmarkPlus, BookmarkCheck, KeyRound, MailIcon, Fingerprint, ExternalLink, CreditCard as CardIcon,
  Twitter, Linkedin, Instagram, Quote
} from 'lucide-react';

// --- Types ---
interface Author {
  id: string;
  name: string;
  bio: string;
  image: string;
  contact: string;
  social: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

interface BookType {
  id: string;
  title: string;
  author: string;
  authorId: string;
  category: string;
  rating: number;
  image: string;
  description: string;
  content: string; 
  year: string;
  pages: number;
  publisher: string;
  price: number;
}

// --- Authors Data ---
const AUTHORS: Author[] = [
  { 
    id: 'a1', 
    name: 'ابن خلدون', 
    bio: 'عبد الرحمن بن محمد، ابن خلدون أبو زيد، ولي الدين الحضرمي الإشبيلي (1332 - 1406م). مؤرخ تونسي المولد أندلسي الأصل، يعتبر مؤسس علم الاجتماع وأحد أعظم الفلاسفة في التاريخ.', 
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400', 
    contact: 'heritage@archives.gov', 
    social: { twitter: '@khaldun_legacy', linkedin: 'ibn-khaldun-heritage' } 
  },
  { 
    id: 'a2', 
    name: 'طه حسين', 
    bio: 'أديب وناقد مصري، لُقّب بعميد الأدب العربي. يعتبر من أبرز الشخصيات في الحركة العربية الأدبية الحديثة، غيّر وجه الأدب والتعليم في مصر.', 
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400', 
    contact: 'taha.hussein@literature.eg', 
    social: { twitter: '@dean_of_arabic', instagram: 'taha_hussein_official' } 
  },
  { 
    id: 'a3', 
    name: 'عباس محمود العقاد', 
    bio: 'أديب ومفكر وشاعر مصري، وعضو سابق في مجلس النواب وعضو في مجمع اللغة العربية.', 
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400', 
    contact: 'akkad@literary.org', 
    social: { twitter: '@akkad_thoughts', linkedin: 'akkad-legacy' } 
  },
  { 
    id: 'a4', 
    name: 'باولو كويلو', 
    bio: 'روائي وقاص برازيلي. يتميز برواياته التي تستخدم الرمزية لمعالجة قضايا الروح والبحث عن الذات.', 
    image: 'https://images.unsplash.com/photo-1506784919141-177b7ec29a6a?q=80&w=400', 
    contact: 'media@paulocoelho.com', 
    social: { twitter: '@paulocoelho', instagram: 'paulocoelho' } 
  },
  { 
    id: 'a5', 
    name: 'جمال عبد الناصر', 
    bio: 'ثاني رؤساء مصر، قاد ثورة 23 يوليو 1952. كان له تأثير عالمي كبير كرمز للقومية العربية والتحرر من الاستعمار.', 
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=400', 
    contact: 'nasser.archive@culture.gov.eg', 
    social: { twitter: '@nasser_legacy' } 
  },
];

const CATEGORIES = ['تاريخ', 'سياسة', 'رواية', 'سير وتراجم', 'أدب', 'تكنولوجيا', 'علوم', 'علم نفس', 'تنمية بشرية', 'اقتصاد'];

// --- Books Generator ---
const generateBooks = (count: number): BookType[] => {
  const books: BookType[] = [];
  const genericContent = "هذا نص تجريبي يحاكي محتوى الكتاب الحقيقي. في هذا الفصل، نستعرض الأفكار الجوهرية التي شكلت وعي المجتمع في تلك الحقبة الزمنية، مع التركيز على دور الفلسفة والعلوم في نهضة الأمم. إن القراءة الواعية تتطلب جهداً ذهنياً يتجاوز مجرد سرد الأحداث إلى فهم مسبباتها، وهو ما نحاول استقصاؤه في هذه المجلدات. يتميز هذا العمل بأسلوب سردي يجمع بين الدقة التاريخية والجمالية الأدبية، مما يجعله مرجعاً للباحثين والقراء على حد سواء.";

  for (let i = 1; i <= count; i++) {
    const authorObj = AUTHORS[i % AUTHORS.length];
    const category = CATEGORIES[i % CATEGORIES.length];
    books.push({
      id: i.toString(),
      title: i <= 5 ? ['مقدمة ابن خلدون', 'فلسفة الثورة', 'الخيميائي', 'العبقريات', 'في الشعر الجاهلي'][i - 1] : `المعرفة الرقمية - المجلد ${i}`,
      author: authorObj.name,
      authorId: authorObj.id,
      category: category,
      rating: parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
      image: `https://picsum.photos/seed/${i + 100}/400/600`,
      description: `دراسة بحثية مفصلة في ${category} تتناول تحولات المفاهيم عبر الزمن بأسلوب شيق ومبسط. هذا العمل يعتبر مرجعاً أساسياً للمهتمين بهذا المجال ويقدم رؤية نقدية للمفاهيم التقليدية.`,
      content: genericContent,
      year: Math.floor(Math.random() * (2024 - 1950) + 1950).toString(),
      pages: Math.floor(Math.random() * (600 - 100) + 100),
      publisher: 'دار أرسلان للنشر الرقمي',
      price: i <= 5 ? 75.00 : 49.99
    });
  }
  return books;
};

const INITIAL_BOOKS = generateBooks(100);

// --- Global UI Components ---

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children?: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl relative border border-slate-200 dark:border-slate-800 flex flex-col">
        <button onClick={onClose} className="absolute top-6 left-6 p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500 transition-all z-[110] shadow-md active:scale-90">
          <X size={24} />
        </button>
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">{children}</div>
      </div>
    </div>
  );
};

// --- Auth Modal ---
const AuthModal = ({ isOpen, onClose, onAuth }: { isOpen: boolean, onClose: () => void, onAuth: (user: any) => void }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onAuth({ name: form.name || 'أرسلان الشماري', email: form.email, avatar: '👤' });
      setLoading(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[3.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
        <button onClick={onClose} className="absolute top-8 left-8 text-slate-400 hover:text-red-500 transition-colors">
          <X size={28} />
        </button>

        <div className="p-12 pt-16">
          <div className="flex flex-col items-center mb-12">
            <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white mb-6 shadow-2xl rotate-12">
              <Fingerprint size={40} />
            </div>
            <h2 className="text-4xl font-black mb-2">{mode === 'login' ? 'مرحباً بعودتك' : 'انضم إلينا'}</h2>
            <p className="text-slate-400 font-bold text-lg">بوابة المعرفة الرقمية في انتظارك</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div className="relative">
                <User className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" placeholder="الاسم الكامل" required
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-600 rounded-[1.5rem] py-5 pr-14 pl-6 outline-none transition-all font-bold"
                  value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                />
              </div>
            )}
            <div className="relative">
              <MailIcon className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" placeholder="البريد الإلكتروني" required
                className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-600 rounded-[1.5rem] py-5 pr-14 pl-6 outline-none transition-all font-bold"
                value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              />
            </div>
            <div className="relative">
              <KeyRound className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" placeholder="كلمة المرور" required
                className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-600 rounded-[1.5rem] py-5 pr-14 pl-6 outline-none transition-all font-bold"
                value={form.password} onChange={e => setForm({...form, password: e.target.value})}
              />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-6 rounded-[1.5rem] font-black text-xl shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" /> : (mode === 'login' ? 'دخول' : 'إنشاء حساب')}
            </button>
          </form>

          <div className="mt-10 text-center">
            <button 
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-slate-500 font-bold hover:text-indigo-600 transition-colors"
            >
              {mode === 'login' ? 'لا تملك حساباً؟ انضم الآن' : 'تملك حساباً بالفعل؟ سجل دخولك'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [activeTab, setActiveTab] = useState<'explore' | 'library' | 'favorites' | 'dashboard' | 'authors' | 'settings'>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [myLibrary, setMyLibrary] = useState<string[]>([]);
  const [purchasedBooks, setPurchasedBooks] = useState<string[]>([]);
  const [readingProgress, setReadingProgress] = useState<Record<string, number>>({});
  const [readerPage, setReaderPage] = useState(1);
  const [isPurchasing, setIsPurchasing] = useState(false);
  
  // Reader Theme Customization
  const [readerFontSize, setReaderFontSize] = useState(20);
  const [readerTheme, setReaderTheme] = useState<'light' | 'dark' | 'sepia'>('light');
  const [readerFontFamily, setReaderFontFamily] = useState<'sans' | 'serif' | 'mono'>('sans');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const saved = localStorage.getItem('library_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      setReadingProgress(parsed.progress || {});
      setPurchasedBooks(parsed.purchased || []);
      setMyLibrary(parsed.library || []);
      setFavorites(parsed.favorites || []);
    }
    const savedUser = localStorage.getItem('user_session');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem('library_state', JSON.stringify({
      progress: readingProgress,
      purchased: purchasedBooks,
      library: myLibrary,
      favorites: favorites
    }));
  }, [readingProgress, purchasedBooks, myLibrary, favorites]);

  const handleAuth = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user_session', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
  };

  const handleBuyFeature = (book: BookType) => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    setIsPurchasing(true);
    setTimeout(() => {
      setPurchasedBooks(prev => [...prev, book.id]);
      setIsPurchasing(false);
      alert(`تم تفعيل ميزات "التحميل والاقتباس" لكتاب "${book.title}" بنجاح!`);
    }, 2000);
  };

  const handleDownload = (book: BookType) => {
    if (!purchasedBooks.includes(book.id)) {
      alert("عذراً، ميزة التحميل متاحة فقط للمشتركين. يرجى تفعيل الميزات الإضافية أولاً.");
      return;
    }
    alert(`بدأ تحميل نسخة PDF من كتاب: ${book.title}...`);
  };

  const handleCitation = (book: BookType) => {
    if (!purchasedBooks.includes(book.id)) {
      alert("عذراً، ميزة الاقتباس متاحة فقط للمشتركين.");
      return;
    }
    const citation = `"${book.title}" بقلم ${book.author}، من منشورات ${book.publisher}، ${book.year}.`;
    navigator.clipboard.writeText(citation);
    alert("تم نسخ الاقتباس إلى الحافظة!");
  };

  const filteredBooks = useMemo(() => {
    return INITIAL_BOOKS.filter(book => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        book.title.toLowerCase().includes(q) || 
        book.author.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'الكل' || book.category === selectedCategory;
      if (activeTab === 'library') return myLibrary.includes(book.id) && matchesSearch && matchesCategory;
      if (activeTab === 'favorites') return favorites.includes(book.id) && matchesSearch && matchesCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, activeTab, myLibrary, favorites]);

  const toggleLibrary = (bookId: string) => {
    setMyLibrary(prev => 
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  const toggleFavorite = (bookId: string) => {
    setFavorites(prev => 
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  const getProgress = (id: string) => readingProgress[id] || 0;

  const currentAuthor = useMemo(() => {
    if (!selectedBook) return null;
    return AUTHORS.find(a => a.id === selectedBook.authorId);
  }, [selectedBook]);

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-['IBM_Plex_Sans_Arabic']">
      
      {/* Sidebar */}
      <aside className="w-20 lg:w-72 glass border-l border-slate-100 dark:border-slate-900 flex flex-col py-10 transition-all z-50">
        <div className="flex items-center justify-center lg:justify-start lg:px-8 gap-4 mb-16">
          <div className="p-3 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl shadow-xl">
            <Library size={24} />
          </div>
          <span className="hidden lg:block text-xl font-black">مكتبتي الرقمية</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'explore', icon: LayoutGrid, label: 'الاكتشاف' },
            { id: 'library', icon: Book, label: 'مكتبتي' },
            { id: 'favorites', icon: Heart, label: 'المفضلة' },
            { id: 'dashboard', icon: BarChart3, label: 'الإحصائيات' },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`w-full flex items-center gap-5 p-4 rounded-2xl transition-all relative group ${activeTab === tab.id ? 'bg-slate-100 dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm' : 'hover:bg-slate-50 dark:hover:bg-slate-900/40 text-slate-400'}`}>
              <tab.icon size={20} />
              <span className="hidden lg:block font-bold text-base">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-6 space-y-4">
          <button onClick={() => setDarkMode(!darkMode)} className="w-full flex items-center gap-5 p-4 rounded-2xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span className="hidden lg:block font-bold">{darkMode ? 'نهاري' : 'ليلي'}</span>
          </button>
          {user ? (
            <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-black text-lg">{user.name.charAt(0)}</div>
              <div className="hidden lg:block flex-1 overflow-hidden">
                <p className="font-bold text-sm truncate">{user.name}</p>
                <button onClick={handleLogout} className="text-[10px] text-red-500 font-bold uppercase hover:underline">خروج</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowAuth(true)} className="w-full flex items-center gap-5 p-4 rounded-2xl bg-slate-900 dark:bg-indigo-600 text-white font-black shadow-lg hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all">
              <LogIn size={20} /><span className="hidden lg:block">تسجيل الدخول</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="sticky top-0 z-40 w-full px-10 py-6 glass border-b border-slate-100 dark:border-slate-900 flex items-center justify-between">
          <div className="flex-1 max-w-2xl relative">
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input 
              type="text" placeholder="ماذا تود أن تقرأ اليوم؟"
              className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl py-4 pr-14 pl-6 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium text-base"
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 mr-6">
            <Sparkles className="text-amber-500 animate-pulse" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          {(activeTab === 'explore' || activeTab === 'library' || activeTab === 'favorites') && (
            <>
              <div className="flex items-center gap-3 overflow-x-auto pb-8 no-scrollbar">
                {['الكل', ...CATEGORIES].map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all border ${selectedCategory === cat ? 'bg-slate-900 dark:bg-indigo-600 text-white border-transparent' : 'bg-transparent text-slate-400 border-slate-200 dark:border-slate-800 hover:border-indigo-600 hover:text-indigo-600'}`}>
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {filteredBooks.map(book => {
                  const isInLibrary = myLibrary.includes(book.id);
                  const isFav = favorites.includes(book.id);
                  return (
                    <div key={book.id} onClick={() => setSelectedBook(book)} className="group flex flex-col cursor-pointer transition-all duration-300">
                      <div className="relative aspect-[4/5] bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 mb-4 transition-transform group-hover:-translate-y-1">
                        <img src={book.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={book.title} />
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={(e) => { e.stopPropagation(); toggleFavorite(book.id); }} className={`p-2 rounded-lg backdrop-blur-md border border-white/20 transition-all ${isFav ? 'bg-red-500 text-white' : 'bg-white/80 text-slate-600 hover:bg-white'}`}>
                            <Heart size={16} fill={isFav ? "currentColor" : "none"} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                           <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wide">{book.category}</span>
                           <div className="flex items-center gap-0.5 text-amber-500 text-[10px] font-black"><Star size={10} fill="currentColor" /> {book.rating}</div>
                        </div>
                        <h3 className="font-bold text-base line-clamp-1 leading-snug group-hover:text-indigo-600 transition-colors">{book.title}</h3>
                        <p className="text-slate-400 text-xs font-medium">{book.author}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Book Detail Modal */}
      <Modal isOpen={!!selectedBook && !isReading} onClose={() => { setSelectedBook(null); setAiSummary(null); }}>
        {selectedBook && (
          <div className="flex flex-col lg:flex-row h-full">
            <div className="lg:w-[40%] bg-slate-50 dark:bg-slate-800/20 p-12 lg:p-16 flex flex-col items-center border-l border-slate-100 dark:border-slate-800 text-center sticky top-0 h-full overflow-y-auto custom-scrollbar">
              <div className="relative group mb-10">
                <img src={selectedBook.image} className="w-56 h-72 object-cover rounded-3xl shadow-2xl border-4 border-white dark:border-slate-700" alt="" />
                {purchasedBooks.includes(selectedBook.id) && (
                   <div className="absolute -top-3 -right-3 p-3 bg-emerald-500 text-white rounded-2xl shadow-xl animate-bounce">
                      <ShieldCheck size={20} />
                   </div>
                )}
              </div>
              
              <h2 className="text-3xl font-black mb-2 leading-tight">{selectedBook.title}</h2>
              <p className="text-indigo-600 dark:text-indigo-400 text-xl mb-12 font-bold">{selectedBook.author}</p>
              
              <div className="w-full space-y-4 mb-10">
                <button 
                  onClick={() => setIsReading(true)} 
                  className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <Eye size={24} /> اقرأ مجاناً
                </button>
                
                {!purchasedBooks.includes(selectedBook.id) && (
                  <button 
                    onClick={() => handleBuyFeature(selectedBook)} 
                    disabled={isPurchasing}
                    className="w-full py-5 bg-slate-900 dark:bg-slate-700 text-white rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
                  >
                    {isPurchasing ? <Loader2 className="animate-spin" /> : <><Unlock size={22} /> تفعيل التحميل والاقتباس ({selectedBook.price} ر.س)</>}
                  </button>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => handleDownload(selectedBook)} className={`flex items-center justify-center gap-2 py-4 rounded-2xl border font-bold text-sm transition-all ${purchasedBooks.includes(selectedBook.id) ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 text-emerald-600' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-400 opacity-60'}`}>
                    <Download size={18}/> تحميل PDF
                  </button>
                  <button onClick={() => handleCitation(selectedBook)} className={`flex items-center justify-center gap-2 py-4 rounded-2xl border font-bold text-sm transition-all ${purchasedBooks.includes(selectedBook.id) ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 text-indigo-600' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-400 opacity-60'}`}>
                    <Quote size={18} /> اقتباس
                  </button>
                </div>
              </div>

              {/* Author Info Section */}
              {currentAuthor && (
                <div className="w-full text-right bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
                  <div className="flex items-center gap-4 border-b border-slate-50 dark:border-slate-800 pb-4">
                    <img src={currentAuthor.image} className="w-16 h-16 rounded-2xl object-cover shadow-md" alt={currentAuthor.name} />
                    <div>
                       <h4 className="font-black text-lg">عن المؤلف</h4>
                       <p className="text-slate-400 text-xs font-bold">{currentAuthor.name}</p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm font-medium leading-loose text-justify line-clamp-4">{currentAuthor.bio}</p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                      {currentAuthor.social.twitter && <button className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"><Twitter size={16}/></button>}
                      {currentAuthor.social.linkedin && <button className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"><Linkedin size={16}/></button>}
                      {currentAuthor.social.instagram && <button className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"><Instagram size={16}/></button>}
                    </div>
                    <button onClick={() => alert(`تواصل مع المؤلف عبر: ${currentAuthor.contact}`)} className="text-xs font-black text-indigo-600 hover:underline">تواصل الآن</button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-1 p-12 lg:p-20 space-y-16 bg-white dark:bg-slate-900 overflow-y-auto">
              <section className="space-y-6">
                <h4 className="text-2xl font-black">نبذة عن الكتاب</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-[2] text-lg font-medium text-justify">
                  {selectedBook.description} يغوص هذا الكتاب في تفاصيل دقيقة حول {selectedBook.category}، مستعرضاً السياق التاريخي والفكري الذي نشأ فيه هذا العمل.
                </p>
              </section>

              {/* Theme Customization Preview */}
              <section className="bg-slate-50 dark:bg-slate-950/40 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                <h4 className="flex items-center gap-3 font-black text-xl mb-8">
                  <Palette size={20} className="text-indigo-600"/> تخصيص تجربة القراءة
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-sm font-bold text-slate-400 uppercase">ثيم الواجهة</p>
                    <div className="flex gap-4">
                      <button onClick={() => setReaderTheme('light')} className={`flex-1 p-4 rounded-2xl border-2 transition-all ${readerTheme === 'light' ? 'border-indigo-600 bg-white' : 'border-slate-200 bg-white'}`}><Sun size={20} className="mx-auto text-slate-400"/></button>
                      <button onClick={() => setReaderTheme('sepia')} className={`flex-1 p-4 rounded-2xl border-2 transition-all ${readerTheme === 'sepia' ? 'border-indigo-600 bg-[#f4ecd8]' : 'border-slate-200 bg-[#f4ecd8]'}`}><div className="w-5 h-5 mx-auto bg-amber-600 rounded-full"/></button>
                      <button onClick={() => setReaderTheme('dark')} className={`flex-1 p-4 rounded-2xl border-2 transition-all ${readerTheme === 'dark' ? 'border-indigo-600 bg-slate-900' : 'border-slate-200 bg-slate-900'}`}><Moon size={20} className="mx-auto text-slate-100"/></button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm font-bold text-slate-400 uppercase">نوع الخط</p>
                    <div className="flex gap-4">
                      <button onClick={() => setReaderFontFamily('sans')} className={`flex-1 px-4 py-3 rounded-2xl border-2 transition-all font-sans font-black ${readerFontFamily === 'sans' ? 'border-indigo-600' : 'border-slate-200'}`}>SANS</button>
                      <button onClick={() => setReaderFontFamily('serif')} className={`flex-1 px-4 py-3 rounded-2xl border-2 transition-all font-serif font-black ${readerFontFamily === 'serif' ? 'border-indigo-600' : 'border-slate-200'}`}>SERIF</button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-indigo-600 p-10 rounded-[2.5rem] text-white flex items-center justify-between shadow-2xl">
                <div className="space-y-2">
                  <h5 className="font-black text-2xl">ادعم كُتابك المفضلين</h5>
                  <p className="text-white/70 text-sm font-bold">بتفعيل ميزات الكتاب، أنت تساهم في استمرارية الإبداع الثقافي.</p>
                </div>
                <button onClick={() => handleBuyFeature(selectedBook)} className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black hover:scale-105 transition-all">ادعم الآن</button>
              </section>
            </div>
          </div>
        )}
      </Modal>

      {/* Advanced Reader Interface */}
      {isReading && selectedBook && (
        <div className={`fixed inset-0 z-[600] flex flex-col animate-in fade-in duration-500 
          ${readerTheme === 'light' ? 'bg-white text-slate-900' : 
            readerTheme === 'sepia' ? 'bg-[#f4ecd8] text-[#5b4636]' : 
            'bg-slate-950 text-slate-100'}`}
        >
          <header className={`p-6 border-b flex items-center justify-between backdrop-blur-md sticky top-0 z-10
            ${readerTheme === 'light' ? 'border-slate-100 bg-white/80' : 
              readerTheme === 'sepia' ? 'border-[#e4dcc8] bg-[#f4ecd8]/80' : 
              'border-slate-800 bg-slate-950/80'}`}
          >
             <div className="flex items-center gap-4">
               <button onClick={() => { setIsReading(false); setReaderPage(1); }} className="p-3 rounded-xl hover:bg-black/5 transition-colors"><X size={24}/></button>
               <div>
                 <h2 className="font-bold text-base">{selectedBook.title}</h2>
                 <p className="text-[10px] font-bold opacity-60">تأليف: {selectedBook.author}</p>
               </div>
             </div>
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-black/5 p-1.5 rounded-xl">
                   <button onClick={() => setReaderFontSize(f => Math.max(12, f-2))} className="p-2 hover:bg-black/10 rounded-lg"><Type size={14}/></button>
                   <span className="text-sm font-black min-w-[30px] text-center">{readerFontSize}</span>
                   <button onClick={() => setReaderFontSize(f => Math.min(40, f+2))} className="p-2 hover:bg-black/10 rounded-lg"><Type size={20}/></button>
                </div>
                <div className="flex items-center gap-2">
                   <button onClick={() => setReaderTheme('light')} className={`w-8 h-8 rounded-full border-2 ${readerTheme === 'light' ? 'border-indigo-600' : 'border-transparent'} bg-white shadow-sm`}></button>
                   <button onClick={() => setReaderTheme('sepia')} className={`w-8 h-8 rounded-full border-2 ${readerTheme === 'sepia' ? 'border-indigo-600' : 'border-transparent'} bg-[#f4ecd8] shadow-sm`}></button>
                   <button onClick={() => setReaderTheme('dark')} className={`w-8 h-8 rounded-full border-2 ${readerTheme === 'dark' ? 'border-indigo-600' : 'border-transparent'} bg-slate-900 shadow-sm`}></button>
                </div>
             </div>
          </header>
          
          <div className="flex-1 overflow-y-auto p-12 md:p-24 lg:px-64 text-justify custom-scrollbar">
             <article 
               className={`max-w-3xl mx-auto space-y-12 
                 ${readerFontFamily === 'serif' ? 'font-serif' : 
                   readerFontFamily === 'mono' ? 'font-mono' : 'font-sans'}`} 
               style={{ fontSize: `${readerFontSize}px`, lineHeight: '2.5' }}
             >
                <div className="text-center mb-20 space-y-4">
                   <h1 className="text-5xl font-black mb-4 leading-tight">{selectedBook.title}</h1>
                   <p className="text-indigo-500 font-bold text-xl">{selectedBook.author}</p>
                   <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full"></div>
                </div>

                <p className="font-medium indent-8">
                   {selectedBook.content}
                </p>
                <p className="font-medium indent-8">
                   هذا المحتوى مقدم مجاناً كجزء من مبادرة أرسلان الشماري لنشر الثقافة الرقمية. يمكنك الاستمتاع بقراءة الكتاب بالكامل وتصفح جميع الفصول دون أي تكلفة.
                </p>
                <p className="font-medium indent-8 italic border-r-4 border-indigo-500 pr-6 py-2 bg-black/5 rounded-l-2xl">
                   "إن المعرفة هي القوة الوحيدة التي تزداد كلما تقاسمتها مع الآخرين، والكتب هي السفن التي تبحر بنا في محيطات الفكر."
                </p>
                <p className="font-medium indent-8">
                   يواصل الكتاب استكشاف أعماق {selectedBook.category} في المجلدات القادمة، حيث يتناول بالتفصيل التحولات الاجتماعية والفكرية المعاصرة.
                </p>
             </article>
          </div>
          
          <footer className={`p-6 border-t flex items-center justify-between px-12 md:px-24 
            ${readerTheme === 'light' ? 'border-slate-100 bg-slate-50' : 
              readerTheme === 'sepia' ? 'border-[#e4dcc8] bg-[#f4ecd8]' : 
              'border-slate-800 bg-slate-900'}`}
          >
             <button onClick={() => setReaderPage(p => Math.max(1, p-1))} className="flex items-center gap-2 font-bold opacity-60 hover:opacity-100"><ChevronRight size={24}/> السابق</button>
             <div className="flex flex-col items-center">
                <span className="font-black text-lg">{readerPage} من {selectedBook.pages}</span>
                <div className="w-48 h-1 bg-black/10 rounded-full mt-1 overflow-hidden">
                   <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${(readerPage / selectedBook.pages) * 100}%` }}></div>
                </div>
             </div>
             <button onClick={() => setReaderPage(p => Math.min(selectedBook.pages, p+1))} className="flex items-center gap-2 font-bold opacity-60 hover:opacity-100">التالي <ChevronLeft size={24}/></button>
          </footer>
        </div>
      )}

      {/* Smart Assistant */}
      <SmartAssistant />
    </div>
  );
};

const SmartAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMsg = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: { systemInstruction: "أنت مساعد ذكي لمنصة المعرفة الرقمية. تحدث باللغة العربية بأسلوب راقٍ ومفيد." }
      });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "عذراً، لم أستطع الإجابة." }]);
    } catch {
      setMessages(prev => [...prev, { role: 'model', text: "حدث خطأ في الاتصال بالذكاء الاصطناعي." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-8 right-8 w-16 h-16 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[400]">
        {isOpen ? <X size={28} /> : <Bot size={28} />}
      </button>
      {isOpen && (
        <div className="fixed bottom-28 right-8 w-80 max-h-[500px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 z-[400] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-6 bg-slate-900 dark:bg-indigo-600 text-white flex items-center gap-3">
            <Bot size={20}/> <h3 className="text-base font-black">المساعد الذكي</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/20 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-bold ${msg.role === 'user' ? 'bg-white dark:bg-slate-800' : 'bg-slate-900 dark:bg-indigo-600 text-white'}`}>{msg.text}</div>
              </div>
            ))}
            {isLoading && <Loader2 className="animate-spin text-indigo-600 mx-auto" size={16}/>}
          </div>
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="اسألني عن الكتب..." className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-2 text-xs font-bold outline-none" />
            <button onClick={handleSend} className="p-2 bg-slate-900 dark:bg-indigo-600 text-white rounded-xl"><Send size={16} /></button>
          </div>
        </div>
      )}
    </>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
