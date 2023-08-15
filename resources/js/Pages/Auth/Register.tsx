import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1 },
                }}
                noValidate
                onSubmit={submit}
                autoComplete="off"
            >
                <TextField
                    fullWidth
                    error={errors.name ? true : false}
                    id="name"
                    name="name"
                    label="Name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    helperText={errors.name}
                />

                <TextField
                    fullWidth
                    error={errors.email ? true : false}
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    helperText={errors.email}
                />

                <TextField
                    fullWidth
                    error={errors.password ? true : false}
                    id="password"
                    type="password"
                    name="password"
                    label="Password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    helperText={errors.password}
                />

                <TextField
                    fullWidth
                    error={errors.password_confirmation ? true : false}
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    label="Password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    helperText={errors.password_confirmation}
                />

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Se já está cadastrado, realize o login.
                    </Link>

                    <Button
                        sx={{ marginLeft: 2 }}
                        disabled={processing}
                        variant="contained"
                        type="submit"
                    >
                        Registrar
                    </Button>
                </div>
            </Box>
        </GuestLayout>
    );
}
