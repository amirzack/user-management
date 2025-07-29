import { Typography } from "antd";
import type { TextProps } from "antd/es/typography/Text";

export function CustomText({ children, ...rest }: TextProps) {
  return (
    <Typography.Text
      style={{
        fontFamily: "inherit",
        ...rest.style,
      }}
      {...rest}
    >
      {children}
    </Typography.Text>
  );
}
