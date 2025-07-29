import { Typography } from "antd";
import type { TextProps } from "antd/es/typography/Text";

export function CustomParagraph({ children, ...rest }: TextProps) {
  return (
    <Typography.Paragraph
      style={{
        fontFamily: "inherit",
        ...rest.style,
      }}
      {...rest}
    >
      {children}
    </Typography.Paragraph>
  );
}
