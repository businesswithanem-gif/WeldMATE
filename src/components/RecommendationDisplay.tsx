import { WeldingRecommendation } from "@workspace/api-client-react";
import { useUnits } from "@/hooks/use-units";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Lightbulb,
  Zap,
  Activity,
  Wind,
  Clock,
  ArrowRight,
  FlaskConical,
  CheckCircle2,
  Shuffle,
} from "lucide-react";

interface Props {
  recommendation: WeldingRecommendation;
}

export function RecommendationDisplay({ recommendation }: Props) {
  const { formatSpeed, formatGas } = useUnits();

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Mixed material banner */}
      {recommendation.isMixedMaterial && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 border border-accent/30">
          <Shuffle className="h-5 w-5 text-accent shrink-0" />
          <p className="text-sm font-medium text-accent">
            Dissimilar metal welding — electrode selected for cross-material compatibility
          </p>
        </div>
      )}

      {/* ── ELECTRODE RECOMMENDATION ── */}
      <div
        className="rounded-xl border border-primary/30 bg-primary/5 overflow-hidden"
        data-testid="electrode-recommendation-panel"
      >
        <div className="flex items-center gap-3 px-5 py-3 border-b border-primary/20 bg-primary/10">
          <FlaskConical className="h-5 w-5 text-primary" />
          <span className="text-sm font-bold uppercase tracking-widest text-primary">
            Electrode / Filler Wire Recommendation
          </span>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex flex-wrap items-start gap-3">
            <div className="flex-1 min-w-0">
              <p
                className="text-xl font-display font-bold text-foreground tracking-wide"
                data-testid="rec-electrode-is"
              >
                {recommendation.electrodeRecommendation.isDesignation}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {recommendation.electrodeRecommendation.description}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <Badge
                variant="outline"
                className="font-mono text-xs border-primary/40 text-primary"
                data-testid="rec-electrode-aws"
              >
                AWS: {recommendation.electrodeRecommendation.awsDesignation}
              </Badge>
              <Badge
                variant="secondary"
                className="font-mono text-[10px] uppercase tracking-wider"
                data-testid="rec-electrode-series"
              >
                {recommendation.electrodeRecommendation.seriesName}
              </Badge>
            </div>
          </div>

          {/* Rationale */}
          <div className="bg-background/50 border border-border rounded-lg p-4">
            <p className="text-xs uppercase text-muted-foreground font-medium tracking-wide mb-1.5">
              Why this electrode?
            </p>
            <p
              className="text-sm text-foreground/90 leading-relaxed"
              data-testid="rec-electrode-rationale"
            >
              {recommendation.electrodeRecommendation.rationale}
            </p>
          </div>

          {/* Alternatives */}
          {recommendation.alternativeElectrodes && recommendation.alternativeElectrodes.length > 0 && (
            <div>
              <p className="text-xs uppercase text-muted-foreground font-medium tracking-wide mb-2">
                Alternatives
              </p>
              <div className="space-y-2">
                {recommendation.alternativeElectrodes.map((alt, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-secondary/30 border border-border rounded-md px-3 py-2.5"
                    data-testid={`rec-alt-electrode-${i}`}
                  >
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <span className="font-mono text-sm font-semibold text-foreground">
                        {alt.isDesignation}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        ({alt.awsDesignation})
                      </span>
                      <p className="text-xs text-muted-foreground mt-0.5">{alt.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MACHINE SETTINGS GRID ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-card/50 border-primary/20 shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs uppercase text-muted-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" /> Amperage
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-mono font-bold" data-testid="rec-amperage">
              {recommendation.amperageMin}–{recommendation.amperageMax}
              <span className="text-sm font-normal text-muted-foreground ml-1">A</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-primary/20 shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs uppercase text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" /> Voltage
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-mono font-bold" data-testid="rec-voltage">
              {recommendation.voltageMin}–{recommendation.voltageMax}
              <span className="text-sm font-normal text-muted-foreground ml-1">V</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs uppercase text-muted-foreground flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-primary" /> Polarity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-mono font-bold" data-testid="rec-polarity">
              {recommendation.polarity}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs uppercase text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" /> Travel Speed
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-lg font-mono font-bold" data-testid="rec-travel-speed">
              {formatSpeed(recommendation.travelSpeedMin)}–{formatSpeed(recommendation.travelSpeedMax)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── SECONDARY SETTINGS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {recommendation.wireFeedSpeedMin != null && recommendation.wireFeedSpeedMax != null && (
          <Card className="bg-card/50 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-xs uppercase text-muted-foreground flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" /> Wire Feed Speed
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-xl font-mono font-bold" data-testid="rec-wfs">
                {recommendation.wireFeedSpeedMin}–{recommendation.wireFeedSpeedMax}
                <span className="text-sm font-normal text-muted-foreground ml-1">m/min</span>
              </div>
            </CardContent>
          </Card>
        )}

        {recommendation.gasFlowRateLpm != null && (
          <Card className="bg-card/50 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-xs uppercase text-muted-foreground flex items-center gap-2">
                <Wind className="h-4 w-4 text-primary" /> Gas Flow Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-xl font-mono font-bold" data-testid="rec-gas">
                {formatGas(recommendation.gasFlowRateLpm)}
              </div>
            </CardContent>
          </Card>
        )}

        {recommendation.electrodeSize && (
          <Card className="bg-card/50 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-xs uppercase text-muted-foreground flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" /> Electrode Size
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-base font-mono font-bold leading-tight" data-testid="rec-electrode-size">
                {recommendation.electrodeSize}
              </div>
            </CardContent>
          </Card>
        )}

        {recommendation.fillerRodSize && (
          <Card className="bg-card/50 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-xs uppercase text-muted-foreground flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" /> Filler Rod
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-base font-mono font-bold leading-tight" data-testid="rec-filler">
                {recommendation.fillerRodSize}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Skill level badge */}
      <div className="flex gap-2 items-center">
        <Badge
          variant={
            recommendation.skillLevel === "advanced"
              ? "destructive"
              : recommendation.skillLevel === "intermediate"
              ? "outline"
              : "secondary"
          }
          className="uppercase tracking-widest text-[10px]"
          data-testid="rec-skill-level"
        >
          Skill: {recommendation.skillLevel}
        </Badge>
      </div>

      {/* Warnings */}
      {recommendation.warnings && recommendation.warnings.length > 0 && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 text-destructive font-bold text-sm uppercase">
            <AlertTriangle className="h-4 w-4" /> Warnings
          </div>
          <ul className="space-y-1.5">
            {recommendation.warnings.map((w, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground/90"
                data-testid={`rec-warning-${i}`}
              >
                <AlertTriangle className="h-3.5 w-3.5 text-destructive mt-0.5 shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pro Tips */}
      {recommendation.tips && recommendation.tips.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase">
            <Lightbulb className="h-4 w-4" /> Pro Tips
          </div>
          <ul className="space-y-1.5">
            {recommendation.tips.map((t, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground/90"
                data-testid={`rec-tip-${i}`}
              >
                <Lightbulb className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
