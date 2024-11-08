import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { FileUploadArea } from '@/components/ui/FileUploadArea';

interface CreateNewInputAreaProps {
  title?: string;
  desc?: string;
  placeholder?: string;
  value?: string;
  withText?: boolean;
  withFileUpload?: boolean;
  onFileChange?: (files: File[]) => void;  // Correct type for file handling
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CreateNewInputArea: React.FC<CreateNewInputAreaProps> = ({
  title,
  desc,
  placeholder,
  value,
  withText = true,
  withFileUpload = false,
  onChange,
  onFileChange,
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-2xl dark:text-neutral-200"><strong>{title}</strong></Label>
      {withText && (
        <>
          <div>
            <Input
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className="bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700" />

            <p className="text-xs mt-2 text-neutral-500 dark:text-neutral-400">{desc}</p>
          </div>

        </>
      )}
      {withText && withFileUpload && (
        <div>
          <p><i>or...</i></p>
        </div>
      )}
      {withFileUpload && onFileChange && (
        <div className="w-4/5">
          <FileUploadArea onFileUpload={onFileChange} />
        </div>
      )}

    </div>
  );
};