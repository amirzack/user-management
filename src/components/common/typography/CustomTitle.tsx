import { Typography } from "antd";
import type { TitleProps } from "antd/es/typography/Title";

// می‌تونی پراپزها رو به خود AntD پاس بدی
export function CustomTitle({ children, ...rest }: TitleProps) {
  return (
    <Typography.Title
      level={rest.level ?? 3}
      style={{
        margin: 0,
        ...rest.style,
      }}
      {...rest}
    >
      {children}
    </Typography.Title>
  );
}
