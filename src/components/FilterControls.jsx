import { SortAsc, CheckCircle2, Circle, List, Search } from "lucide-react";

function FilterControls({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <div className="glass-card p-4 sm:p-5 flex flex-col gap-4">
      <div className="relative group">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-primary transition-colors" />
        <input
          type="text"
          placeholder="Search community tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-bg-secondary/50 border border-border-primary/50 rounded-xl py-3 pl-11 pr-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary focus:bg-bg-primary transition-all"
        />
      </div>

      <div className="flex flex-col xs:flex-row justify-between items-stretch xs:items-center gap-4">
        <div className="flex bg-bg-secondary/80 p-1 rounded-xl border border-border-primary/50 overflow-x-auto no-scrollbar">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
              filter === "all" 
              ? "bg-bg-card text-accent-primary shadow-lg border border-border-primary/50" 
              : "text-text-muted hover:text-text-secondary"
            }`}
            onClick={() => setFilter("all")}
          >
            <List size={14} /> All
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
              filter === "active" 
              ? "bg-bg-card text-accent-primary shadow-lg border border-border-primary/50" 
              : "text-text-muted hover:text-text-secondary"
            }`}
            onClick={() => setFilter("active")}
          >
            <Circle size={14} /> Active
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
              filter === "done" 
              ? "bg-bg-card text-accent-primary shadow-lg border border-border-primary/50" 
              : "text-text-muted hover:text-text-secondary"
            }`}
            onClick={() => setFilter("done")}
          >
            <CheckCircle2 size={14} /> Done
          </button>
        </div>

        <div className="flex items-center gap-3 self-end xs:self-auto">
          <div className="flex items-center gap-1.5 text-text-muted text-xs font-bold uppercase tracking-widest">
            <SortAsc size={14} className="text-accent-primary/50" />
            <span>Sort By:</span>
          </div>
          <div className="flex bg-bg-secondary/80 p-1 rounded-xl border border-border-primary/50">
            <button
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all duration-300 ${
                sortBy === "time" 
                ? "bg-bg-card text-accent-primary shadow-md" 
                : "text-text-muted hover:text-text-secondary"
              }`}
              onClick={() => setSortBy("time")}
            >
              Time
            </button>
            <button
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all duration-300 ${
                sortBy === "priority" 
                ? "bg-bg-card text-accent-primary shadow-md" 
                : "text-text-muted hover:text-text-secondary"
              }`}
              onClick={() => setSortBy("priority")}
            >
              Priority
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterControls;
