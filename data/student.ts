import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";

const apiBaseUri = process.env.NEXT_PUBLIC_API_BASE_URI;

// Attendence Marks
const extractAndSaveAttendenceMarks = async (id: string) => {
  const localAccessToken = getCookie("accessToken");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${localAccessToken}`,
    },
  };

  try {
    const response = await axios.post(
      `${apiBaseUri}/results/save-attendence-marks`,
      {
        fileId: id,
      },
      config
    );

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

// Assessment Marks
const extractAndSaveAssessmentMarks = async (id: string) => {
  const localAccessToken = getCookie("accessToken");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${localAccessToken}`,
    },
  };

  try {
    const response = await axios.post(
      `${apiBaseUri}/results/save-assessment-marks`,
      {
        fileId: id,
      },
      config
    );

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

// Linkedin Marks
const extractAndSaveLinkedinMarks = async (id: string) => {
  const localAccessToken = getCookie("accessToken");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${localAccessToken}`,
    },
  };

  try {
    const response = await axios.post(
      `${apiBaseUri}/results/save-linkedin-marks`,
      {
        fileId: id,
      },
      config
    );

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
// Project Submission Marks
const extractAndSaveProjectSubmissionMarks = async (id: string) => {
  const localAccessToken = getCookie("accessToken");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${localAccessToken}`,
    },
  };

  try {
    const response = await axios.post(
      `${apiBaseUri}/results/save-project-submission-marks`,
      {
        fileId: id,
      },
      config
    );

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

// Project Review Marks
const extractAndSaveProjectReviewMarks = async (id: string) => {
  const localAccessToken = getCookie("accessToken");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${localAccessToken}`,
    },
  };

  try {
    const response = await axios.post(
      `${apiBaseUri}/results/save-project-review-marks`,
      {
        fileId: id,
      },
      config
    );

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

// const getSearchedCertificate = async (certificateId: string) => {
//   try {
//     const response = await axios.get(
//       `${apiBaseUri}/certificates/${certificateId}`
//     );

//     return response.data;
//   } catch (error) {
//     throw new Error("Something went wrong");
//   }
// };

// interface CertificateResponse {
//   data: Blob;
// }

const getAllResults = async () => {
  try {
    const response = await axios.get(`${apiBaseUri}/results`);

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export {
  extractAndSaveAttendenceMarks,
  extractAndSaveAssessmentMarks,
  extractAndSaveLinkedinMarks,
  extractAndSaveProjectReviewMarks,
  extractAndSaveProjectSubmissionMarks,
  getAllResults,
};
