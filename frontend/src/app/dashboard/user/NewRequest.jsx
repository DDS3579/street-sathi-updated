import { useState } from "react";
import { toast } from "sonner";
import API from "@/services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, Camera, MapPin, Sparkles } from "lucide-react";
import LocationMap from "@/components/LocationMap";

const animalTypes = [
  { value: "dog", label: "🐕 Dog", icon: "🐕" },
  { value: "cat", label: "🐈 Cat", icon: "🐈" },
  { value: "cow", label: "🐄 Cow", icon: "🐄" },
  { value: "bird", label: "🦜 Bird", icon: "🦜" },
  { value: "rabbit", label: "🐰 Rabbit", icon: "🐰" },
  { value: "other", label: "❓ Other", icon: "❓" },
];

export default function NewRequest() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [animalType, setAnimalType] = useState("");
  const [description, setDescription] = useState("");
  const [locationText, setLocationText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeImageWithAI = async (imageDataUrl) => {
    try {
      setIsAnalyzing(true);
      toast.loading("AI analyzing image...", { id: "ai-analysis" });

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "HTTP-Referer": window.location.href,
            "X-Title": "Street Saathi",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "amazon/nova-2-lite-v1:free",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: "Describe this animal image for rescue: 1) Animal type/breed, 2) Condition (injured/healthy), 3) Urgency level, 4) Visible issues. Be concise.",
                  },
                  {
                    type: "image_url",
                    image_url: { url: imageDataUrl },
                  },
                ],
              },
            ],
            max_tokens: 500,
            temperature: 0.3,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      const aiDescription =
        result.choices?.[0]?.message?.content || "AI analysis unavailable";

      setDescription(aiDescription);
      toast.success("AI analysis complete!", {
        id: "ai-analysis",
        description: "Description auto-filled",
        duration: 3000,
      });
    } catch (error) {
      console.error("AI Error Details:", error);
      toast.error("AI analysis failed", {
        id: "ai-analysis",
        description: "Please check your API key and credits",
        duration: 4000,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setImagePreview(imageData);
        toast.success("Image uploaded successfully!");
        analyzeImageWithAI(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsDetectingLocation(true);
    toast.loading("Detecting your location...", { id: "location-detect" });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          const address =
            data.display_name ||
            `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

          setLocation({ lat: latitude, lng: longitude });
          setLocationText(address);

          toast.success("Location detected!", {
            id: "location-detect",
            description: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(
              4
            )}`,
          });
        } catch (error) {
          toast.error("Failed to get location address", {
            id: "location-detect",
          });
          setLocation({ lat: latitude, lng: longitude });
          setLocationText(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        toast.error("Failed to detect location", {
          id: "location-detect",
          description: "Please allow location permissions",
        });
        setIsDetectingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(1);

    if (!animalType) {
      toast.error("Please select an animal type");
      return;
    }

    if (!locationText) {
      toast.error("Please detect your location");
      return;
    }

    if (!selectedImage) {
      toast.error("Please upload an image");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Submitting your request...");

    try {
      console.log(2)
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("animalType", animalType);
      formData.append("urgencyState", "Major");
      formData.append("lat", location.lat);
      formData.append("long", location.lng);
      formData.append("severity", "Medium"); 
      formData.append("description", description);
      console.log(69);
      console.log(formData);

      const response = await API.post("/rescue/create", formData);
      console.log(response);
      console.log(4);
      toast.success("Request submitted!", {
        id: loadingToast,
        description: "Help is on the way for the animal",
        duration: 3000,
      });

      // Reset form
      setSelectedImage(null);
      setImagePreview(null);
      setAnimalType("");
      setDescription("");
      setLocation({ lat: null, lng: null });
      setLocationText("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Report Animal in Need
        </h1>
        <p className="text-muted-foreground">
          Help us rescue animals with visual context
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rescue Request Details</CardTitle>
          <CardDescription>
            Fill in details to help us respond quickly
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Upload Image (Required)</Label>
            <div
              className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() =>
                document.getElementById("animal-image-upload").click()
              }
            >
              <Input
                id="animal-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {imagePreview ? (
                <div className="space-y-3">
                  <img
                    src={imagePreview}
                    alt="Animal"
                    className="mx-auto max-h-48 rounded-lg object-cover border"
                  />
                  <p className="text-sm text-muted-foreground">
                    Click to change image
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-sm font-medium">Upload Animal Photo</p>
                  <p className="text-xs text-muted-foreground">
                    Max 5MB • JPG, PNG accepted
                  </p>
                </div>
              )}
              {isAnalyzing && (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  AI is analyzing the image...
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Animal Type</Label>
            <Select value={animalType} onValueChange={setAnimalType}>
              <SelectTrigger>
                <SelectValue placeholder="Select animal type" />
              </SelectTrigger>
              <SelectContent>
                {animalTypes.map((animal) => (
                  <SelectItem key={animal.value} value={animal.value}>
                    <span className="flex items-center gap-2">
                      <span className="text-xl">{animal.icon}</span>
                      {animal.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <Label>Location (Auto-detect for accuracy)</Label>

            <Button
              type="button"
              variant="outline"
              onClick={handleUseMyLocation}
              className="w-full"
              disabled={isDetectingLocation}
            >
              {isDetectingLocation ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Detecting Location...
                </>
              ) : (
                <>
                  <MapPin className="mr-2 h-4 w-4" />
                  Use My Location
                </>
              )}
            </Button>

            {location.lat && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">
                      {locationText}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Coordinates: {location.lat.toFixed(6)},{" "}
                      {location.lng.toFixed(6)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {location.lat && (
              <div className="mt-4">
                <Label>Location Map</Label>
                <LocationMap
                  lat={location.lat}
                  lng={location.lng}
                  address={locationText}
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Additional Details</Label>
            <Textarea
              id="description"
              placeholder="Describe the animal's condition, behavior, or any urgent needs..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            onClick={handleSubmit}
            disabled={
              isSubmitting || !selectedImage || !animalType || !locationText
            }
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Submitting Request..." : "Submit Rescue Request"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
