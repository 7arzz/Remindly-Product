import { useState, useEffect } from "react";
import { 
  FileText, Plus, Trash2, Edit3, Calendar, 
  X, Loader2, User as UserIcon, Search 
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { 
  collection, onSnapshot, addDoc, updateDoc, 
  deleteDoc, doc, query 
} from "firebase/firestore";
import { db } from "../firebase";

function ProjectSection({ currentUser }) {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Menggunakan koleksi 'projects' untuk fitur baru ini
    const q = query(collection(db, "projects"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.error("Firestore Snapshot Error (Projects):", error);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setLoading(true);

    try {
      const projectData = {
        title,
        content,
        date,
        userId: currentUser.uid,
        userName: currentUser.displayName || currentUser.email.split('@')[0],
        userEmail: currentUser.email,
        updatedAt: new Date().toISOString(),
      };

      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), projectData);
      } else {
        projectData.createdAt = new Date().toISOString();
        await addDoc(collection(db, "projects"), projectData);
      }

      resetForm();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Gagal menyimpan proyek.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus proyek ini?")) return;
    try {
      await deleteDoc(doc(db, "projects", project.id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setContent(project.content);
    setDate(project.date);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setDate(new Date().toISOString().split('T')[0]);
    setEditingId(null);
    setIsModalOpen(false);
  };

  const filteredProjects = projects
    .filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Cari proyek..." 
            className="w-full bg-bg-secondary/50 border border-border-primary/50 rounded-xl py-3.5 pl-11 pr-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary focus:bg-bg-primary transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button 
          className="btn-primary py-3.5 px-6 shadow-xl shadow-accent-primary/10 whitespace-nowrap" 
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
          <span>Proyek Baru</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredProjects.map((p) => (
            <Motion.div 
              key={p.id} 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card flex flex-col p-6 hover:translate-y-[-4px] active:scale-[0.98] group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4 relative z-10">
                <h3 className="text-xl font-bold text-text-primary leading-tight group-hover:text-accent-primary transition-colors">{p.title}</h3>
                <div className="flex gap-1">
                  {p.userEmail === currentUser.email && (
                    <>
                      <button 
                        className="p-2 rounded-lg text-text-muted hover:text-accent-primary hover:bg-accent-primary/10 transition-all opacity-0 group-hover:opacity-100" 
                        onClick={() => handleEdit(p)}
                        title="Edit Proyek"
                      >
                        <Edit3 size={16}/>
                      </button>
                      <button 
                        className="p-2 rounded-lg text-text-muted hover:text-rose-400 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100" 
                        onClick={() => handleDelete(p)}
                        title="Hapus Proyek"
                      >
                        <Trash2 size={16}/>
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3 relative z-10">{p.content}</p>
              
              <div className="mt-auto pt-4 border-t border-border-primary/30 flex justify-between items-center relative z-10">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-muted">
                  <Calendar size={12} className="text-accent-primary/40" />
                  <span>{p.date}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent-primary">
                  <UserIcon size={12} />
                  <span>{p.userName}</span>
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-accent-primary/10 transition-colors"></div>
            </Motion.div>
          ))}
        </AnimatePresence>
        
        {filteredProjects.length === 0 && !loading && (
          <div className="col-span-full py-20 text-center opacity-40">
            <FileText size={48} className="mx-auto mb-4 text-text-muted" />
            <p className="text-sm font-bold uppercase tracking-widest">Belum ada proyek. Mulai dengan membuat satu!</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6" onClick={resetForm}>
            <Motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-bg-card border border-border-primary rounded-[32px] w-full max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black text-text-primary tracking-tight">
                    {editingId ? "Edit Proyek" : "Buat Proyek Baru"}
                  </h2>
                  <button className="p-2 rounded-xl bg-bg-secondary text-text-muted hover:text-rose-400 hover:bg-rose-500/10 transition-all" onClick={resetForm}>
                    <X size={24}/>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">Judul Proyek</label>
                    <input 
                      type="text" 
                      value={title} 
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Contoh: Pengembangan Website"
                      className="w-full bg-bg-secondary/50 border border-border-primary/50 rounded-xl py-3 px-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-all"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">Tanggal</label>
                    <input 
                      type="date" 
                      value={date} 
                      onChange={e => setDate(e.target.value)}
                      className="w-full bg-bg-secondary/50 border border-border-primary/50 rounded-xl py-3 px-4 text-text-primary focus:outline-none focus:border-accent-primary transition-all"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">Deskripsi / Catatan</label>
                    <textarea 
                      value={content} 
                      onChange={e => setContent(e.target.value)}
                      placeholder="Jelaskan detail proyek Anda..."
                      className="w-full bg-bg-secondary/50 border border-border-primary/50 rounded-xl p-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-all min-h-[120px] resize-none"
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className={`btn-primary w-full py-4 mt-2 ${loading ? 'opacity-80' : ''}`} 
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <Loader2 className="animate-spin" size={20} /> 
                        <span>Menyimpan...</span>
                      </div>
                    ) : (
                      <span className="flex items-center gap-2">
                        {editingId ? <Edit3 size={18} /> : <Plus size={18} />}
                        {editingId ? "Perbarui Proyek" : "Simpan Proyek"}
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProjectSection;
