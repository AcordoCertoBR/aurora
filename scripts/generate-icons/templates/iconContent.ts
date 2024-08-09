export default function iconContent(name: string, content: string) {
  return `
// This file is generated automatically
// To edit see the file lib/tasks/generateIcons.js
import Icon, { IconSize, IconColor } from "../Icon";

export function ${name}(props: { size: IconSize; color: IconColor }) {
  return (
    <Icon
      iconMarkup={${content}}
      iconName="${name}"
      iconSize={props.size}
      iconColor={props.color}
    />
  );
}

`
}
