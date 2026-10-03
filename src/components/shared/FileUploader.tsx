import { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Button } from "../ui/button";
import { ImageUp } from "lucide-react";
type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};
const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [fieldChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`create-upload-zone ${isDragActive ? "create-upload-zone_active" : ""}`}
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img
              src={fileUrl}
              alt="image"
              className="file_uploader-img"
              loading="lazy"
            />
          </div>
          <p className="file_uploader-label"> Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <span className="create-upload-icon"><ImageUp size={30} aria-hidden="true" /></span>
          <h3 className="base-medium text-light-2 mb-2 mt-5">Drop your photo here</h3>
          <p className="text-light-4 small-regular mb-6">PNG, JPG or SVG</p>
          <Button type="button" className="shad-button_dark_4">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
