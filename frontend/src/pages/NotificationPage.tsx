import {
  Bell,
  Clock,
  MessageSquare,
  Users,
  Check,
  Loader2,
  UserPlus,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNotification } from "@/hooks/useNotificaiton";

const NotificationsPage = () => {
  const {
    incomingRequests,
    acceptedRequests,
    isLoading,
    acceptRequest,
    isAccepting,
    acceptError
  } = useNotification();

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const NoNotificationsFound = () => (
    <Card className="border-dashed border-2 border-muted-foreground/25">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Bell className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
        <p className="text-muted-foreground max-w-sm">
          When you receive friend requests or new connections, they'll appear here.
        </p>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl p-6">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto max-w-4xl p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with your language learning connections
          </p>
        </div>
        {incomingRequests.length + acceptedRequests.length > 0 && (
          <Badge variant="outline" className="text-sm">
            {incomingRequests.length + acceptedRequests.length} new
          </Badge>
        )}
      </div>

      {acceptError && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            There was an error processing your request. Please try again.
          </AlertDescription>
        </Alert>
      )}

      {incomingRequests.length > 0 && (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Friend Requests
              <Badge className="ml-auto bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900">
                {incomingRequests.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {incomingRequests.map((request, index) => (
              <div key={request._id}>
                <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 hover:shadow-md dark:hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 ring-2 ring-blue-200 dark:ring-blue-700">
                      <AvatarImage 
                        src={request.sender.profilePic} 
                        alt={request.sender.fullName} 
                      />
                      <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                        {getInitials(request.sender.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{request.sender.fullName}</h3>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">
                          Native: {request.sender.nativeLanguage}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Learning: {request.sender.learningLanguage}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => acceptRequest(request._id)}
                    disabled={isAccepting}
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white shadow-sm"
                  >
                    {isAccepting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Accepting...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Accept
                      </>
                    )}
                  </Button>
                </div>
                {index < incomingRequests.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {acceptedRequests.length > 0 && (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
              New Connections
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {acceptedRequests.map((notification, index) => (
              <div key={notification._id}>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
                  <Avatar className="h-12 w-12 ring-2 ring-green-200 dark:ring-green-700 mt-1">
                    <AvatarImage 
                      src={notification.recipient.profilePic} 
                      alt={notification.recipient.fullName} 
                    />
                    <AvatarFallback className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                      {getInitials(notification.recipient.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg">{notification.recipient.fullName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {notification.recipient.fullName} accepted your friend request
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      Recently
                    </div>
                  </div>

                  <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    New Friend
                  </Badge>
                </div>
                {index < acceptedRequests.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {incomingRequests.length === 0 && acceptedRequests.length === 0 && <NoNotificationsFound />}
      </div>
    </div>
  );
};

export default NotificationsPage;
