// import { Box, Button, Container, Grid, TextField } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { UserModel } from "../../../Models/UserModel";
// import { userService } from "../../../Services/UserService";
// import { notify } from "../../../Utils/Notify";
// import "./Register.css";

// export function Register(): JSX.Element {
//     const { register, handleSubmit } = useForm<UserModel>();
//     const navigate = useNavigate();

//     async function send(user: UserModel) {
//         try {
//             await userService.register(user);
//             notify.success("Thank you for joining us!");
//             navigate("/home");
//         } catch (err: any) {
//             notify.error(err.message || "Registration failed");
//         }
//     }

//     return (
//         <Container maxWidth="xs">
//             <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 <form onSubmit={handleSubmit(send)} noValidate>
//                     <TextField label="First Name" fullWidth margin="normal" {...register("firstName")} required />
//                     <TextField label="Last Name" fullWidth margin="normal" {...register("lastName")} required />
//                     <TextField label="Email" type="email" fullWidth margin="normal" {...register("email")} required />
//                     <TextField label="Password" type="password" fullWidth margin="normal" {...register("password")} required />
//                     <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>Register</Button>
//                 </form>
//                 <Grid container justifyContent="center">
//                     <Grid item>
//                         <Button variant="text" color="primary" onClick={() => navigate("/login")}>
//                             Already registered? Log in
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </Box>
//         </Container>
//     );
// }





// Components/UserArea/Register/Register.tsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import "./Register.css";

interface RegisterFormInputs extends UserModel {
    confirmPassword: string;
}

export function Register(): JSX.Element {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormInputs>();
    const navigate = useNavigate();
    const password = watch("password");

    async function send(user: RegisterFormInputs) {
        const { confirmPassword, ...userData } = user;

        try {
            await userService.register(userData);
            notify.success("Welcome to Pennywise! 🎉");
            navigate("/login");
        } catch (err: any) {
            notify.error(err.message || "Registration failed");
        }
    }

    return (
        <div className="Register">
            <div className="register-card">
                <div className="register-header">
                    <div className="register-logo">
                        <span className="logo-icon">🎪</span>
                        <h1>Join Pennywise</h1>
                    </div>
                    <p className="register-subtitle">Start your financial journey today</p>
                </div>

                <form onSubmit={handleSubmit(send)} className="register-form" noValidate>
                    <div className="form-row">
                        <div className="form-group">
                            <label>First Name</label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    className={errors.firstName ? "error" : ""}
                                    {...register("firstName", { 
                                        required: "First name is required",
                                        minLength: {
                                            value: 2,
                                            message: "First name must be at least 2 characters"
                                        },
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/,
                                            message: "First name can only contain letters"
                                        }
                                    })}
                                />
                                {errors.firstName && <div className="error-icon">!</div>}
                            </div>
                            {errors.firstName && 
                                <span className="error-message">{errors.firstName.message}</span>
                            }
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    className={errors.lastName ? "error" : ""}
                                    {...register("lastName", { 
                                        required: "Last name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Last name must be at least 2 characters"
                                        },
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/,
                                            message: "Last name can only contain letters"
                                        }
                                    })}
                                />
                                {errors.lastName && <div className="error-icon">!</div>}
                            </div>
                            {errors.lastName && 
                                <span className="error-message">{errors.lastName.message}</span>
                            }
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={errors.email ? "error" : ""}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            {errors.email && <div className="error-icon">!</div>}
                        </div>
                        {errors.email && 
                            <span className="error-message">{errors.email.message}</span>
                        }
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                placeholder="Create a password"
                                className={errors.password ? "error" : ""}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 3,
                                        message: "Password must be at least 3 characters"
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                        message: "Password must contain at least one letter and one number"
                                    }
                                })}
                            />
                            {errors.password && <div className="error-icon">!</div>}
                        </div>
                        {errors.password && 
                            <span className="error-message">{errors.password.message}</span>
                        }
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                className={errors.confirmPassword ? "error" : ""}
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: value => 
                                        value === password || "Passwords do not match"
                                })}
                            />
                            {errors.confirmPassword && <div className="error-icon">!</div>}
                        </div>
                        {errors.confirmPassword && 
                            <span className="error-message">{errors.confirmPassword.message}</span>
                        }
                    </div>

                    <button type="submit" className="submit-button">
                        Create Account
                    </button>
                </form>

                <div className="register-footer">
                    <p>Already have an account?</p>
                    <button className="secondary-button" onClick={() => navigate("/login")}>
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}