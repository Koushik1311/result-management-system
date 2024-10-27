import axios from "axios";

const apiBaseUri = process.env.NEXT_PUBLIC_API_BASE_URI;

const getSearchedResult = async (resultId: string) => {
  try {
    // const response = await axios.get(
    //   "http://localhost:8000/api/v1/results/102"
    // );

    console.log("Result ID: ", resultId);
    const response = await axios.get(`${apiBaseUri}/results/${resultId}`);

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export { getSearchedResult };
