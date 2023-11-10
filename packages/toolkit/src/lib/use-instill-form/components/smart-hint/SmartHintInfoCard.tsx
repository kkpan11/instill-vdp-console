import cn from "clsx";
import { ControllerRenderProps, FieldError } from "react-hook-form";
import { Nullable } from "../../../type";
import { Icons, Tag } from "@instill-ai/design-system";

export const SmartHintInfoCard = ({
  title,
  field,
  instillAcceptFormats,
  isRequired,
  className,
  error,
  supportReference,
  supportTemplate,
}: {
  field: ControllerRenderProps<
    {
      [k: string]: any;
    },
    string
  >;
  title: Nullable<string>;
  instillAcceptFormats: string[];
  supportReference: boolean;
  supportTemplate: boolean;
  isRequired?: boolean;
  className?: string;
  error?: FieldError;
}) => {
  return (
    <div className={cn("flex w-full flex-col", className)}>
      <div className="flex flex-col gap-y-4 p-2">
        {isRequired ? (
          <div className="flex flex-row gap-x-2">
            {field.value && field.value !== "" ? (
              <Icons.CheckCircle className="my-auto h-4 w-4 stroke-semantic-success-default" />
            ) : (
              <Icons.AlertCircle className="my-auto h-4 w-4 stroke-semantic-warning-default" />
            )}

            <p
              className={cn(
                "my-auto product-body-text-3-semibold",
                field.value && field.value !== ""
                  ? "text-semantic-success-default"
                  : "text-semantic-warning-default"
              )}
            >
              required
            </p>
          </div>
        ) : null}
        {instillAcceptFormats.length > 0 ? (
          <div className="flex flex-row gap-x-2">
            <div className="pt-0.5">
              <Icons.HelpCircle className="mb-auto h-4 w-4 stroke-semantic-fg-secondary" />
            </div>
            <div className="flex flex-col gap-y-1">
              <p className="text-semantic-fg-secondary product-body-text-3-semibold">
                This field accept following formats:
              </p>
              <div className="flex flex-row flex-wrap gap-x-2">
                {instillAcceptFormats.map((format) => (
                  <Tag
                    key={format}
                    variant="lightBlue"
                    size="sm"
                    className="!rounded !px-2 !py-0.5"
                  >
                    {format}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {supportReference ? (
          <div className="flex flex-row gap-x-2">
            <div className="pt-0.5">
              <Icons.HelpCircle className="mb-auto h-4 w-4 stroke-semantic-fg-secondary" />
            </div>
            <div className="flex flex-col gap-y-2">
              <p className="m-auto text-semantic-fg-secondary product-body-text-3-semibold">
                This field support reference, you can use{" "}
                <Tag
                  variant="lightBlue"
                  size="sm"
                  className="!rounded !px-2 !py-0.5"
                >{`{}`}</Tag>{" "}
                to reference other value. For example:
              </p>
              <p className="rounded border border-semantic-bg-line bg-semantic-bg-base-bg px-2 py-1 text-semantic-fg-secondary product-body-text-3-regular">
                {`{start.${title}}`}
              </p>
            </div>
          </div>
        ) : null}
        {supportTemplate ? (
          <div className="flex flex-row gap-x-2">
            <div className="pt-0.5">
              <Icons.HelpCircle className="mb-auto h-4 w-4 stroke-semantic-fg-secondary" />
            </div>
            <div className="flex flex-col gap-y-2">
              <p className="m-auto text-semantic-fg-secondary product-body-text-3-semibold">
                This field support template, you can use {` `}
                <Tag
                  variant="lightBlue"
                  size="sm"
                  className="!rounded !px-2 !py-0.5"
                >{`{{}}`}</Tag>{" "}
                to compose your template. For example:
              </p>
              <p className="rounded border border-semantic-bg-line bg-semantic-bg-base-bg px-2 py-1 text-semantic-fg-secondary product-body-text-3-regular">
                {`This is a template, {{start.${title}}}`}
              </p>
            </div>
          </div>
        ) : null}
      </div>
      {error ? (
        <div className="flex w-full flex-col gap-y-1 bg-semantic-error-bg p-2">
          <p className="text-semantic-error-default product-body-text-3-semibold">
            Field error
          </p>
          <p className="text-semantic-error-default product-body-text-3-regular">
            {String(error.message)}
          </p>
        </div>
      ) : null}
    </div>
  );
};
