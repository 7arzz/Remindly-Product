import { useState } from "react";
import { Plus, Calendar, Type, FileText, ChevronDown, ChevronUp, Camera, X } from "lucide-react";

function TaskInput({ addTask }) {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("medium");
  const [detail, setDetail] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAdd = () => {
    if (!text || !time) return;
    addTask(text, time, priority, detail, imageFile);
    setText("");
    setTime("");
    setPriority("medium");
    setDetail("");
    setShowDetail(false);
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="flex flex-col gap-5 p-5 sm:p-6 bg-bg-card/20">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Type size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-primary transition-colors" />
          <input
            type="text"
            placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-bg-secondary/50 border border-border-primary/50 rounded-xl py-3.5 pl-11 pr-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary focus:bg-bg-primary transition-all shadow-inner"
          />
        </div>

        <div className="relative w-full sm:w-56 group">
          <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-primary transition-colors" />
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-bg-secondary/50 border border-border-primary/50 rounded-xl py-3.5 pl-11 pr-4 text-text-primary focus:outline-none focus:border-accent-primary focus:bg-bg-primary transition-all shadow-inner"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowDetail(!showDetail)}
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-primary transition-colors w-fit px-1"
      >
        <FileText size={16} />
        <span className="font-medium">Add detail (optional)</span>
        {showDetail ? <ChevronUp size={14} className="opacity-50" /> : <ChevronDown size={14} className="opacity-50" />}
      </button>

      {showDetail && (
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="Describe the task in more detail..."
          className="w-full bg-bg-secondary/50 border border-border-primary/50 rounded-xl p-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary focus:bg-bg-primary transition-all min-h-[100px] resize-none shadow-inner fadeIn"
        />
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="flex bg-bg-secondary/80 p-1 rounded-xl border border-border-primary/50 flex-1 sm:flex-none">
          {['low', 'medium', 'high'].map((p) => (
            <button
              key={p}
              type="button"
              className={`flex-1 sm:px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                priority === p 
                ? (p === 'low' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10' 
                   : p === 'medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-lg shadow-amber-500/10'
                   : 'bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-lg shadow-rose-500/10')
                : 'text-text-muted hover:text-text-secondary'
              }`}
              onClick={() => setPriority(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex gap-3 h-[48px] flex-1">
          <input 
            type="file" 
            id="task-image" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange}
          />
          <label 
            htmlFor="task-image" 
            className="flex items-center justify-center aspect-square h-full bg-bg-secondary/50 border border-border-primary/50 rounded-xl text-text-secondary hover:text-accent-primary hover:border-accent-primary cursor-pointer transition-all active:scale-95"
          >
            <Camera size={22} />
          </label>

          <button 
            className={`btn-primary flex-1 ${!text || !time ? 'opacity-50 cursor-not-allowed scale-100' : ''}`}
            onClick={handleAdd}
            disabled={!text || !time}
          >
            <Plus size={20} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {imagePreview && (
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 border-accent-primary/30 group fadeIn">
          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          <button 
            className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full hover:bg-red-500 transition-colors" 
            onClick={() => { setImageFile(null); setImagePreview(null); }}
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskInput;
