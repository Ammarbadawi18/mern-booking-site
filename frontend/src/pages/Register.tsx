import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";


interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
const Register = () => {
    const { showToast } = useAppContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<RegisterFormData>();

    const [emailErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const onSubmit = async (data: RegisterFormData) => {
        try {
            await axios.post("http://localhost:3000/register", data);
            showToast({ message: "Registration Successful.", type: "SUCCESS" })
            navigate("/");
            setValue("firstName", "");
            setValue("lastName", "");
            setValue("email", "");
            setValue("password", "");
            setValue("confirmPassword", "");
        } catch (error) {
            console.error("Registration failed:", error);
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                if ("errors" in data && Array.isArray(data.errors)) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data.errors.forEach((errorMsg: any) => showToast({ message: errorMsg, type: "ERROR" }));
                } else if ("message" in data && typeof data.message === "string") {
                    showToast({ message: data.message, type: "ERROR" });
                } else {
                    showToast({ message: "Registration failed. Please try again.", type: "ERROR" });
                }
            }
        }
    };

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-3xl font-bold">Create an Account</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name:
                    <input
                        className="border border-red-800 rounded w-full py-1 px-2 font-normal"
                        type="text"
                        {...register("firstName", { required: "This field is required" })}
                    />
                    {errors.firstName && (
                        <span className="text-red-500">{errors.firstName.message}</span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name:
                    <input
                        className="border border-red-800 rounded w-full py-1 px-2 font-normal"
                        type="text"
                        {...register("lastName", { required: "This field is required" })}
                    />
                    {errors.lastName && (
                        <span className="text-red-500">{errors.lastName.message}</span>
                    )}
                </label>
            </div>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email:
                <input
                    type="email"
                    className="border border-red-800 rounded w-full py-1 px-2 font-normal"
                    {...register("email", { required: "This field is required" })}
                />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
                {emailErrorMessage && (
                    <span className="text-red-500">{emailErrorMessage}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Password:
                <input
                    type="password"
                    className="border border-red-800 rounded w-full py-1 px-2 font-normal"
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Confirm Password:
                <input
                    type="password"
                    className="border border-red-800 rounded w-full py-1 px-2 font-normal"
                    {...register("confirmPassword", {
                        validate: (value) =>
                            value === watch("password") || "The passwords do not match",
                    })}
                />
                {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}
            </label>
            <span>
                <button
                    type="submit"
                    className="items-center bg-red-800 text-black p-2 font-bold hover:bg-gray-300 text-l rounded-lg"
                >
                    Create Account
                </button>
            </span>
        </form>
    );
};

export default Register;
