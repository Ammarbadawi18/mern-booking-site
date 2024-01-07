// api-client.ts
import axios from "axios";
import { RegisterFormData } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, formData, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    // Check if the error is an AxiosError
    if (axios.isAxiosError(error)) {
      // Now TypeScript knows that error.response is available
      const errorMessage =
        error.response?.data?.message || "Registration failed";

      throw new Error(errorMessage);
    } else {
      // Handle non-Axios errors if needed
      throw new Error("Registration failed");
    }
  }
};



export const validateToken = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/validate-token`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error('Token invalid');
  }
};




