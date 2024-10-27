import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

// FileUploadArea Component
interface FileUploadAreaProps {
  onFileUpload: (files: File[]) => void;
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileUpload(acceptedFiles);  // Correct type usage
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.png', '.jpeg'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer
      ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-blue-600 bg-blue-100'}
      `}
    >
      <input {...getInputProps()} />
      <p className="text-blue-600">
        {isDragActive ? 'Drop the files here ...' : 'Drag and drop an image here, or click to select files'}
      </p>
      <p className="text-sm text-gray-500">Only images are accepted (e.g., .jpg, .png)</p>
    </div>
  );
};