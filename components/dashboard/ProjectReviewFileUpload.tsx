"use client";

import { FileCog, FileSpreadsheet, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { CloudUpload } from "lucide-react";
import Modal from "react-modal";
import { getCookie } from "cookies-next";
import SubmitButton from "@/components/global/SubmitButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteFile, fetchAllFiles } from "@/data/project-review-file";
import { extractAndSaveProjectReviewMarks } from "@/data/student";

type fileType = {
  _id: string;
  fileUrl: string;
  isExtracted: boolean;
  createdAt: string;
  updatedAt: string;
};

type ProjectReviewFileUploadProps = {
  refreshResults: () => void;
};

export default function ProjectReviewFilesUpload({
  refreshResults,
}: ProjectReviewFileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [files, setFiles] = useState<fileType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetchAllFiles();
        const data: fileType[] = response.data;
        setFiles(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch files:", error);
      }
    };

    fetchFiles();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const apiBaseUri = process.env.NEXT_PUBLIC_API_BASE_URI;
    const localAccessToken = getCookie("accessToken");

    const config = {
      headers: {
        Authorization: `Bearer ${localAccessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("uploadFile", file);

    const toastId = toast.loading("Uploading file...");

    try {
      const response = await axios.post(
        `${apiBaseUri}/project-review-files/upload`,
        formData,
        config
      );

      if (response.status === 201) {
        toast.success("File uploaded successfully!", { id: toastId });
        const response = await fetchAllFiles();
        const data: fileType[] = response.data;
        setFiles(data);
      } else {
        toast.error("Upload failed. Please try again.", { id: toastId });
      }
    } catch (error) {
      toast.error("An error occurred during upload.", { id: toastId });
    } finally {
      closeModal();
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setFile(null);
    setFileName(null);
    setModalIsOpen(false);
  };

  const extractAndSaveHandle = async (id: string) => {
    setIsLoading(true);
    const loadingToastId = toast.loading("Extracting and saving results...");

    try {
      const data = await extractAndSaveProjectReviewMarks(id);
      if (!data) {
        toast.info("Extraction failed", { id: loadingToastId });
      } else {
        toast.success("Extraction successful", { id: loadingToastId });

        refreshResults();
      }
    } catch (error) {
      toast.error("An error occurred", { id: loadingToastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const loadingToastId = toast.loading("Deleating result...");
    try {
      const response = await deleteFile(id);

      if (response.statusCode === 404) {
        toast.info("File not found", { id: loadingToastId });
      }

      const updatedFiles = files.filter((file) => file._id !== id);
      toast.success("Result deleted successfully", { id: loadingToastId });
      setFiles(updatedFiles);

      router.refresh();
    } catch (error) {
      console.error("Failed to delete result:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Header Row */}
      <div>
        <div className="mt-4 flex justify-between items-center font-semibold border-b border-gray-300 pb-2 mb-4">
          <div className="w-1/2 flex items-center gap-2">
            <p>File</p>
          </div>
          <div className="w-1/4">
            <p>Created At</p>
          </div>
          <div className="w-1/4 text-right">
            <p>Action</p>
          </div>
        </div>
        <ul>
          {files.map((file) => {
            const fileName = file.fileUrl.split("results/")[1];

            return (
              <li
                key={file._id}
                className="flex justify-between items-center py-2 border-b border-gray-200"
              >
                <div className="w-1/2 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5" />
                  <p>{fileName}</p>
                </div>
                <div className="w-1/4">
                  <p>{file.createdAt}</p>
                </div>
                <div className="w-1/4 text-right flex items-end justify-end">
                  <div className="flex flex-col items-center gap-2">
                    {!file.isExtracted ? (
                      <button
                        onClick={() => extractAndSaveHandle(file._id)}
                        disabled={isLoading}
                        className="flex items-center gap-2 hover:text-violet-400 transition-colors disabled:opacity-50"
                      >
                        <FileCog className="w-5 h-5" />
                        <p>Extract & Save</p>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDelete(file._id)}
                        className="flex items-center gap-2 hover:text-red-400 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-5 h-5" />
                        <p>Delete</p>
                      </button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-end justify-end">
        <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg">
          <button
            onClick={openModal}
            className="flex items-center px-4 py-2 bg-violet-400 text-white rounded-md shadow hover:bg-violet-500 transition-all duration-150"
          >
            <CloudUpload className="w-5 h-5 mr-2" />
            Upload File
          </button>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="flex flex-col w-[500px] items-center p-6 bg-gray-100 rounded-lg shadow-md"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <h2 className="text-lg font-semibold mb-4">Upload File</h2>
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="flex items-center justify-center space-x-2 h-32 w-full">
                <CloudUpload className="w-6 h-6 text-violet-500" />
                <label
                  htmlFor="uploadFile"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  {fileName ? fileName : "Choose a file"}
                </label>
                <input
                  id="uploadFile"
                  type="file"
                  name="uploadFile"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <SubmitButton
                onClick={handleUpload}
                type="button"
                className="w-full flex items-center justify-center h-9 rounded-[6px] bg-violet-600 hover:bg-violet-500 transition-all duration-150 text-sm font-semibold text-white mt-3"
              >
                <CloudUpload className="w-5 h-5 mr-2" />
                Upload
              </SubmitButton>
            </div>
            <SubmitButton
              onClick={closeModal}
              type="button"
              className="w-full flex items-center justify-center h-9 rounded-[6px] bg-red-500 hover:bg-red-400 transition-all duration-150 text-sm font-semibold text-white mt-3"
            >
              Close
            </SubmitButton>
          </Modal>
        </div>
      </div>
    </div>
  );
}
