export default function iconContent(name: string, content: string) {
  return `
// This file is generated automatically
// To edit see the file lib/tasks/generateIcons.js
import Icon, { IconProps } from "../Icon";

export function ${name}(props: IconProps) {
  return (
    <Icon
      markup={${content}}
      name="${name}"
      {...props}
    />
  );
}

`
}
