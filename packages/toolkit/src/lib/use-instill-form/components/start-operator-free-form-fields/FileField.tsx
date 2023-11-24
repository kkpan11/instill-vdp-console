import * as React from "react";
import { Form } from "@instill-ai/design-system";
import { AutoFormFieldBaseProps, Nullable } from "../../..";
import { readFileToBinary } from "../../../../view";
import { FieldHead } from "./FieldHead";
import { FileListItem } from "./FileListItem";
import { UploadFileInput } from "./UploadFileInput";

export const FileField = ({
  form,
  path,
  title,
  description,
  onEditField,
  onDeleteField,
  isHidden,
}: {
  onEditField: (key: string) => void;
  onDeleteField: (key: string) => void;
} & AutoFormFieldBaseProps) => {
  const [uploadedFile, setUploadedFile] = React.useState<Nullable<File>>();
  const fileRef = React.useRef<HTMLInputElement>(null);

  return isHidden ? null : (
    <Form.Field
      key={path}
      control={form.control}
      name={path}
      render={({ field }) => {
        return (
          <Form.Item className="w-full">
            <FieldHead
              title={title}
              path={path}
              onDeleteField={onDeleteField}
              onEditField={onEditField}
            />
            <div className="flex">
              <Form.Control>
                <UploadFileInput
                  ref={fileRef}
                  title="Upload file"
                  fieldKey={path}
                  accept="*/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setUploadedFile(file);
                      const binary = await readFileToBinary(file);
                      field.onChange(binary);
                    }
                  }}
                />
              </Form.Control>
            </div>
            {uploadedFile ? (
              <FileListItem
                name={uploadedFile.name}
                onDelete={() => {
                  setUploadedFile(null);
                  field.onChange(null);
                  if (fileRef.current) {
                    fileRef.current.value = "";
                  }
                }}
              />
            ) : null}
            <Form.Description className="!text-xs" text={description} />
            <Form.Message />
          </Form.Item>
        );
      }}
    />
  );
};
