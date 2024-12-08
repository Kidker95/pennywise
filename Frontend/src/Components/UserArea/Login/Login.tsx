// import { Box, Button, Container, TextField, Typography } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { CredentialsModel } from "../../../Models/CredentialsModel";
// import { expenseActions } from "../../../Redux/ExpenseSlice";
// import { userActions } from "../../../Redux/UserSlice";
// import { expenseService } from "../../../Services/ExpenseService";
// import { userService } from "../../../Services/UserService";
// import { notify } from "../../../Utils/Notify";
// import "./Login.css";

// export function Login(): JSX.Element {
//     const { register, handleSubmit, formState: { errors }, setError } = useForm<CredentialsModel>();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     async function fetchExpenses() {
//         try {
//             const allExpenses = await expenseService.getAllExpenses();
//             dispatch(expenseActions.initExpenses(allExpenses)); // Dispatch expenses to Redux store
//         } catch (err: any) {
//             notify.error("Failed to fetch expenses.");
//         }
//     }

//     async function send(credentials: CredentialsModel) {
//         try {
//             await userService.login(credentials);
//             dispatch(userActions.initUser()); // Set logged-in state
//             await fetchExpenses(); // Fetch and store expenses
//             const targetUrl = sessionStorage.getItem("targetUrl") || "/personal";
//             navigate(targetUrl);
//             notify.success("You are logged in!");
//         } catch (err: any) {
//             setError("password", { type: "manual", message: "Password or Email incorrect" });
//             setError("email", { type: "manual", message: "Password or Email incorrect" });
//             notify.error("Password or Email incorrect");
//         }
//     }

//     return (
//         <Container maxWidth="xs">
//             <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 <Typography component="h1" variant="h5" sx={{ mb: 2 }}>Login</Typography>
//                 <form onSubmit={handleSubmit(send)} noValidate>
//                     <TextField
//                         label="Email"
//                         type="email"
//                         fullWidth
//                         margin="normal"
//                         {...register("email", { 
//                             required: "Email is required", 
//                             pattern: {
//                                 value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                                 message: "Enter a valid email address"
//                             }
//                         })}
//                         error={!!errors.email}
//                         helperText={errors.email?.message}
//                         required
//                     />
//                     <TextField
//                         label="Password"
//                         type="password"
//                         fullWidth
//                         margin="normal"
//                         {...register("password", { 
//                             required: "Password is required", 
//                             minLength: {
//                                 value: 3,
//                                 message: "Password must be at least 3 characters long"
//                             }
//                         })}
//                         error={!!errors.password}
//                         helperText={errors.password?.message}
//                         required
//                     />
//                     <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>Login</Button>
//                     <Button fullWidth variant="outlined" color="secondary" onClick={() => navigate("/register")}>Register</Button>
//                 </form>
//             </Box>
//         </Container>
//     );
// }


import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { expenseActions } from "../../../Redux/ExpenseSlice";
import { userActions } from "../../../Redux/UserSlice";
import { expenseService } from "../../../Services/ExpenseService";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import "./Login.css";

import pennywiseIcon from "../../../Assets/Images/pennywise-icon.png"

export function Login(): JSX.Element {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<CredentialsModel>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function fetchExpenses() {
        try {
            const allExpenses = await expenseService.getAllExpenses();
            dispatch(expenseActions.initExpenses(allExpenses));
        } catch (err: any) {
            notify.error("Failed to fetch expenses.");
        }
    }

    async function send(credentials: CredentialsModel) {
        try {
            await userService.login(credentials);
            dispatch(userActions.initUser());
            await fetchExpenses();
            const targetUrl = sessionStorage.getItem("targetUrl") || "/personal";
            navigate(targetUrl);
            notify.success("Welcome back! 🎉");
        } catch (err: any) {
            setError("password", { type: "manual", message: "Password or Email incorrect" });
            setError("email", { type: "manual", message: "Password or Email incorrect" });
            notify.error("Password or Email incorrect");
        }
    }

    return (
        <div className="Login">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">
                        <img src={pennywiseIcon} className="logo-icon" />
                        <h1>Welcome Back</h1>
                    </div>
                    <p className="login-subtitle">Track your expenses with confidence</p>
                </div>

                <form onSubmit={handleSubmit(send)} className="login-form" noValidate>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className={errors.email ? "error" : ""}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Enter a valid email address"
                                }
                            })}
                        />
                        {errors.email && <span className="error-message">{errors.email.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className={errors.password ? "error" : ""}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 3,
                                    message: "Password must be at least 3 characters long"
                                }
                            })}
                        />
                        {errors.password && <span className="error-message">{errors.password.message}</span>}
                    </div>

                    <button type="submit" className="submit-button">
                        Sign In
                    </button>
                </form>

                <div className="login-footer">
                    <p>Don't have an account?</p>
                    <button className="secondary-button" onClick={() => navigate("/register")}>
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
}