import { useListReferenceCharts } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Reference() {
  const { data: charts, isLoading } = useListReferenceCharts();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-display font-bold tracking-tight uppercase">Reference Charts</h2>
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (!charts || charts.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-display font-bold tracking-tight uppercase">Reference Charts</h2>
        <div className="p-8 text-center text-muted-foreground bg-card/30 border border-border rounded-lg">
          No reference charts available.
        </div>
      </div>
    );
  }

  // Group charts by process
  const processes = Array.from(new Set(charts.map(c => c.process)));

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-display font-bold tracking-tight uppercase">Reference Charts</h2>
        <p className="text-muted-foreground">Standard reference tables for common materials and processes.</p>
      </div>

      <Tabs defaultValue={processes[0]} className="w-full">
        <TabsList className="bg-card border border-border mb-6">
          {processes.map(process => (
            <TabsTrigger key={process} value={process} className="uppercase tracking-widest font-bold">
              {process}
            </TabsTrigger>
          ))}
        </TabsList>

        {processes.map(process => (
          <TabsContent key={process} value={process} className="space-y-6">
            {charts.filter(c => c.process === process).map(chart => (
              <Card key={chart.id} className="border-border/60 shadow-md overflow-hidden">
                <CardHeader className="bg-secondary/30 pb-4 border-b border-border/40">
                  <div className="flex justify-between items-center">
                    <CardTitle className="font-display font-bold text-xl uppercase">{chart.title || `${chart.material} Settings`}</CardTitle>
                    <Badge variant="outline" className="uppercase tracking-widest font-mono text-xs">{chart.material}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-card">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="uppercase font-bold tracking-wider text-xs">Thickness</TableHead>
                        <TableHead className="uppercase font-bold tracking-wider text-xs">Amperage</TableHead>
                        <TableHead className="uppercase font-bold tracking-wider text-xs">Voltage</TableHead>
                        <TableHead className="uppercase font-bold tracking-wider text-xs">Electrode</TableHead>
                        <TableHead className="uppercase font-bold tracking-wider text-xs text-right">Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {chart.entries.map((entry, idx) => (
                        <TableRow key={idx} className="border-border/30">
                          <TableCell className="font-mono font-bold text-primary">{entry.thicknessRange}</TableCell>
                          <TableCell className="font-mono">{entry.amperage}</TableCell>
                          <TableCell className="font-mono">{entry.voltage}</TableCell>
                          <TableCell className="font-mono">{entry.electrodeSize}</TableCell>
                          <TableCell className="text-right text-muted-foreground text-sm max-w-[200px] truncate" title={entry.notes || ""}>
                            {entry.notes || "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
