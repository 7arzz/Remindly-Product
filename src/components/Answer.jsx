import { useState } from "react";
import { Send, Trash2, User as UserIcon, Camera, X, Loader2 } from "lucide-react";

function Answer({ answers = [], onAddAnswer, onDeleteAnswer, currentUser }) {
  const [newAnswer, setNewAnswer] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAdd = async () => {
    if (!newAnswer.trim() && !imageFile) return;
    setIsSubmitting(true);
    try {
      await onAddAnswer(newAnswer, imageFile);
      setNewAnswer("");
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding answer:", error);
      alert("Failed to post answer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 pt-6 border-t border-border-primary/50">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-accent-primary/60">
        Collaborative Discussion
      </h3>
      
      <div className="bg-bg-secondary/30 border border-border-primary/50 rounded-2xl p-4 sm:p-5 flex flex-col gap-4 shadow-inner">
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Share your answer or notes with everyone..."
          className="w-full bg-transparent border-none text-text-primary placeholder:text-text-muted text-sm sm:text-base focus:ring-0 resize-none min-h-[80px]"
          disabled={isSubmitting}
        />
        
        {imagePreview && (
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-accent-primary/30 group fadeIn">
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            <button 
              className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full hover:bg-red-500 transition-colors" 
              onClick={() => { setImageFile(null); setImagePreview(null); }}
            >
              <X size={12} />
            </button>
          </div>
        )}

        <div className="flex flex-wrap justify-between items-center gap-3 pt-3 border-t border-border-primary/20">
          <div className="flex gap-2">
            <input 
              type="file" 
              id="answer-image" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
              disabled={isSubmitting}
            />
            <label 
              htmlFor="answer-image" 
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-bg-card border border-border-primary/50 text-text-secondary hover:text-accent-primary hover:border-accent-primary cursor-pointer transition-all text-xs font-bold uppercase tracking-wider"
            >
              <Camera size={16} />
              <span className="hidden xs:block">Add Image</span>
            </label>
          </div>
          
          <button 
            className={`btn-primary py-2.5 px-5 text-sm ${isSubmitting || (!newAnswer.trim() && !imageFile) ? 'opacity-50 grayscale scale-100 cursor-not-allowed' : ''}`}
            onClick={handleAdd} 
            disabled={isSubmitting || (!newAnswer.trim() && !imageFile)}
          >
            {isSubmitting ? (
              <><Loader2 className="animate-spin" size={16} /> <span>Posting...</span></>
            ) : (
              <><Send size={16} /> <span>Submit Answer</span></>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {answers.length === 0 ? (
          <div className="py-12 flex flex-col items-center gap-3 opacity-30 grayscale">
             <Send size={40} className="text-text-muted" />
             <p className="text-xs font-black uppercase tracking-widest text-text-muted text-center">No answers yet. Be the first to help!</p>
          </div>
        ) : (
          answers.map((ans) => (
            <div key={ans.id} className="group relative bg-bg-card/40 border border-border-primary/40 rounded-2xl p-5 hover:border-accent-primary/30 transition-all">
              <div className="flex items-center gap-2 text-xs font-bold text-accent-primary mb-3">
                <div className="w-5 h-5 rounded-full bg-accent-primary/20 flex items-center justify-center">
                  <UserIcon size={10} />
                </div>
                <span>{ans.userName}</span>
              </div>
              
              <div className="text-text-primary text-sm sm:text-base leading-relaxed whitespace-pre-wrap mb-4">
                {ans.text}
              </div>

              {ans.imageUrl && (
                <div 
                  className="rounded-xl overflow-hidden border border-border-primary/50 mb-4 cursor-zoom-in group/img"
                  onClick={() => window.open(ans.imageUrl, '_blank')}
                >
                  <img src={ans.imageUrl} alt="Answer attachment" className="w-full max-h-64 object-contain bg-black/40 transition-transform duration-500 group-hover/img:scale-[1.02]" />
                </div>
              )}

              <div className="flex justify-between items-center mt-2">
                <div className="text-[10px] font-medium text-text-muted uppercase tracking-widest">
                  {new Date(ans.createdAt).toLocaleString([], {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                
                {ans.userEmail === currentUser.email && (
                  <button
                    className="p-1.5 rounded-lg text-text-muted hover:text-rose-400 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100"
                    onClick={() => onDeleteAnswer(ans.id)}
                    title="Delete your answer"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Answer;
