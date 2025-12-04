import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import API from "@/services/api";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Plus,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  Eye,
  Download,
  RefreshCw,
  MessageSquare,
  Star,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const mockStats = {
  activeRequests: 3,
  completedRequests: 28,
  totalRequests: 31,
  pendingReviews: 2,
};

const mockRequests = [
  {
    id: "#REQ-2025-001",
    type: "Dog Rescue",
    location: "Sorhakhutte, Kathmandu",
    status: "in-progress",
    assignedTo: "Rajesh Babu Shrestha",
    created: "2 hours ago",
    priority: "high",
  },
  {
    id: "#REQ-2025-002",
    type: "Accident of Cow",
    location: "Samakhushi, Kathmandu",
    status: "pending",
    assignedTo: "TBD",
    created: "5 hours ago",
    priority: "medium",
  },
  {
    id: "#REQ-2025-003",
    type: "Cat Rescue",
    location: "Gongabu, Kathmandu",
    status: "completed",
    assignedTo: "Anita Basnet",
    created: "2 days ago",
    priority: "urgent",
  },
  {
    id: "#REQ-2025-004",
    type: "Death of Stray Dog",
    location: "Paknajol, Kathmandu",
    status: "completed",
    assignedTo: "Sanjay Gupta",
    created: "3 days ago",
    priority: "low",
  },
];

export default function User() {
  const { user, logout } = useAuth();
  const auth = useSelector((state) => state.auth);
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({
    activeRequests: 0,
    completedRequests: 0,
    totalRequests: 0,
  });

  const [showNewRequest, setShowNewRequest] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [requestType, setRequestType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("medium");

  // const handleCreateRequest = async (e) => {
  //   e.preventDefault();

  //   if (!requestType || !location) {
  //     toast.error("Please fill in all required fields");
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   const loadingToast = toast.loading("Submitting your request...");

  //   setTimeout(() => {
  //     const newRequest = {
  //       id: `#REQ-2024-${Date.now().toString().slice(-4)}`,
  //       type: requestType,
  //       location: location,
  //       status: "pending",
  //       assignedTo: "Not yet assigned",
  //       created: "Just now",
  //       priority: urgency,
  //     };

  //     setRequests([newRequest, ...requests]);
  //     setShowNewRequest(false);
  //     setIsSubmitting(false);

  //     mockStats.activeRequests += 1;
  //     mockStats.totalRequests += 1;

  //     setRequestType("");
  //     setLocation("");
  //     setDescription("");
  //     setUrgency("medium");

  //     toast.success("Request submitted successfully!", {
  //       id: loadingToast,
  //       description: "A rescuer will be assigned to you shortly",
  //       duration: 4000,
  //       action: {
  //         label: "View",
  //         onClick: () => console.log("View request"),
  //       },
  //     });
  //   }, 2000);
  // };

  const handleCreateRequest = async (e) => {
    e.preventDefault();

    if (!requestType || !location) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Submitting your request...");

    try {
      // This is a simplified version - adapt to your backend
      const formData = new FormData();
      formData.append("animalType", requestType);
      formData.append("lat", "27.7172"); // Get real coords
      formData.append("long", "85.3240");
      formData.append("urgencyState", urgency);

      const response = await API.post("/rescue/create", formData);

      toast.success("Request submitted successfully!", {
        id: loadingToast,
        description: "A rescuer will be assigned to you shortly",
        duration: 4000,
      });

      // Refresh requests
      fetchDashboardData();
      setShowNewRequest(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchDashboardData();
    }
  }, [user?.id]);

  const fetchDashboardData = async () => {
    try {
      const [allRes, activeRes, completedRes] = await Promise.all([
        API.get(`/rescue/all-requests-user/${user.id}`),
        API.get(`/rescue/active-requests-user/${user.id}`),
        API.get(`/rescue/completed-requests-user/${user.id}`),
      ]);

      setRequests(allRes.data.data || []);
      setStats({
        activeRequests: activeRes.data.data?.number || 0,
        completedRequests: completedRes.data.data?.number || 0,
        totalRequests: allRes.data.data?.length || 0,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  const handleQuickAction = (action) => {
    toast.info(`${action} feature`, {
      description: "This feature is being developed",
    });
  };

  const handleLogout = () => {
    toast.success("Logged out successfully", {
      description: "Redirecting to home page...",
    });
    setTimeout(() => logout(), 1000);
  };

  if (auth.isLoading) {
    return (
      <div className="space-y-6">
        <StatsSkeleton />
        <TableSkeleton rows={3} />
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name}! Get help or track your requests.
          </p>
        </div>
        <Dialog open={showNewRequest} onOpenChange={setShowNewRequest}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Help Request</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateRequest} className="space-y-4 pt-4">
              <div>
                <Label htmlFor="requestType">What do you need help with?</Label>
                <Select
                  value={requestType}
                  onValueChange={setRequestType}
                  required
                >
                  <SelectTrigger id="requestType">
                    <SelectValue placeholder="Select request type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Medical Aid">Medical Aid</SelectItem>
                    <SelectItem value="Food & Shelter">
                      Food & Shelter
                    </SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                    <SelectItem value="Transportation">
                      Transportation
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Your Current Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. Connaught Place, Delhi"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select value={urgency} onValueChange={setUrgency}>
                  <SelectTrigger id="urgency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - No rush</SelectItem>
                    <SelectItem value="medium">
                      Medium - Within few hours
                    </SelectItem>
                    <SelectItem value="high">
                      High - As soon as possible
                    </SelectItem>
                    <SelectItem value="urgent">
                      Urgent - Immediate help needed
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Additional Details</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your situation in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Active Requests
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {mockStats.activeRequests}
            </div>
            <p className="text-xs text-blue-700">Being processed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">
              Completed
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {mockStats.completedRequests}
            </div>
            <p className="text-xs text-green-700">Successfully helped</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Total Requests
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {mockStats.totalRequests}
            </div>
            <p className="text-xs text-purple-700">Since you joined</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">
              Rate & Review
            </CardTitle>
            <Star className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {mockStats.pendingReviews}
            </div>
            <p className="text-xs text-orange-700">Pending reviews</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>My Requests</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/user/history">View All</Link>
            </Button>
          </div>
          <CardDescription>Track all your help requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-mono text-sm font-medium">
                    {request.id}
                  </TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    {request.location}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${getStatusColor(
                        request.status
                      )} px-2 py-1 text-xs`}
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {request.assignedTo
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{request.assignedTo}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {request.created}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${getPriorityColor(
                        request.priority
                      )} text-white px-2 py-1 text-xs`}
                    >
                      {request.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => handleQuickAction("Contact Rescuer")}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Rescuer
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => handleQuickAction("Emergency Hotline")}
          >
            <Phone className="mr-2 h-4 w-4" />
            Emergency Hotline
          </Button>
          <Button
            variant="destructive"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
