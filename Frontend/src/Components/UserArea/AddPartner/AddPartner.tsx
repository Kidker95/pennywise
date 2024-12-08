import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { notify } from "../../../Utils/Notify";
import { userService } from "../../../Services/UserService";
import "./AddPartner.css";

export function AddPartner(): JSX.Element {
    const [email, setEmail] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSendRequest = async () => {
        if (!email) {
            notify.error("Please enter an email address.");
            return;
        }

        try {
            const message = await userService.requestPartner(email);
            notify.success(message);
            setEmail(""); // Clear input on success
        } catch (error: any) {
            notify.error(error.message || "Failed to send request.");
        }
    };

    return (
        <Container maxWidth="sm" className="AddPartner">
            <Box className="content-box">
                <Typography variant="h4" gutterBottom className="title">
                    Add Partner
                </Typography>
                <TextField
                    label="Enter partner's email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={handleInputChange}
                    className="partner-input"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendRequest}
                    className="send-button"
                >
                    Send Request
                </Button>
            </Box>
        </Container>
    );
}
