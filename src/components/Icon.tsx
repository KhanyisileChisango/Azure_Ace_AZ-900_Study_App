import {
  Cloud,
  Network,
  ShieldCheck,
  BookOpen,
  LayoutDashboard,
  Brain,
  Layers,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Target,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Trash2,
  Trophy,
  Lightbulb,
  Building2,
  ListChecks,
  BookMarked,
  type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  Cloud,
  Network,
  ShieldCheck,
  BookOpen,
  LayoutDashboard,
  Brain,
  Layers,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Target,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Trash2,
  Trophy,
  Lightbulb,
  Building2,
  ListChecks,
  BookMarked,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} />;
}
