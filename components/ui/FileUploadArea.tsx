import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

// FileUploadArea Component
interface FileUploadAreaProps {
  onFileUpload: (files: File[]) => void;
  className?: string;
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  onFileUpload,
  className
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileUpload(acceptedFiles); // 傳遞上傳的檔案
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".png", ".jpeg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`${className} flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer
      ${isDragActive ? "border-blue-400 bg-blue-50" : "border-blue-600 bg-blue-100"}
      `}
    >
      <input {...getInputProps()} />
      <p className="text-blue-600">
        {isDragActive
          ? "把照片丟到這邊 ..."
          : "把照片丟到這邊 "}
      </p>
    </div>
  );
};
