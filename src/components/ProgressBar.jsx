import { motion as Motion } from "framer-motion";


function ProgressBar({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.done).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="glass-card p-5 sm:p-6 bg-bg-card/20 border-accent-primary/10">
      <div className="flex justify-between items-end mb-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Task Completion</span>
          <span className="text-sm font-bold text-text-secondary">Community Progress</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-black text-accent-primary leading-none">{percentage}%</span>
          <span className="text-[10px] font-medium text-text-muted">{completed} of {total} tasks</span>
        </div>
      </div>
      <div className="h-2.5 w-full bg-bg-secondary/80 rounded-full overflow-hidden border border-border-primary/30 p-[2px]">
        <Motion.div
          className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full shadow-[0_0_15px_rgba(100,255,218,0.4)]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "circOut" }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
