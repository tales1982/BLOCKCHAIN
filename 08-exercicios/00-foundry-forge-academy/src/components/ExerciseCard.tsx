import { useProgress } from "@/contexts/ProgressContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, Star, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import type { Exercise } from "@/data/exercises";

interface ExerciseCardProps {
  exercise: Exercise;
}

const levelColors: Record<string, string> = {
  beginner: "text-beginner border-beginner/30 bg-beginner/5",
  intermediate: "text-intermediate border-intermediate/30 bg-intermediate/5",
  advanced: "text-advanced border-advanced/30 bg-advanced/5",
};

const levelDot: Record<string, string> = {
  beginner: "bg-beginner",
  intermediate: "bg-intermediate",
  advanced: "bg-advanced",
};

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const { isCompleted, isFavorite, toggleFavorite } = useProgress();
  const { t } = useLanguage();
  const completed = isCompleted(exercise.id);
  const favorite = isFavorite(exercise.id);

  return (
    <div className="group relative rounded-xl border border-border bg-card p-5 card-hover">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${levelDot[exercise.level]}`} />
          <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${levelColors[exercise.level]}`}>
            {t(`level.${exercise.level}`)}
          </span>
          <span className="text-xs text-muted-foreground font-mono">#{exercise.order}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.preventDefault(); toggleFavorite(exercise.id); }}
            className="p-1 rounded-md hover:bg-secondary transition-colors"
          >
            <Star className={`w-4 h-4 ${favorite ? "fill-warning text-warning" : "text-muted-foreground"}`} />
          </button>
          {completed && <CheckCircle2 className="w-5 h-5 text-primary" />}
        </div>
      </div>

      <Link to={`/exercise/${exercise.id}`} className="block">
        <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {exercise.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{exercise.concept}</p>
      </Link>
    </div>
  );
}
