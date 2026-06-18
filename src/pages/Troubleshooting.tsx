import { useState, useMemo } from "react";
import { useListTroubleshootingTips } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, AlertCircle, Wrench, Info } from "lucide-react";

export default function Troubleshooting() {
  const { data: tips, isLoading } = useListTroubleshootingTips();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTips = useMemo(() => {
    if (!tips) return [];
    if (!searchTerm) return tips;
    const lower = searchTerm.toLowerCase();
    return tips.filter(tip => 
      tip.problem.toLowerCase().includes(lower) ||
      tip.causes.some(c => c.toLowerCase().includes(lower)) ||
      tip.solutions.some(s => s.toLowerCase().includes(lower))
    );
  }, [tips, searchTerm]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-display font-bold tracking-tight uppercase">Troubleshooting</h2>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-display font-bold tracking-tight uppercase">Troubleshooting</h2>
        <p className="text-muted-foreground">Identify defects and find their causes and solutions.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search for defects (e.g. porosity, undercut)..." 
          className="pl-10 h-12 text-lg bg-card/50 font-mono"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          data-testid="input-search-tips"
        />
      </div>

      {filteredTips.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl bg-card/30">
          <Info className="h-10 w-10 mx-auto mb-2 opacity-50" />
          <p className="font-bold uppercase tracking-wider">No results found</p>
          <p className="text-sm mt-1">Try searching for a different defect or symptom.</p>
        </div>
      ) : (
        <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
          <Accordion type="multiple" className="w-full">
            {filteredTips.map((tip) => (
              <AccordionItem key={tip.id} value={tip.id} className="border-border/40 px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3 text-left">
                    <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                    <span className="font-display font-bold text-lg uppercase tracking-wide">{tip.problem}</span>
                    <div className="hidden sm:flex gap-1 ml-4">
                      {tip.affectedProcesses?.map(p => (
                        <Badge key={p} variant="secondary" className="text-[10px] uppercase tracking-widest">{p}</Badge>
                      ))}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-2">
                  <div className="grid md:grid-cols-2 gap-6 pl-8">
                    <div className="space-y-3 bg-secondary/20 p-4 rounded-md border border-secondary/30">
                      <h4 className="font-bold uppercase text-xs tracking-widest text-muted-foreground flex items-center gap-2">
                        <AlertCircle className="h-3 w-3" /> Common Causes
                      </h4>
                      <ul className="space-y-2">
                        {tip.causes.map((cause, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span className="text-destructive mt-0.5 font-bold">•</span> {cause}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3 bg-primary/5 p-4 rounded-md border border-primary/20">
                      <h4 className="font-bold uppercase text-xs tracking-widest text-primary flex items-center gap-2">
                        <Wrench className="h-3 w-3" /> Solutions
                      </h4>
                      <ul className="space-y-2">
                        {tip.solutions.map((solution, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span className="text-primary mt-0.5 font-bold">•</span> {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
