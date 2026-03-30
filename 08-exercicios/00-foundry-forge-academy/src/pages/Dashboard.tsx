import { useProgress } from "@/contexts/ProgressContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ProgressBar } from "@/components/ProgressBar";
import { ExerciseCard } from "@/components/ExerciseCard";
import { exercises } from "@/data/exercises";
import { RotateCcw, BookOpen, Trophy, Target } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { getCompletionPercentage, getCompletionCount, resetProgress } = useProgress();
  const { t } = useLanguage();

  const levels = [
    { key: "beginner", color: "bg-beginner" },
    { key: "intermediate", color: "bg-intermediate" },
    { key: "advanced", color: "bg-advanced" },
  ] as const;

  const recentExercises = exercises.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-slide-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gradient-green">{t("dashboard.title")}</h1>
          <p className="text-muted-foreground mt-1">{t("dashboard.subtitle")}</p>
        </div>
        <button
          onClick={resetProgress}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          {t("progress.reset")}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-border bg-card p-5 glow-green">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("dashboard.overall")}</p>
              <p className="text-2xl font-bold font-mono">{getCompletionPercentage()}%</p>
            </div>
          </div>
          <ProgressBar percentage={getCompletionPercentage()} size="sm" showLabel={false} />
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("dashboard.completed")}</p>
              <p className="text-2xl font-bold font-mono">{getCompletionCount()}/30</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("dashboard.remaining")}</p>
              <p className="text-2xl font-bold font-mono">{30 - getCompletionCount()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Level progress */}
      <div className="rounded-xl border border-border bg-card p-6 mb-8">
        <h2 className="text-lg font-display font-semibold mb-4">{t("dashboard.roadmap")}</h2>
        <div className="space-y-4">
          {levels.map(level => (
            <div key={level.key} className="flex items-center gap-4">
              <span className="text-sm font-medium w-28 shrink-0">{t(`level.${level.key}`)}</span>
              <div className="flex-1">
                <ProgressBar
                  percentage={getCompletionPercentage(level.key)}
                  color={level.color}
                  size="sm"
                  showLabel
                />
              </div>
              <span className="text-xs font-mono text-muted-foreground w-12 text-right">
                {getCompletionCount(level.key)}/10
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent exercises */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-display font-semibold">{t("nav.exercises")}</h2>
        <Link to="/exercises" className="text-sm text-primary hover:underline">{t("dashboard.viewAll")}</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentExercises.map(ex => (
          <ExerciseCard key={ex.id} exercise={ex} />
        ))}
      </div>
    </div>
  );
}
