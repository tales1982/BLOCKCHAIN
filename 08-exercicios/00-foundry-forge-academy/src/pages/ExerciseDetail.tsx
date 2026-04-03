import { useParams, Link } from "react-router-dom";
import { getExerciseById } from "@/data/exercises";
import { exerciseTranslationsPT } from "@/data/exerciseTranslations";
import { useProgress } from "@/contexts/ProgressContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { CodeBlock } from "@/components/CodeBlock";
import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronRight, ArrowLeft, Star, Lightbulb, AlertTriangle, Award, ListChecks, BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

function extractText(children: unknown): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  return "";
}

const mdComponents: Components = {
  p: ({ children }) => <p className="mb-2">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  pre: ({ children }) => <>{children}</>,
  code: ({ children, className }) => {
    const isBlock = className?.startsWith("language-");
    if (isBlock) {
      const lang = className?.replace("language-", "") ?? "solidity";
      return <CodeBlock code={extractText(children).replace(/\n$/, "")} language={lang} />;
    }
    return <code className="bg-secondary/70 text-primary px-1 py-0.5 rounded text-xs font-mono">{children}</code>;
  },
};

export default function ExerciseDetail() {
  const { id } = useParams<{ id: string }>();
  const exercise = getExerciseById(id || "");
  const { isCompleted, toggleComplete, isFavorite, toggleFavorite } = useProgress();
  const { t, language } = useLanguage();
  const [showShort, setShowShort] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    explanation: true, learningPath: false, example: true, foundry: false, challenge: true,
    hints: false, mistakes: false, best: false, checklist: false,
  });

  if (!exercise) return <div className="p-8 text-center text-muted-foreground">{t("exercise.notFound")}</div>;

  const completed = isCompleted(exercise.id);
  const favorite = isFavorite(exercise.id);
  const pt = language === "pt" ? exerciseTranslationsPT[exercise.id] : undefined;

  const toggle = (key: string) => setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const Section = ({ id, icon, title, children }: { id: string; icon: React.ReactNode; title: string; children: React.ReactNode }) => (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button onClick={() => toggle(id)} className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-display font-semibold text-sm">{title}</span>
        </div>
        {expandedSections[id] ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
      </button>
      {expandedSections[id] && <div className="px-4 pb-4 border-t border-border pt-4">{children}</div>}
    </div>
  );

  const levelColors: Record<string, string> = {
    beginner: "text-beginner border-beginner/30 bg-beginner/5",
    intermediate: "text-intermediate border-intermediate/30 bg-intermediate/5",
    advanced: "text-advanced border-advanced/30 bg-advanced/5",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-slide-in">
      <Link to="/exercises" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> {t("exercise.backToExercises")}
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${levelColors[exercise.level]}`}>
              {t(`level.${exercise.level}`)} #{exercise.order}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold">{exercise.title}</h1>
          <p className="text-muted-foreground mt-1">{exercise.concept}</p>
        </div>
        <button onClick={() => toggleFavorite(exercise.id)} className="p-2 rounded-lg hover:bg-secondary">
          <Star className={`w-5 h-5 ${favorite ? "fill-warning text-warning" : "text-muted-foreground"}`} />
        </button>
      </div>

      <div className="space-y-4">
        <Section id="explanation" icon={<Lightbulb className="w-4 h-4 text-warning" />} title={t("exercise.explanation")}>
          <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
            {exercise.explanation[language as "en" | "pt"] ?? exercise.explanation.en}
          </p>
        </Section>

        <Section id="learningPath" icon={<BookOpen className="w-4 h-4 text-success" />} title={t("exercise.learningPath")}>
          <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
            {exercise.learningPath?.[language as "en" | "pt"] ?? exercise.learningPath?.en}
          </p>
        </Section>

        <Section id="example" icon={<span className="text-primary font-mono text-sm">{"//"}</span>} title={t("exercise.example")}>
          <CodeBlock code={exercise.example} title="Example" />
        </Section>

        <Section id="foundry" icon={<span className="text-primary font-mono text-sm">$</span>} title={t("exercise.foundry")}>
          <CodeBlock code={exercise.foundryWorkflow} language="bash" title="Terminal" />
        </Section>

        <Section id="challenge" icon={<Award className="w-4 h-4 text-accent" />} title={t("exercise.challenge")}>
          <div className="text-sm text-foreground/80 leading-relaxed space-y-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
              {pt?.challenge ?? exercise.challenge}
            </ReactMarkdown>
          </div>
        </Section>

        <Section id="hints" icon={<Lightbulb className="w-4 h-4 text-info" />} title={t("exercise.hints")}>
          <ul className="space-y-2">
            {(pt?.hints ?? exercise.hints).map((h, i) => (
              <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                <span className="text-info mt-0.5">💡</span> {h}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="mistakes" icon={<AlertTriangle className="w-4 h-4 text-destructive" />} title={t("exercise.mistakes")}>
          <ul className="space-y-2">
            {(pt?.commonMistakes ?? exercise.commonMistakes).map((m, i) => (
              <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                <span className="text-destructive mt-0.5">⚠️</span> {m}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="best" icon={<CheckCircle2 className="w-4 h-4 text-primary" />} title={t("exercise.bestPractices")}>
          <ul className="space-y-2">
            {(pt?.bestPractices ?? exercise.bestPractices).map((b, i) => (
              <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span> {b}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="checklist" icon={<ListChecks className="w-4 h-4 text-primary" />} title={t("exercise.checklist")}>
          <ul className="space-y-2">
            {(pt?.checklist ?? exercise.checklist).map((c, i) => (
              <li key={i} className="text-sm text-foreground/80 flex items-center gap-2">
                <div className="w-4 h-4 rounded border border-border" /> {c}
              </li>
            ))}
          </ul>
        </Section>

        {/* Solutions */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <button onClick={() => setShowShort(!showShort)} className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
            <span className="font-display font-semibold text-sm">{t("exercise.shortSolution")}</span>
            {showShort ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {showShort && <div className="px-4 pb-4 border-t border-border pt-2"><CodeBlock code={exercise.shortSolution} /></div>}
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <button onClick={() => setShowFull(!showFull)} className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
            <span className="font-display font-semibold text-sm">{t("exercise.fullSolution")}</span>
            {showFull ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {showFull && <div className="px-4 pb-4 border-t border-border pt-2"><CodeBlock code={exercise.fullSolution} /></div>}
        </div>
      </div>

      {/* Complete button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => toggleComplete(exercise.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
            completed
              ? "bg-primary/10 text-primary border border-primary/30"
              : "bg-primary text-primary-foreground hover:opacity-90 glow-green"
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          {completed ? t("exercise.completed") : t("exercise.markComplete")}
        </button>
      </div>
    </div>
  );
}
