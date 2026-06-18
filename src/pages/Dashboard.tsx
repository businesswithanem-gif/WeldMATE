import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetRecommendation, WeldingInput, WeldingRecommendation } from "@workspace/api-client-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Calculator, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  PROCESSES,
  MATERIALS,
  MATERIAL_GROUPS,
  JOINT_TYPES,
  POSITIONS,
  SHIELDING_GASES,
  ELECTRODES,
  THICKNESS_MM,
} from "@/lib/constants";
import { RecommendationDisplay } from "@/components/RecommendationDisplay";
import { SaveProfileDialog } from "@/components/SaveProfileDialog";

const formSchema = z.object({
  process: z.string().min(1, "Required"),
  material: z.string().min(1, "Required"),
  materialB: z.string().nullable().optional(),
  thicknessMm: z.number().min(0.1, "Required"),
  jointType: z.string().min(1, "Required"),
  position: z.string().min(1, "Required"),
  shieldingGas: z.string().nullable().optional(),
  electrodeType: z.string().nullable().optional(),
});

type FormValues = z.infer<typeof formSchema>;

function MaterialSelect({
  value,
  onChange,
  testId,
  placeholder = "Select material",
}: {
  value: string;
  onChange: (v: string) => void;
  testId: string;
  placeholder?: string;
}) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger data-testid={testId}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {MATERIAL_GROUPS.map((group) => {
          const items = MATERIALS.filter((m) => m.group === group);
          return (
            <SelectGroup key={group}>
              <SelectLabel className="text-xs text-muted-foreground uppercase tracking-wider px-2 py-1">
                {group}
              </SelectLabel>
              {items.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectGroup>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default function Dashboard() {
  const [recommendation, setRecommendation] = useState<{
    inputs: WeldingInput;
    result: WeldingRecommendation;
  } | null>(null);
  const [dissimilar, setDissimilar] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      process: "MIG",
      material: "mild_steel",
      materialB: null,
      thicknessMm: 3.2,
      jointType: "butt",
      position: "flat",
      shieldingGas: "75ar_25co2",
      electrodeType: "auto",
    },
  });

  const getRecommendation = useGetRecommendation();
  const processValue = form.watch("process");
  const materialAValue = form.watch("material");

  const onSubmit = (data: FormValues) => {
    const payload: WeldingInput = {
      process: data.process,
      material: data.material,
      materialB: dissimilar && data.materialB ? data.materialB : null,
      thicknessMm: data.thicknessMm,
      jointType: data.jointType,
      position: data.position,
      shieldingGas: data.shieldingGas === "none" ? null : (data.shieldingGas ?? null),
      electrodeType:
        !data.electrodeType || data.electrodeType === "auto" || data.electrodeType === "none"
          ? null
          : data.electrodeType,
    };

    getRecommendation.mutate(
      { data: payload },
      {
        onSuccess: (result) => {
          setRecommendation({ inputs: payload, result });
          toast({ title: "Settings Calculated", description: "Optimal settings generated." });
        },
        onError: () => {
          toast({
            title: "Calculation Failed",
            description: "Check your inputs and try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  // Electrodes filtered for the selected process, always include auto
  const filteredElectrodes = ELECTRODES.filter(
    (e) => e.value === "auto" || e.process.includes(processValue)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-display font-bold tracking-tight uppercase">Calculator</h2>
        <p className="text-muted-foreground">
          Enter job details — WeldMATE recommends optimal settings and the right electrode.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* ── FORM ── */}
        <div className="lg:col-span-5 space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="uppercase tracking-widest text-sm text-primary">
                Job Parameters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                  {/* Process */}
                  <FormField
                    control={form.control}
                    name="process"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Welding Process</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-process">
                              <SelectValue placeholder="Select process" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PROCESSES.map((p) => (
                              <SelectItem key={p.value} value={p.value}>
                                {p.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Material A */}
                  <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{dissimilar ? "Base Material A" : "Base Material"}</FormLabel>
                        <FormControl>
                          <MaterialSelect
                            value={field.value}
                            onChange={field.onChange}
                            testId="select-material"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Dissimilar welding toggle */}
                  <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Shuffle className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Dissimilar Metal Welding</p>
                        <p className="text-xs text-muted-foreground">Joining two different materials</p>
                      </div>
                    </div>
                    <Switch
                      checked={dissimilar}
                      onCheckedChange={(v) => {
                        setDissimilar(v);
                        if (!v) form.setValue("materialB", null);
                      }}
                      data-testid="toggle-dissimilar"
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>

                  {/* Material B (dissimilar) */}
                  {dissimilar && (
                    <FormField
                      control={form.control}
                      name="materialB"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Base Material B</FormLabel>
                          <FormControl>
                            <MaterialSelect
                              value={field.value ?? ""}
                              onChange={field.onChange}
                              testId="select-material-b"
                              placeholder="Select second material"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Thickness */}
                  <FormField
                    control={form.control}
                    name="thicknessMm"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center mb-1">
                          <FormLabel>Thickness</FormLabel>
                          <span className="text-sm font-mono text-primary font-bold">
                            {field.value} mm
                          </span>
                        </div>
                        <FormControl>
                          <Select
                            onValueChange={(val) => field.onChange(parseFloat(val))}
                            value={field.value.toString()}
                          >
                            <SelectTrigger data-testid="select-thickness">
                              <SelectValue placeholder="Select thickness" />
                            </SelectTrigger>
                            <SelectContent>
                              {THICKNESS_MM.map((t) => (
                                <SelectItem key={t.value} value={t.value.toString()}>
                                  {t.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Joint + Position */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="jointType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Joint Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-joint">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {JOINT_TYPES.map((p) => (
                                <SelectItem key={p.value} value={p.value}>
                                  {p.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-position">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {POSITIONS.map((p) => (
                                <SelectItem key={p.value} value={p.value}>
                                  {p.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Shielding Gas (MIG/TIG/FCAW) */}
                  {(processValue === "MIG" || processValue === "TIG" || processValue === "FCAW") && (
                    <FormField
                      control={form.control}
                      name="shieldingGas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shielding Gas</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value ?? "none"}>
                            <FormControl>
                              <SelectTrigger data-testid="select-gas">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {SHIELDING_GASES.map((p) => (
                                <SelectItem key={p.value} value={p.value}>
                                  {p.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Electrode override */}
                  <FormField
                    control={form.control}
                    name="electrodeType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Electrode / Filler Wire
                          <span className="ml-2 text-xs font-normal text-primary">
                            (Auto-Recommend by default)
                          </span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value ?? "auto"}>
                          <FormControl>
                            <SelectTrigger data-testid="select-electrode">
                              <SelectValue placeholder="Auto-Recommend" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filteredElectrodes.map((e) => (
                              <SelectItem key={e.value} value={e.value}>
                                {e.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1">
                          Leave on Auto to let WeldMATE choose the best electrode for your job.
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full text-md font-bold uppercase tracking-widest h-12"
                    disabled={getRecommendation.isPending}
                    data-testid="button-calculate"
                  >
                    {getRecommendation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="mr-2 h-5 w-5" /> Get Settings
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* ── RESULTS ── */}
        <div className="lg:col-span-7">
          {recommendation ? (
            <div className="space-y-6">
              <div className="flex flex-wrap justify-between items-start gap-3 bg-card p-4 rounded-lg border border-border">
                <div>
                  <h3 className="font-display font-bold text-lg uppercase">Results Generated</h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    {recommendation.inputs.process} &bull;{" "}
                    {recommendation.inputs.material.replace(/_/g, " ")}
                    {recommendation.inputs.materialB
                      ? ` + ${recommendation.inputs.materialB.replace(/_/g, " ")}`
                      : ""}{" "}
                    &bull; {recommendation.inputs.thicknessMm}mm
                  </p>
                </div>
                <SaveProfileDialog
                  inputs={recommendation.inputs}
                  recommendation={recommendation.result}
                />
              </div>
              <RecommendationDisplay recommendation={recommendation.result} />
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground p-8 text-center bg-card/30">
              <Calculator className="h-16 w-16 mb-4 opacity-20" />
              <p className="font-display font-bold text-xl uppercase tracking-wider mb-2">
                No Parameters Generated
              </p>
              <p className="text-sm max-w-sm">
                Fill in the job parameters and click Get Settings. WeldMATE will recommend the
                optimal electrode, amperage, voltage, and more.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
