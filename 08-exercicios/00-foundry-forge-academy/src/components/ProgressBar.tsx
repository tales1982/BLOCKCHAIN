interface ProgressBarProps {
  percentage: number;
  color?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
}

export function ProgressBar({ percentage, color = "bg-primary", size = "md", showLabel = true, label }: ProgressBarProps) {
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm text-muted-foreground">{label}</span>}
          {showLabel && <span className="text-sm font-mono text-foreground">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full rounded-full bg-secondary ${heights[size]} overflow-hidden`}>
        <div
          className={`${heights[size]} rounded-full ${color} transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}
