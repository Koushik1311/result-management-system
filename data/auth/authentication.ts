import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const apiBaseUri = process.env.NEXT_PUBLIC_API_BASE_URI;

const registerUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${apiBaseUri}/users/register`, {
      fullName,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong can not register user");
  }
};

const loginUser = async (email: string, password: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  try {
    const response = await axios.post(
      `${apiBaseUri}/users/login`,
      {
        email,
        password,
      },
      config
    );

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong can not log in user");
  }
};

const logoutUser = () => {
  const localAccessToken = cookies().get("accessToken");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${localAccessToken?.value}`,
    },
  };

  try {
    axios.post(`${apiBaseUri}/users/logout`, {}, config);

    cookies().delete("accessToken");
    cookies().delete("refreshToken");
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Something went wrong");
  }
};

const refreshAccessToken = async () => {
  const localRefreshToken = cookies().get("refreshToken");

  try {
    const response = await axios.post(`${apiBaseUri}/users/refresh-token`, {
      refreshToken: localRefreshToken?.value,
    });

    const access_Token = response.data.data.accessToken;
    const refresh_Token = response.data.data.refreshToken;

    const res = NextResponse.next();
    res.cookies.set("accessToken", access_Token, {
      maxAge: 60 * 60 * 24,
    });

    res.cookies.set("refreshToken", refresh_Token, {
      maxAge: 60 * 60 * 24 * 30,
    });

    return res;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const getUserData = async () => {
  const localAccessToken = cookies().get("accessToken");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${localAccessToken?.value}`,
    },
  };

  try {
    const response = await axios.get(`${apiBaseUri}/users/user-data`, config);

    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Something went wrong");
  }
};

export { registerUser, loginUser, logoutUser, refreshAccessToken, getUserData };
