import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgress } from "@/contexts/ProgressContext";
import { ExerciseCard } from "@/components/ExerciseCard";
import { exercises } from "@/data/exercises";
import { Search } from "lucide-react";

export default function Exercises() {
  const { t } = useLanguage();
  const { isCompleted } = useProgress();
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return exercises.filter(ex => {
      if (levelFilter !== "all" && ex.level !== levelFilter) return false;
      if (statusFilter === "completed" && !isCompleted(ex.id)) return false;
      if (statusFilter === "pending" && isCompleted(ex.id)) return false;
      if (search && !ex.title.toLowerCase().includes(search.toLowerCase()) &&
          !ex.concept.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [levelFilter, statusFilter, search, isCompleted]);

  const levels = ["all", "beginner", "intermediate", "advanced"];
  const statuses = ["all", "completed", "pending"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-slide-in">
      <h1 className="text-3xl font-display font-bold text-gradient-green mb-6">{t("nav.exercises")}</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("filter.search")}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex rounded-lg border border-border overflow-hidden">
          {levels.map(l => (
            <button
              key={l}
              onClick={() => setLevelFilter(l)}
              className={`px-3 py-2 text-xs font-medium transition-colors ${
                levelFilter === l ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {l === "all" ? t("filter.all") : t(`level.${l}`)}
            </button>
          ))}
        </div>
        <div className="flex rounded-lg border border-border overflow-hidden">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 text-xs font-medium transition-colors ${
                statusFilter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(`filter.${s}`)}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{filtered.length} {t("exercises.count")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(ex => (
          <ExerciseCard key={ex.id} exercise={ex} />
        ))}
      </div>
    </div>
  );
}
