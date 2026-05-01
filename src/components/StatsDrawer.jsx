import { motion as Motion, AnimatePresence } from "framer-motion";

import { X, BarChart3, History, CheckCircle, Clock } from "lucide-react";

function StatsDrawer({ isOpen, onClose, tasks, history }) {
  const completedToday = tasks.filter((t) => t.done).length;
  const totalTasks = tasks.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
          />
          <Motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-bg-card border-l border-border-primary p-8 z-[151] flex flex-col gap-8 shadow-2xl"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent-primary/10 rounded-lg text-accent-primary">
                  <BarChart3 size={20} />
                </div>
                <h3 className="text-xl font-black text-text-primary tracking-tight">Statistics</h3>
              </div>
              <button 
                className="p-2 rounded-xl bg-bg-secondary text-text-muted hover:text-rose-400 hover:bg-rose-500/10 transition-all active:scale-90" 
                onClick={onClose}
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg-secondary/50 border border-border-primary/50 p-5 rounded-2xl flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Total Reminders</span>
                <span className="text-3xl font-black text-text-primary">{totalTasks}</span>
              </div>
              <div className="bg-bg-secondary/50 border border-border-primary/50 p-5 rounded-2xl flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Completed Today</span>
                <span className="text-3xl font-black text-accent-primary">{completedToday}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-2 px-1">
                <History size={16} className="text-accent-primary/60" />
                <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary">Recent History</h4>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-3">
                {history.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-3 opacity-40">
                    <History size={40} className="text-text-muted" />
                    <p className="text-xs font-bold uppercase tracking-widest text-text-muted text-center">No history recorded yet</p>
                  </div>
                ) : (
                  history.map((item) => (
                    <div key={item.id} className="group relative pl-4 border-l-2 border-border-primary hover:border-accent-primary transition-colors py-1">
                      <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-border-primary group-hover:bg-accent-primary transition-colors" />
                      <span className="text-sm font-bold text-text-primary block leading-tight mb-1">{item.text}</span>
                      <div className="flex items-center gap-2 text-[10px] font-medium text-text-muted uppercase tracking-tighter">
                        <CheckCircle size={10} className="text-accent-primary/60" />
                        <span>Completed at {new Date(item.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default StatsDrawer;
