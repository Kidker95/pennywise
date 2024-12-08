import { useEffect, useState } from "react";
import { Modal, Typography, Button, Box } from "@mui/material";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import "./RequestStatusNotification.css";

export function RequestStatusNotification({ userId }: { userId: number }) {
    const [requestStatus, setRequestStatus] = useState(null);

    useEffect(() => {
        async function checkRequestStatus() {
            try {
                const status = await userService.getRequestStatus(userId);
                if (status) setRequestStatus(status);
            } catch (error) {
                notify.error("Failed to retrieve request status.");
            }
        }
        checkRequestStatus();
    }, [userId]);

    if (!requestStatus) return null;

    const message = requestStatus.requestStatus === "approved" 
        ? `${requestStatus.receiverName} approved your partner request!` 
        : `${requestStatus.receiverName} rejected your partner request.`;

    return (
        <Modal open={!!requestStatus} onClose={() => setRequestStatus(null)}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxWidth: '400px',
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 24,
                    p: 4,
                    textAlign: 'center'
                }}
            >
                <Typography>{message}</Typography>
                <Button onClick={() => setRequestStatus(null)} variant="contained" color="primary">
                    Close
                </Button>
            </Box>
        </Modal>
    );
}
