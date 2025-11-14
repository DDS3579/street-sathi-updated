import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plus } from "lucide-react";

export default function Locations() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Saved Locations</h1>
        <p className="text-muted-foreground">Quick access to frequently visited places</p>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Saved Locations</CardTitle>
            <CardDescription>Your saved addresses</CardDescription>
          </div>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Location
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Home</p>
                <p className="text-sm text-muted-foreground"></p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Work</p>
                <p className="text-sm text-muted-foreground"></p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}