import { useEffect, useState } from "react";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";

export function PendingRequests(): JSX.Element | null {
    const [request, setRequest] = useState<any>(null);
    const [hasPartner, setHasPartner] = useState<boolean>(false); // Track if the user has a partner

    useEffect(() => {
        async function fetchPendingRequests() {
            const userId = userService.getUserIdFromToken();
            if (!userId) {
                notify.error("User not logged in");
                return;
            }
    
            try {
                // Check if the user already has a partner
                const user = await userService.getUserDetails(userId);
                if (user.partnerId) {
                    setHasPartner(true);
                    return;
                }
    
                const pendingRequests = await userService.getPendingRequests(userId);
                console.log("Pending requests:", pendingRequests); // Debug log
    
                if (pendingRequests.length > 0) {
                    setRequest(pendingRequests[0]);
                    await handleRequestNotification(pendingRequests[0]);
                }
            } catch (error) {
                console.error("Failed to fetch pending requests:", error); // Debug log for errors
                notify.error("Failed to fetch pending requests.");
            }
        }
        fetchPendingRequests();
    }, []);
    
    async function handleRequestNotification(request: any) {
        try {
            const confirmed = await notify.confirm(
                `${request.requesterName} ${request.requesterLastName} invited you to share accounts. Do you accept?`
            );
    
            console.log("Confirmed:", confirmed); // Debug log to see if confirmation was captured
    
            if (confirmed) {
                await handleResponse(request, true);
            } else {
                await handleResponse(request, false);
            }
        } catch (error) {
            console.error("Error in handleRequestNotification:", error); // Debug log
        }
    }
    

    async function handleResponse(request: any, approved: boolean) {
        try {
            if (!request) return;
    
            console.log("Handling response for request ID:", request.id, "Approval:", approved); // Debug log
    
            const message = await userService.respondToRequest(request.id, approved);
    
            console.log("Backend response:", message); // Debug log to confirm backend response
            notify.success(message);
            setRequest(null); // Clear the request after responding
        } catch (error: any) {
            console.error("Error in handleResponse:", error); // Debug log for errors
            notify.error("Failed to process request.");
        }
    }
    
    

    // If the user already has a partner, return null (nothing to show)
    if (hasPartner) return null;

    if (!request) return null; // If no request, return null
    return null; // You can replace this with a component to show the pending request UI if needed
}
