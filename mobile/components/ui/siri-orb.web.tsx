import React, { useEffect } from 'react';
import {
  SIRI_ORB_SHADER_COLORS,
  parseOrbSize,
  type SiriOrbProps,
} from './siri-orb.shared';

export type { SiriOrbProps } from './siri-orb.shared';
export { SIRI_ORB_SHADER_COLORS, parseOrbSize } from './siri-orb.shared';

const STYLE_ID = 'vorsha-siri-orb-css';

const SIRI_ORB_CSS = `
@property --angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.vorsha-siri-orb {
  display: grid;
  grid-template-areas: "stack";
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.02) 30%,
    transparent 70%
  );
  filter: drop-shadow(0 18px 28px rgba(0, 0, 0, 0.35));
}

.vorsha-siri-orb::before {
  content: "";
  display: block;
  grid-area: stack;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background:
    conic-gradient(
      from calc(var(--angle) * 1.2) at 30% 65%,
      var(--c3) 0deg,
      transparent 45deg 315deg,
      var(--c3) 360deg
    ),
    conic-gradient(
      from calc(var(--angle) * 0.8) at 70% 35%,
      var(--c2) 0deg,
      transparent 60deg 300deg,
      var(--c2) 360deg
    ),
    conic-gradient(
      from calc(var(--angle) * -1.5) at 65% 75%,
      var(--c1) 0deg,
      transparent 90deg 270deg,
      var(--c1) 360deg
    ),
    conic-gradient(
      from calc(var(--angle) * 2.1) at 25% 25%,
      var(--c2) 0deg,
      transparent 30deg 330deg,
      var(--c2) 360deg
    ),
    conic-gradient(
      from calc(var(--angle) * -0.7) at 80% 80%,
      var(--c1) 0deg,
      transparent 45deg 315deg,
      var(--c1) 360deg
    ),
    radial-gradient(
      ellipse 120% 80% at 40% 60%,
      var(--c3) 0%,
      transparent 50%
    );
  filter: blur(var(--blur-amount)) contrast(var(--contrast-amount)) saturate(1.2);
  animation: vorsha-siri-rotate var(--animation-duration) linear infinite;
  transform: translateZ(0);
  will-change: transform;
}

.vorsha-siri-orb::after {
  content: "";
  display: block;
  grid-area: stack;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(
    circle at 45% 55%,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 30%,
    transparent 60%
  );
  mix-blend-mode: overlay;
}

@keyframes vorsha-siri-rotate {
  from { --angle: 0deg; }
  to { --angle: 360deg; }
}

@media (prefers-reduced-motion: reduce) {
  .vorsha-siri-orb::before {
    animation: none;
  }
}
`;

function ensureSiriOrbStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const tag = document.createElement('style');
  tag.id = STYLE_ID;
  tag.textContent = SIRI_ORB_CSS;
  document.head.appendChild(tag);
}

export default function SiriOrb({
  size = '192px',
  className,
  colors,
  animationDuration = 20,
  onPress,
  accessibilityLabel,
}: SiriOrbProps) {
  const palette = { ...SIRI_ORB_SHADER_COLORS, ...colors };
  const px = parseOrbSize(size);
  const sizeCss = `${px}px`;
  const blurAmount = Math.max(px * 0.08, 8);
  const contrastAmount = Math.max(px * 0.003, 1.8);

  useEffect(() => {
    ensureSiriOrbStyles();
  }, []);

  const style: React.CSSProperties = {
    width: sizeCss,
    height: sizeCss,
    backgroundColor: palette.bg === 'transparent' ? undefined : palette.bg,
    cursor: onPress ? 'pointer' : undefined,
    ['--bg' as string]: palette.bg,
    ['--c1' as string]: palette.c1,
    ['--c2' as string]: palette.c2,
    ['--c3' as string]: palette.c3,
    ['--animation-duration' as string]: `${animationDuration}s`,
    ['--blur-amount' as string]: `${blurAmount}px`,
    ['--contrast-amount' as string]: String(contrastAmount),
  };

  return React.createElement('div', {
    className: className ? `vorsha-siri-orb ${className}` : 'vorsha-siri-orb',
    style,
    onClick: onPress,
    role: onPress ? 'button' : undefined,
    'aria-label': accessibilityLabel,
    tabIndex: onPress ? 0 : undefined,
    onKeyDown: onPress
      ? (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onPress();
          }
        }
      : undefined,
  });
}
