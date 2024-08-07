module.exports = function iconContent(name, content) {
  return `
// This file is generated automatically
// To edit see the file lib/tasks/generateIcons.js
import Icon from "../Icon";

export default function ${name}(props: any) {
  return (
    <Icon
      iconMarkup={${content}}
      iconName="${name}"
      iconSize={props.size}
      iconColor={props.color}
      {...props}
    />
  );
}

`
}
