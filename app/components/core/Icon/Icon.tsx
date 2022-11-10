import type { DOMAttributes } from 'react';
import { useTheme } from 'styled-components';
import icons from './icons';

export type IconType = keyof typeof icons;

type IconElementContent = { tag: string; content: { [key: string]: string } };
export type IconProps = {
  type: IconType;
  size?: number;
  /** can be use like with style-system ex :"primary", "bg.light" */
  color?: string;
} & DOMAttributes<SVGElement>;

const Icon = ({ type = '10Plus', size = 24, color, ...props }: IconProps) => {
  const icon = icons[type];
  const { colors } = useTheme();

  const themeColor = colors[color] ?? color;

  const renderElement = (iconEl: IconElementContent, index: number) => {
    const { tag, content } = iconEl;
    const Component = tag as 'path';

    const eltProps = {
      ...content,
      ...(content.fill ? { fill: themeColor || content.fill } : {}),
      ...(content.stroke ? { stroke: themeColor || content.stroke } : {}),
    };
    return <Component key={index + tag} {...eltProps} />;
  };
  return (
    <svg {...props} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {(icon as IconElementContent[]).map(renderElement)}
    </svg>
  );
};

export default Icon;
