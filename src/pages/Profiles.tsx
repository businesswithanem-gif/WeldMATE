import { useListProfiles, useUpdateProfile, useDeleteProfile, getListProfilesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Trash2, Clock, MapPin, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function Profiles() {
  const { data: profiles, isLoading } = useListProfiles();
  const updateProfile = useUpdateProfile();
  const deleteProfile = useDeleteProfile();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const toggleFavorite = (id: number, currentFav: boolean) => {
    updateProfile.mutate({ id, data: { isFavorite: !currentFav } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListProfilesQueryKey() });
      }
    });
  };

  const removeProfile = (id: number) => {
    if (!confirm("Are you sure you want to delete this profile?")) return;
    
    deleteProfile.mutate({ id }, {
      onSuccess: () => {
        toast({ title: "Profile deleted" });
        queryClient.invalidateQueries({ queryKey: getListProfilesQueryKey() });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-display font-bold tracking-tight uppercase">Saved Profiles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4].map(i => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const sortedProfiles = [...(profiles || [])].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-display font-bold tracking-tight uppercase">Saved Profiles</h2>
        <p className="text-muted-foreground">Quickly access your frequent or complex job setups.</p>
      </div>

      {sortedProfiles.length === 0 ? (
        <div className="border-2 border-dashed border-border rounded-xl p-12 text-center bg-card/30">
          <p className="font-display font-bold text-xl uppercase tracking-wider mb-2">No Profiles Found</p>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">Generate a recommendation on the Dashboard and click Save Profile to store it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProfiles.map((profile) => (
            <Card key={profile.id} className="flex flex-col h-full bg-card/80 border-border/60 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-bold font-display uppercase tracking-wide">
                      {profile.name}
                    </CardTitle>
                    <CardDescription className="font-mono text-xs flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {format(new Date(profile.createdAt), "MMM d, yyyy")}
                    </CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`h-8 w-8 -mt-2 -mr-2 ${profile.isFavorite ? 'text-yellow-500' : 'text-muted-foreground'}`}
                    onClick={() => toggleFavorite(profile.id, !!profile.isFavorite)}
                    data-testid={`btn-fav-${profile.id}`}
                  >
                    <Star className="h-5 w-5" fill={profile.isFavorite ? "currentColor" : "none"} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pb-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="uppercase text-[10px] tracking-widest">{profile.inputs.process}</Badge>
                  <Badge variant="outline" className="uppercase text-[10px] tracking-widest">{profile.inputs.material}</Badge>
                  <Badge variant="outline" className="uppercase text-[10px] tracking-widest">{profile.inputs.thicknessMm}mm</Badge>
                </div>
                
                <div className="bg-background/50 rounded-md p-3 border border-border/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <Zap className="h-3 w-3" /> Amperage
                    </span>
                    <span className="font-mono font-bold text-primary">
                      {profile.recommendation.amperageMin}-{profile.recommendation.amperageMax} A
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <Zap className="h-3 w-3" /> Voltage
                    </span>
                    <span className="font-mono font-bold text-primary">
                      {profile.recommendation.voltageMin}-{profile.recommendation.voltageMax} V
                    </span>
                  </div>
                </div>

                {profile.description && (
                  <p className="mt-4 text-sm text-muted-foreground line-clamp-2 italic">
                    "{profile.description}"
                  </p>
                )}
              </CardContent>
              <CardFooter className="pt-0 flex justify-between gap-2 border-t border-border/30 px-6 py-4 mt-auto">
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 px-2" onClick={() => removeProfile(profile.id)} data-testid={`btn-delete-${profile.id}`}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button size="sm" className="uppercase tracking-widest font-bold text-xs" variant="secondary" onClick={() => {
                  toast({ title: "Profile Selected", description: "Not implemented in this mockup, would load into form." });
                }} data-testid={`btn-load-${profile.id}`}>
                  Load Profile
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
