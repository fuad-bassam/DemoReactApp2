import React, { useState } from 'react';
import { TextField, Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useValidation } from '../../../hooks/useValidation'; // Import validation hook
import useAuthService from '../../../Services/Common/AuthService';
import { useAuth } from '../../../hooks/AuthContext';
import { NavRoutesEnum } from '../../../Services/Common/NavRoutes';
import { ILoginUser } from '../../../Services/interfaces/User/IUser';
import { LoginValidationSchema } from '../../../Services/validation/User/UserValidation';
import { InitialStateLoginUser } from '../../../../src/(moduleUsers)/store/UserStoreModule';

const LoginPage: React.FC = () => {
    const { setLoginUserInformation } = useAuth();
    const AuthService = useAuthService();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ILoginUser>(InitialStateLoginUser);
    const { errors, validateField, validateForm } = useValidation(LoginValidationSchema, {});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const formErrors = validateForm(formData);
        if (formErrors) return;

        const user = await AuthService.login(formData);
        if (user) {
            setLoginUserInformation(user);
            navigate(NavRoutesEnum.Home);
        } else {
            alert('Login failed');
        }
    };
    const handleNavigateToRegister = () => {
        navigate(NavRoutesEnum.Register);
    };
    return (
        <Container>
            <Box my={4}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <Box display="flex" gap={2} mt={2}>

                        <Button type="submit" variant="contained" fullWidth disabled={!!errors.email || !!errors.password}>
                            Login
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleNavigateToRegister}>
                            Register
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default LoginPage;
