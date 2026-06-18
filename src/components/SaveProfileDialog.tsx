import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { WeldingInput, WeldingRecommendation, useCreateProfile, getListProfilesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().max(500).optional(),
  isFavorite: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  inputs: WeldingInput;
  recommendation: WeldingRecommendation;
}

export function SaveProfileDialog({ inputs, recommendation }: Props) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: `${inputs.process} - ${inputs.material} ${inputs.thicknessMm}mm`,
      description: "",
      isFavorite: false,
    },
  });

  const createProfile = useCreateProfile();

  const onSubmit = (data: FormValues) => {
    createProfile.mutate({
      data: {
        name: data.name,
        description: data.description || null,
        isFavorite: data.isFavorite,
        inputs,
        recommendation,
      }
    }, {
      onSuccess: () => {
        toast({ title: "Profile saved successfully" });
        queryClient.invalidateQueries({ queryKey: getListProfilesQueryKey() });
        setOpen(false);
        form.reset();
      },
      onError: () => {
        toast({ title: "Failed to save profile", variant: "destructive" });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto" variant="secondary" data-testid="button-save-profile-trigger">
          <Save className="h-4 w-4 mr-2" /> Save Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Job Profile</DialogTitle>
          <DialogDescription>
            Save these settings to quickly load them later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 1/4 inch Aluminum TIG" {...field} data-testid="input-profile-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description / Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any specific details for this job..." {...field} data-testid="input-profile-desc" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFavorite"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Mark as Favorite</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      data-testid="toggle-profile-favorite"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={createProfile.isPending} data-testid="button-save-profile-submit">
                {createProfile.isPending ? "Saving..." : "Save Profile"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
