import { useState, useEffect } from "react";
import { compressImage } from "../utils/imageUtils";
import { 
  FileText, Plus, Trash2, Edit3, Calendar, Download, 
  File, X, Upload, Loader2, User as UserIcon, Search 
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { 
  collection, onSnapshot, addDoc, updateDoc, 
  deleteDoc, doc, query, orderBy 
} from "firebase/firestore";
import { 
  ref, uploadBytesResumable, getDownloadURL, deleteObject 
} from "firebase/storage";
import { db, storage } from "../firebase";

function SummarySection({ currentUser }) {
  const [summaries, setSummaries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "summaries"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSummaries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.error("Firestore Snapshot Error (Summaries):", error);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setLoading(true);

    let fileUrl = "";
    let fileName = "";

    try {
      if (file) {
        const compressedFile = await compressImage(file);
        const storageRef = ref(storage, `summaries/${Date.now()}_${compressedFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, compressedFile);

        const url = await new Promise((resolve, reject) => {
          uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            }, 
            (error) => reject(error), 
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });

        fileUrl = url;
        fileName = file.name;
      }

      const summaryData = {
        title,
        content,
        date,
        fileUrl,
        fileName,
        userId: currentUser.uid,
        userName: currentUser.displayName || currentUser.email.split('@')[0],
        userEmail: currentUser.email,
        createdAt: new Date().toISOString(),
      };

      if (editingId) {
        // If editing, merge with old data if no new file
        const oldSummary = summaries.find(s => s.id === editingId);
        await updateDoc(doc(db, "summaries", editingId), {
          ...summaryData,
          fileUrl: fileUrl || oldSummary.fileUrl,
          fileName: fileName || oldSummary.fileName,
        });
      } else {
        await addDoc(collection(db, "summaries"), summaryData);
      }

      resetForm();
    } catch (error) {
      console.error("Error saving summary:", error);
      let errorMessage = "Error saving summary.";
      if (error.code === 'storage/unauthorized') {
        errorMessage = "Unauthorized: Check Firebase Storage rules.";
      } else if (error.code === 'permission-denied') {
        errorMessage = "Permission Denied: Check Firestore rules.";
      } else {
        errorMessage += " " + (error.message || "Unknown error.");
      }
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (summary) => {
    if (!window.confirm("Are you sure you want to delete this summary?")) return;
    try {
      if (summary.fileUrl) {
        const fileRef = ref(storage, summary.fileUrl);
        await deleteObject(fileRef).catch(e => console.log("File already deleted or missing"));
      }
      await deleteDoc(doc(db, "summaries", summary.id));
    } catch (error) {
      console.error("Error deleting summary:", error);
    }
  };

  const handleEdit = (summary) => {
    setEditingId(summary.id);
    setTitle(summary.title);
    setContent(summary.content);
    setDate(summary.date);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setDate(new Date().toISOString().split('T')[0]);
    setFile(null);
    setEditingId(null);
    setIsModalOpen(false);
    setUploadProgress(0);
  };

  const filteredSummaries = summaries
    .filter(s => 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search summaries..." 
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
          <span>New Summary</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredSummaries.map((s) => (
            <Motion.div 
              key={s.id} 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card flex flex-col p-6 hover:translate-y-[-4px] active:scale-[0.98] group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-text-primary leading-tight group-hover:text-accent-primary transition-colors">{s.title}</h3>
                <div className="flex gap-1">
                  {s.userEmail === currentUser.email && (
                    <>
                      <button className="p-2 rounded-lg text-text-muted hover:text-accent-primary hover:bg-accent-primary/10 transition-all opacity-0 group-hover:opacity-100" onClick={() => handleEdit(s)}>
                        <Edit3 size={16}/>
                      </button>
                      <button className="p-2 rounded-lg text-text-muted hover:text-rose-400 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100" onClick={() => handleDelete(s)}>
                        <Trash2 size={16}/>
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">{s.content}</p>
              
              {s.fileUrl && (
                <a 
                  href={s.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 p-3 bg-bg-primary/40 border border-border-primary/50 rounded-xl mb-6 hover:border-accent-primary/40 transition-all group/file"
                >
                  <div className="p-2 bg-accent-primary/10 text-accent-primary rounded-lg">
                    <File size={16} />
                  </div>
                  <span className="flex-1 text-xs font-medium text-text-secondary truncate">{s.fileName}</span>
                  <Download size={14} className="text-text-muted group-hover/file:text-accent-primary" />
                </a>
              )}

              <div className="mt-auto pt-4 border-t border-border-primary/30 flex justify-between items-center">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-muted">
                  <Calendar size={12} className="text-accent-primary/40" />
                  <span>{s.date}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent-primary">
                  <UserIcon size={12} />
                  <span>{s.userName}</span>
                </div>
              </div>
            </Motion.div>
          ))}
        </AnimatePresence>
      </div>

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
                    {editingId ? "Edit Summary" : "Create New Summary"}
                  </h2>
                  <button className="p-2 rounded-xl bg-bg-secondary text-text-muted hover:text-rose-400 hover:bg-rose-500/10 transition-all" onClick={resetForm}>
                    <X size={24}/>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">Summary Title</label>
                    <input 
                      type="text" 
                      value={title} 
                      onChange={e => setTitle(e.target.value)}
                      placeholder="e.g., Mathematics Lecture Notes"
                      className="w-full bg-bg-secondary/50 border border-border-primary/50 rounded-xl py-3 px-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-all"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">Date</label>
                    <input 
                      type="date" 
                      value={date} 
                      onChange={e => setDate(e.target.value)}
                      className="w-full bg-bg-secondary/50 border border-border-primary/50 rounded-xl py-3 px-4 text-text-primary focus:outline-none focus:border-accent-primary transition-all"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">Content / Notes</label>
                    <textarea 
                      value={content} 
                      onChange={e => setContent(e.target.value)}
                      placeholder="Briefly describe the summary..."
                      className="w-full bg-bg-secondary/50 border border-border-primary/50 rounded-xl p-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-all min-h-[120px] resize-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">File Attachment (Optional)</label>
                    <div className="relative">
                      <input 
                        type="file" 
                        id="summary-file"
                        className="hidden"
                        onChange={e => setFile(e.target.files[0])}
                      />
                      <label 
                        htmlFor="summary-file" 
                        className="flex flex-col items-center justify-center gap-3 p-6 bg-bg-secondary/30 border-2 border-dashed border-border-primary/50 rounded-2xl cursor-pointer hover:bg-bg-secondary/50 hover:border-accent-primary/50 transition-all"
                      >
                        {file ? (
                          <div className="flex items-center gap-3 bg-accent-primary/10 text-accent-primary px-4 py-2 rounded-xl border border-accent-primary/20">
                            <File size={20} />
                            <span className="text-sm font-bold truncate max-w-[200px]">{file.name}</span>
                            <button onClick={(e) => { e.preventDefault(); setFile(null); }} className="p-1 hover:bg-rose-500 hover:text-white rounded-full transition-colors">
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="p-3 bg-bg-card rounded-2xl text-text-muted">
                              <Upload size={28} />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-bold text-text-secondary">Click to upload file</p>
                              <p className="text-[10px] text-text-muted mt-1 uppercase tracking-tighter">PDF, DOC, Images (Max 10MB)</p>
                            </div>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className={`btn-primary w-full py-4 mt-2 ${loading ? 'opacity-80' : ''}`} 
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <Loader2 className="animate-spin" size={20} /> 
                        <span>
                          {uploadProgress > 0 && uploadProgress < 100 
                            ? `Uploading ${Math.round(uploadProgress)}%` 
                            : "Saving..."}
                        </span>
                      </div>
                    ) : (
                      <span className="flex items-center gap-2">
                        {editingId ? <Edit3 size={18} /> : <Plus size={18} />}
                        {editingId ? "Update Summary" : "Create Summary"}
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

export default SummarySection;
