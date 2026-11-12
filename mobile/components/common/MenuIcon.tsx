import React from 'react';
import Svg, { Rect } from 'react-native-svg';

type MenuIconProps = {
  size?: number;
  color?: string;
};

/**
 * 3×3 grid from assets/icons/menu.svg, tinted for light and dark chrome.
 */
export function MenuIcon({ size = 20, color = '#EDF2F6' }: MenuIconProps) {
  const cells = [2, 9.5, 17];

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {cells.map((y) =>
        cells.map((x) => (
          <Rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={5}
            height={5}
            rx={0.8}
            fill={color}
          />
        )),
      )}
    </Svg>
  );
}
