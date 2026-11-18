import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  Modal as RNModal,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
  PressableProps,
  ViewProps,
  TextProps,
  StyleProp,
  ScrollView,
  Switch as RNSwitch,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { Colors, ThemeColors } from '../constants/colors';
import { BorderRadius, Spacing, TouchTargets, Shadows } from '../constants/theme';
import { useSettingsStore } from '../store/settingsStore';

// ---------------------------------------------------------------------------
// Theme helpers
// ---------------------------------------------------------------------------

export function useThemeColor(
  color: string | string[]
): string | string[] {
  const theme = useSettingsStore((s) => (s.theme === 'dark' ? 'dark' : 'light'));
  const palette = Colors[theme];
  const map: Record<string, string> = {
    background: palette.background,
    foreground: palette.foreground,
    surface: palette.surface,
    'surface-foreground': palette.surfaceForeground,
    'surface-secondary': palette.surfaceSecondary,
    'surface-tertiary': palette.surfaceTertiary,
    overlay: palette.overlay,
    muted: palette.muted,
    default: palette.default,
    'default-foreground': palette.defaultForeground,
    accent: palette.accent,
    'accent-foreground': palette.accentForeground,
    'accent-soft': palette.accentSoft,
    'accent-soft-foreground': palette.accentSoftForeground,
    field: palette.field,
    'field-foreground': palette.fieldForeground,
    'field-placeholder': palette.fieldPlaceholder,
    'field-border': palette.fieldBorder,
    border: palette.border,
    separator: palette.separator,
    success: palette.success,
    'success-foreground': palette.successForeground,
    'success-soft': palette.successSoft,
    'success-soft-foreground': palette.successSoftForeground,
    warning: palette.warning,
    'warning-foreground': palette.warningForeground,
    'warning-soft': palette.warningSoft,
    'warning-soft-foreground': palette.warningSoftForeground,
    danger: palette.danger,
    'danger-foreground': palette.dangerForeground,
    'danger-soft': palette.dangerSoft,
    'danger-soft-foreground': palette.dangerSoftForeground,
  };

  if (Array.isArray(color)) {
    return color.map((c) => map[c] ?? palette.foreground);
  }
  return map[color] ?? palette.foreground;
}

function usePalette(): ThemeColors {
  const theme = useSettingsStore((s) => (s.theme === 'dark' ? 'dark' : 'light'));
  return Colors[theme];
}

function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export { cn };

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export type HeroUINativeConfig = {
  textProps?: {
    allowFontScaling?: boolean;
    maxFontSizeMultiplier?: number;
    adjustsFontSizeToFit?: boolean;
    minimumFontScale?: number;
  };
  textInputProps?: {
    allowFontScaling?: boolean;
    maxFontSizeMultiplier?: number;
  };
  animation?: 'disable-all' | boolean;
  toast?: false | 'disabled' | Record<string, unknown>;
  isRTL?: boolean;
  devInfo?: { stylingPrinciples?: boolean };
};

export const HeroUINativeProvider: React.FC<{
  children: React.ReactNode;
  config?: HeroUINativeConfig;
}> = ({ children }) => <>{children}</>;

export const HeroUINativeProviderRaw = HeroUINativeProvider;

// ---------------------------------------------------------------------------
// Surface
// ---------------------------------------------------------------------------

type SurfaceVariant = 'default' | 'secondary' | 'tertiary' | 'transparent';

export interface SurfaceProps extends ViewProps {
  variant?: SurfaceVariant;
  className?: string;
  asChild?: boolean;
}

const SurfaceRoot: React.FC<SurfaceProps> = ({
  variant = 'default',
  style,
  children,
  ...props
}) => {
  const palette = usePalette();
  const bg =
    variant === 'secondary'
      ? palette.surfaceSecondary
      : variant === 'tertiary'
      ? palette.surfaceTertiary
      : variant === 'transparent'
      ? 'transparent'
      : palette.glass;

  // The default surface is translucent so the shader background reads through.
  // It takes a hairline border instead of a shadow: Android elevation shows
  // through translucent fills.
  const isGlass = variant === 'default';

  return (
    <View
      style={[
        {
          backgroundColor: bg,
          borderRadius: BorderRadius.lg,
          padding: Spacing.md,
        },
        isGlass && { borderWidth: 1, borderColor: palette.glassBorder },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export const Surface = SurfaceRoot;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

type TypographyType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'body-sm'
  | 'body-xs'
  | 'code';

export interface TypographyProps extends TextProps {
  type?: TypographyType;
  align?: 'start' | 'center' | 'end' | 'justify';
  color?: 'default' | 'muted';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  truncate?: boolean;
  className?: string;
}

const typeStyles: Record<TypographyType, TextStyle> = {
  h1: { fontSize: 28, lineHeight: 34, fontWeight: '500' },
  h2: { fontSize: 24, lineHeight: 30, fontWeight: '500' },
  h3: { fontSize: 20, lineHeight: 26, fontWeight: '500' },
  h4: { fontSize: 18, lineHeight: 24, fontWeight: '500' },
  h5: { fontSize: 16, lineHeight: 22, fontWeight: '500' },
  h6: { fontSize: 14, lineHeight: 20, fontWeight: '500' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  'body-sm': { fontSize: 14, lineHeight: 20, fontWeight: '400' },
  'body-xs': { fontSize: 12, lineHeight: 16, fontWeight: '400' },
  code: { fontSize: 13, lineHeight: 18, fontWeight: '400', fontFamily: 'monospace' },
};

const weightMap: Record<string, TextStyle['fontWeight']> = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

const TypographyRoot: React.FC<TypographyProps> = ({
  type = 'body',
  align = 'start',
  color = 'default',
  weight,
  truncate,
  style,
  children,
  ...props
}) => {
  const palette = usePalette();
  return (
    <Text
      numberOfLines={truncate ? 1 : props.numberOfLines}
      style={[
        typeStyles[type],
        {
          color: color === 'muted' ? palette.muted : palette.foreground,
          textAlign:
            align === 'start'
              ? 'left'
              : align === 'end'
              ? 'right'
              : align,
          fontWeight: weight ? weightMap[weight] : typeStyles[type].fontWeight,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const TypographyHeading: React.FC<TypographyProps> = (props) => (
  <TypographyRoot accessibilityRole="header" type={props.type || 'h1'} {...props} />
);

const TypographyParagraph: React.FC<TypographyProps> = (props) => (
  <TypographyRoot type={props.type || 'body'} {...props} />
);

const TypographyCode: React.FC<TypographyProps> = (props) => {
  const palette = usePalette();
  return (
    <TypographyRoot
      type="code"
      style={[
        {
          backgroundColor: palette.surfaceSecondary,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: BorderRadius.xs,
          alignSelf: 'flex-start',
        },
        props.style,
      ]}
      {...props}
    />
  );
};

export const Typography = Object.assign(TypographyRoot, {
  Heading: TypographyHeading,
  Paragraph: TypographyParagraph,
  Code: TypographyCode,
});

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'danger-soft';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isIconOnly?: boolean;
  isDisabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  feedbackVariant?: string;
  animation?: unknown;
  background?: React.ReactNode;
}

const ButtonCtx = createContext<{
  size: ButtonSize;
  variant: ButtonVariant;
  isDisabled: boolean;
}>({ size: 'md', variant: 'primary', isDisabled: false });

export function useButton() {
  return useContext(ButtonCtx);
}

const ButtonLabel: React.FC<TextProps & { className?: string }> = ({
  style,
  children,
  ...props
}) => {
  const { size, variant, isDisabled } = useButton();
  const palette = usePalette();
  const color =
    variant === 'outline' || variant === 'ghost' || variant === 'tertiary'
      ? palette.accent
      : variant === 'secondary'
      ? palette.defaultForeground
      : variant === 'danger-soft'
      ? palette.danger
      : palette.accentForeground;

  const fontSize = size === 'sm' ? 14 : size === 'lg' ? 16 : 15;

  return (
    <Text
      style={[
        {
          color: isDisabled ? palette.muted : color,
          fontSize,
          fontWeight: '500',
          textAlign: 'center',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const ButtonRoot: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isIconOnly = false,
  isDisabled = false,
  disabled,
  style,
  children,
  ...props
}) => {
  const palette = usePalette();
  const off = isDisabled || !!disabled;

  const bg =
    variant === 'primary'
      ? palette.accent
      : variant === 'secondary'
      ? palette.default
      : variant === 'danger'
      ? palette.danger
      : variant === 'danger-soft'
      ? palette.dangerSoft
      : 'transparent';

  const borderColor =
    variant === 'outline' ? palette.accent : 'transparent';
  const borderWidth = variant === 'outline' ? 1.5 : 0;

  const padV = size === 'sm' ? 8 : size === 'lg' ? 16 : 12;
  const padH = size === 'sm' ? 12 : size === 'lg' ? 24 : 16;
  const minH = size === 'sm' ? 40 : size === 'lg' ? 56 : TouchTargets.min;

  const content =
    typeof children === 'string' ? <ButtonLabel>{children}</ButtonLabel> : children;

  return (
    <ButtonCtx.Provider value={{ size, variant, isDisabled: off }}>
      <Pressable
        disabled={off}
        accessibilityRole="button"
        style={({ pressed }) => [
          {
            backgroundColor: bg,
            borderColor,
            borderWidth,
            borderRadius: BorderRadius.md,
            paddingVertical: isIconOnly ? 0 : padV,
            paddingHorizontal: isIconOnly ? 0 : padH,
            minHeight: minH,
            minWidth: isIconOnly ? minH : undefined,
            width: isIconOnly ? minH : undefined,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            opacity: off ? 0.5 : pressed ? 0.92 : 1,
            transform: [{ scale: pressed && !off ? 0.98 : 1 }],
          },
          style as StyleProp<ViewStyle>,
        ]}
        {...props}
      >
        {content}
      </Pressable>
    </ButtonCtx.Provider>
  );
};

export const Button = Object.assign(ButtonRoot, {
  Label: ButtonLabel,
  Background: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
});

export const LinkButton: React.FC<ButtonProps> = (props) => (
  <Button variant="ghost" {...props} />
);

export const CloseButton: React.FC<ButtonProps> = (props) => (
  <Button variant="ghost" isIconOnly size="sm" accessibilityLabel="Close" {...props}>
    <Text style={{ fontSize: 18, color: Colors.light.muted }}>×</Text>
  </Button>
);

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

const CardHeader: React.FC<ViewProps & { className?: string }> = ({
  style,
  children,
  ...props
}) => (
  <View style={[{ marginBottom: Spacing.sm }, style]} {...props}>
    {children}
  </View>
);

const CardBody: React.FC<ViewProps & { className?: string }> = ({
  style,
  children,
  ...props
}) => (
  <View style={[{ flexGrow: 1, gap: 4 }, style]} {...props}>
    {children}
  </View>
);

const CardFooter: React.FC<ViewProps & { className?: string }> = ({
  style,
  children,
  ...props
}) => (
  <View
    style={[
      {
        marginTop: Spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      },
      style,
    ]}
    {...props}
  >
    {children}
  </View>
);

const CardTitle: React.FC<TypographyProps> = (props) => (
  <Typography type="h5" weight="medium" {...props} />
);

const CardDescription: React.FC<TypographyProps> = (props) => (
  <Typography type="body-sm" color="muted" {...props} />
);

const CardRoot: React.FC<SurfaceProps> = ({ style, children, ...props }) => (
  <Surface
    style={[{ padding: Spacing.md, borderRadius: BorderRadius.xl }, style]}
    {...props}
  >
    {children}
  </Surface>
);

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
});

// ---------------------------------------------------------------------------
// Form primitives: Label, Description, FieldError, Input, TextArea, TextField
// ---------------------------------------------------------------------------

const FormCtx = createContext<{
  isDisabled: boolean;
  isInvalid: boolean;
  isRequired: boolean;
}>({ isDisabled: false, isInvalid: false, isRequired: false });

export function useTextField() {
  return useContext(FormCtx);
}

export const Label: React.FC<
  TextProps & { className?: string; isRequired?: boolean }
> = ({ style, children, isRequired, ...props }) => {
  const palette = usePalette();
  const ctx = useContext(FormCtx);
  const required = isRequired ?? ctx.isRequired;
  return (
    <Text
      style={[
        {
          fontSize: 14,
          fontWeight: '500',
          color: palette.foreground,
          marginBottom: Spacing.xs,
        },
        style,
      ]}
      {...props}
    >
      {children}
      {required ? (
        <Text style={{ color: palette.danger }}> *</Text>
      ) : null}
    </Text>
  );
};

export const Description: React.FC<TextProps & { className?: string }> = ({
  style,
  children,
  ...props
}) => {
  const palette = usePalette();
  return (
    <Text
      style={[
        { fontSize: 12, color: palette.muted, marginTop: 4 },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const FieldError: React.FC<TextProps & { className?: string }> = ({
  style,
  children,
  ...props
}) => {
  const palette = usePalette();
  const { isInvalid } = useContext(FormCtx);
  if (!children && !isInvalid) return null;
  return (
    <Text
      style={[
        { fontSize: 12, color: palette.danger, marginTop: 4, fontWeight: '500' },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export interface InputProps extends TextInputProps {
  className?: string;
  variant?: 'primary' | 'secondary';
  isInvalid?: boolean;
  isDisabled?: boolean;
}

export const Input = React.forwardRef<any, InputProps>(
  (
    {
      style,
      variant = 'primary',
      isInvalid,
      isDisabled,
      editable,
      ...props
    },
    ref
  ) => {
    const palette = usePalette();
    const ctx = useContext(FormCtx);
    const invalid = isInvalid ?? ctx.isInvalid;
    const disabled = isDisabled ?? ctx.isDisabled;

    return (
      <TextInput
        ref={ref}
        editable={editable !== undefined ? editable : !disabled}
        placeholderTextColor={palette.fieldPlaceholder}
        style={[
          {
            minHeight: TouchTargets.min,
            backgroundColor:
              variant === 'secondary' ? palette.default : palette.field,
            color: palette.fieldForeground,
            borderWidth: 1,
            borderColor: invalid ? palette.danger : palette.fieldBorder,
            borderRadius: BorderRadius.lg,
            paddingHorizontal: Spacing.md,
            paddingVertical: 12,
            fontSize: 16,
          },
          style,
        ]}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export const TextArea = React.forwardRef<TextInput, InputProps>(
  ({ style, ...props }, ref) => (
    <Input
      ref={ref}
      multiline
      textAlignVertical="top"
      style={[{ minHeight: 96, paddingTop: 12 }, style]}
      {...props}
    />
  ),
);
TextArea.displayName = 'TextArea';

export interface TextFieldProps extends ViewProps {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const TextFieldRoot: React.FC<TextFieldProps> = ({
  isDisabled = false,
  isInvalid = false,
  isRequired = false,
  style,
  children,
  ...props
}) => (
  <FormCtx.Provider value={{ isDisabled, isInvalid, isRequired }}>
    <View style={[{ marginVertical: Spacing.xs, gap: 4 }, style]} {...props}>
      {children}
    </View>
  </FormCtx.Provider>
);

export const TextField = Object.assign(TextFieldRoot, {
  Label,
  Input,
  Description,
  FieldError,
});

// ---------------------------------------------------------------------------
// InputGroup
// ---------------------------------------------------------------------------

const InputGroupPrefix: React.FC<
  ViewProps & { isDecorative?: boolean; className?: string }
> = ({ style, children, ...props }) => (
  <View
    style={[
      {
        position: 'absolute',
        left: 12,
        zIndex: 1,
        height: '100%',
        justifyContent: 'center',
      },
      style,
    ]}
    pointerEvents="box-none"
    {...props}
  >
    {children}
  </View>
);

const InputGroupSuffix: React.FC<
  ViewProps & { isDecorative?: boolean; className?: string }
> = ({ style, children, ...props }) => (
  <View
    style={[
      {
        position: 'absolute',
        right: 12,
        zIndex: 1,
        height: '100%',
        justifyContent: 'center',
      },
      style,
    ]}
    pointerEvents="box-none"
    {...props}
  >
    {children}
  </View>
);

const InputGroupInput: React.FC<InputProps> = (props) => (
  <Input {...props} style={[{ paddingLeft: 40, paddingRight: 40 }, props.style]} />
);

const InputGroupRoot: React.FC<ViewProps & { className?: string; isDisabled?: boolean }> = ({
  style,
  children,
  ...props
}) => (
  <View style={[{ position: 'relative', justifyContent: 'center' }, style]} {...props}>
    {children}
  </View>
);

export const InputGroup = Object.assign(InputGroupRoot, {
  Prefix: InputGroupPrefix,
  Suffix: InputGroupSuffix,
  Input: InputGroupInput,
});

// ---------------------------------------------------------------------------
// SearchField
// ---------------------------------------------------------------------------

const SearchCtx = createContext<{
  value?: string;
  onChange?: (v: string) => void;
  isDisabled: boolean;
  isInvalid: boolean;
  isRequired: boolean;
}>({ isDisabled: false, isInvalid: false, isRequired: false });

export function useSearchField() {
  return useContext(SearchCtx);
}

const SearchFieldGroup: React.FC<ViewProps & { className?: string }> = ({
  style,
  children,
  ...props
}) => (
  <View style={[{ position: 'relative', justifyContent: 'center' }, style]} {...props}>
    {children}
  </View>
);

const SearchFieldSearchIcon: React.FC<
  ViewProps & { className?: string; iconProps?: { size?: number; color?: string } }
> = ({ style, children, iconProps, ...props }) => {
  const palette = usePalette();
  return (
    <View
      style={[
        {
          position: 'absolute',
          left: 14,
          zIndex: 1,
          height: '100%',
          justifyContent: 'center',
        },
        style,
      ]}
      pointerEvents="none"
      {...props}
    >
      {children ?? (
        <Text style={{ color: iconProps?.color || palette.muted, fontSize: iconProps?.size || 16 }}>
          ⌕
        </Text>
      )}
    </View>
  );
};

const SearchFieldInput: React.FC<Omit<InputProps, 'value' | 'onChangeText'>> = (
  props
) => {
  const { value, onChange, isDisabled, isInvalid } = useSearchField();
  return (
    <Input
      value={value}
      onChangeText={onChange}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      placeholder="Search"
      returnKeyType="search"
      accessibilityRole="search"
      style={[{ paddingLeft: 40, paddingRight: 40 }, props.style]}
      {...props}
    />
  );
};

const SearchFieldClearButton: React.FC<ButtonProps> = (props) => {
  const { value, onChange } = useSearchField();
  if (!value) return null;
  return (
    <View style={{ position: 'absolute', right: 8, zIndex: 1 }}>
      <Button
        variant="ghost"
        isIconOnly
        size="sm"
        onPress={() => onChange?.('')}
        accessibilityLabel="Clear search"
        {...props}
      >
        <Text style={{ fontSize: 14, color: Colors.light.muted }}>×</Text>
      </Button>
    </View>
  );
};

const SearchFieldRoot: React.FC<
  ViewProps & {
    value?: string;
    onChange?: (v: string) => void;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isRequired?: boolean;
    className?: string;
  }
> = ({
  value,
  onChange,
  isDisabled = false,
  isInvalid = false,
  isRequired = false,
  style,
  children,
  ...props
}) => (
  <SearchCtx.Provider value={{ value, onChange, isDisabled, isInvalid, isRequired }}>
    <FormCtx.Provider value={{ isDisabled, isInvalid, isRequired }}>
      <View style={[{ gap: 4 }, style]} {...props}>
        {children}
      </View>
    </FormCtx.Provider>
  </SearchCtx.Provider>
);

export const SearchField = Object.assign(SearchFieldRoot, {
  Group: SearchFieldGroup,
  SearchIcon: SearchFieldSearchIcon,
  Input: SearchFieldInput,
  ClearButton: SearchFieldClearButton,
});

// ---------------------------------------------------------------------------
// InputOTP
// ---------------------------------------------------------------------------

export const REGEXP_ONLY_DIGITS = '^[0-9]+$';
export const REGEXP_ONLY_CHARS = '^[a-zA-Z]+$';
export const REGEXP_ONLY_DIGITS_AND_CHARS = '^[a-zA-Z0-9]+$';

type InputOTPCtxValue = {
  value: string;
  maxLength: number;
  setValue: (v: string) => void;
  isInvalid: boolean;
  isDisabled: boolean;
  focused: boolean;
  setFocused: (v: boolean) => void;
};

const InputOTPCtx = createContext<InputOTPCtxValue | null>(null);

export function useInputOTP() {
  const ctx = useContext(InputOTPCtx);
  if (!ctx) throw new Error('useInputOTP must be used within InputOTP');
  return ctx;
}

const InputOTPSlot: React.FC<{
  index: number;
  className?: string;
  children?: React.ReactNode;
}> = ({ index, children }) => {
  const ctx = useInputOTP();
  const palette = usePalette();
  const char = ctx.value[index] || '';
  const isActive = ctx.focused && ctx.value.length === index;

  return (
    <View
      style={{
        width: 44,
        height: 52,
        borderRadius: BorderRadius.md,
        borderWidth: 1.5,
        borderColor: ctx.isInvalid
          ? palette.danger
          : isActive
          ? palette.accent
          : palette.border,
        backgroundColor: palette.field,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children ?? (
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            color: palette.foreground,
            fontVariant: ['tabular-nums'],
          }}
        >
          {char}
        </Text>
      )}
    </View>
  );
};

const InputOTPGroup: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
}) => (
  <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
    {children}
  </View>
);

const InputOTPSeparator: React.FC<{ className?: string }> = () => {
  const palette = usePalette();
  return (
    <View
      style={{
        width: 8,
        height: 2,
        backgroundColor: palette.separator,
        borderRadius: 1,
        marginHorizontal: 4,
      }}
    />
  );
};

const InputOTPRoot: React.FC<{
  maxLength: number;
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
  onComplete?: (v: string) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  children?: React.ReactNode;
  className?: string;
}> = ({
  maxLength,
  value: controlled,
  defaultValue = '',
  onChange,
  onComplete,
  isDisabled = false,
  isInvalid = false,
  children,
}) => {
  const [internal, setInternal] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const value = controlled ?? internal;
  const inputRef = useRef<any>(null);
  const palette = usePalette();

  const setValue = (next: string) => {
    const clipped = next.slice(0, maxLength);
    if (controlled === undefined) setInternal(clipped);
    onChange?.(clipped);
    if (clipped.length === maxLength) onComplete?.(clipped);
  };

  return (
    <InputOTPCtx.Provider
      value={{ value, maxLength, setValue, isInvalid, isDisabled, focused, setFocused }}
    >
      <Pressable
        disabled={isDisabled}
        onPress={() => inputRef.current?.focus()}
        style={{ alignItems: 'center' }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          {children}
        </View>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={(t) => setValue(t.replace(/\D/g, ''))}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType="number-pad"
          maxLength={maxLength}
          editable={!isDisabled}
          style={{
            position: 'absolute',
            opacity: 0,
            width: 1,
            height: 1,
          }}
          caretHidden
        />
      </Pressable>
    </InputOTPCtx.Provider>
  );
};

export const InputOTP = Object.assign(InputOTPRoot, {
  Group: InputOTPGroup,
  Slot: InputOTPSlot,
  Separator: InputOTPSeparator,
  SlotPlaceholder: ({ children }: { children?: string }) => (
    <Text style={{ color: Colors.light.muted }}>{children}</Text>
  ),
  SlotValue: ({ children }: { children?: string }) => <Text>{children}</Text>,
  SlotCaret: () => {
    const palette = usePalette();
    return (
      <View
        style={{
          width: 2,
          height: 20,
          backgroundColor: palette.accent,
          borderRadius: 1,
        }}
      />
    );
  },
});

// ---------------------------------------------------------------------------
// Chip
// ---------------------------------------------------------------------------

type ChipColor = 'accent' | 'default' | 'success' | 'warning' | 'danger';
type ChipVariant = 'primary' | 'secondary' | 'tertiary' | 'soft';

export interface ChipProps extends PressableProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: ChipVariant;
  color?: ChipColor;
  className?: string;
  children?: React.ReactNode;
}

const ChipCtx = createContext<{
  size: 'sm' | 'md' | 'lg';
  variant: ChipVariant;
  color: ChipColor;
}>({ size: 'md', variant: 'primary', color: 'accent' });

export function useChip() {
  return useContext(ChipCtx);
}

const ChipLabel: React.FC<TextProps & { className?: string }> = ({
  style,
  children,
  ...props
}) => {
  const { size, variant, color } = useChip();
  const palette = usePalette();
  const soft = variant === 'soft' || variant === 'secondary' || variant === 'tertiary';
  const colorMap: Record<ChipColor, { solid: string; softFg: string }> = {
    accent: { solid: palette.accentForeground, softFg: palette.accentSoftForeground },
    default: { solid: palette.defaultForeground, softFg: palette.muted },
    success: {
      solid: palette.successForeground,
      softFg: palette.successSoftForeground,
    },
    warning: {
      solid: palette.warningForeground,
      softFg: palette.warningSoftForeground,
    },
    danger: {
      solid: palette.dangerForeground,
      softFg: palette.dangerSoftForeground,
    },
  };
  const fontSize = size === 'sm' ? 11 : size === 'lg' ? 14 : 12;
  return (
    <Text
      style={[
        {
          fontSize,
          fontWeight: '500',
          color: soft ? colorMap[color].softFg : colorMap[color].solid,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const ChipRoot: React.FC<ChipProps> = ({
  size = 'md',
  variant = 'soft',
  color = 'default',
  style,
  children,
  ...props
}) => {
  const palette = usePalette();
  const soft = variant === 'soft' || variant === 'secondary' || variant === 'tertiary';
  const bgMap: Record<ChipColor, { solid: string; soft: string }> = {
    accent: { solid: palette.accent, soft: palette.accentSoft },
    default: { solid: palette.default, soft: palette.surfaceSecondary },
    success: { solid: palette.success, soft: palette.successSoft },
    warning: { solid: palette.warning, soft: palette.warningSoft },
    danger: { solid: palette.danger, soft: palette.dangerSoft },
  };
  const padV = size === 'sm' ? 2 : size === 'lg' ? 6 : 4;
  const padH = size === 'sm' ? 8 : size === 'lg' ? 12 : 10;
  const content =
    typeof children === 'string' ? <ChipLabel>{children}</ChipLabel> : children;

  return (
    <ChipCtx.Provider value={{ size, variant, color }}>
      <Pressable
        style={[
          {
            backgroundColor: soft ? bgMap[color].soft : bgMap[color].solid,
            paddingVertical: padV,
            paddingHorizontal: padH,
            borderRadius: BorderRadius.round,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            alignSelf: 'flex-start',
          },
          style as StyleProp<ViewStyle>,
        ]}
        {...props}
      >
        {content}
      </Pressable>
    </ChipCtx.Provider>
  );
};

export const Chip = Object.assign(ChipRoot, {
  Label: ChipLabel,
  Background: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
});

// ---------------------------------------------------------------------------
// Alert
// ---------------------------------------------------------------------------

type AlertStatus = 'default' | 'accent' | 'success' | 'warning' | 'danger';

const AlertCtx = createContext<{ status: AlertStatus }>({ status: 'default' });

export function useAlert() {
  return useContext(AlertCtx);
}

const AlertIndicator: React.FC<
  ViewProps & { className?: string; children?: React.ReactNode }
> = ({ style, children, ...props }) => {
  const { status } = useAlert();
  const palette = usePalette();
  const color =
    status === 'success'
      ? palette.success
      : status === 'warning'
      ? palette.warning
      : status === 'danger'
      ? palette.danger
      : status === 'accent'
      ? palette.accent
      : palette.muted;
  return (
    <View style={[{ paddingTop: 2 }, style]} {...props}>
      {children ?? (
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: color,
            marginTop: 6,
          }}
        />
      )}
    </View>
  );
};

const AlertContent: React.FC<ViewProps & { className?: string }> = ({
  style,
  children,
  ...props
}) => (
  <View style={[{ flex: 1, gap: 2 }, style]} {...props}>
    {children}
  </View>
);

const AlertTitle: React.FC<TextProps & { className?: string }> = ({
  style,
  children,
  ...props
}) => {
  const { status } = useAlert();
  const palette = usePalette();
  const color =
    status === 'success'
      ? palette.successSoftForeground
      : status === 'warning'
      ? palette.warningSoftForeground
      : status === 'danger'
      ? palette.dangerSoftForeground
      : status === 'accent'
      ? palette.accentSoftForeground
      : palette.foreground;
  return (
    <Text style={[{ fontSize: 15, fontWeight: '500', color }, style]} {...props}>
      {children}
    </Text>
  );
};

const AlertDescription: React.FC<TextProps & { className?: string }> = ({
  style,
  children,
  ...props
}) => {
  const palette = usePalette();
  return (
    <Text style={[{ fontSize: 13, color: palette.muted, lineHeight: 18 }, style]} {...props}>
      {children}
    </Text>
  );
};

const AlertRoot: React.FC<
  ViewProps & { status?: AlertStatus; className?: string }
> = ({ status = 'default', style, children, ...props }) => {
  const palette = usePalette();
  const bg =
    status === 'success'
      ? palette.successSoft
      : status === 'warning'
      ? palette.warningSoft
      : status === 'danger'
      ? palette.dangerSoft
      : status === 'accent'
      ? palette.accentSoft
      : palette.surfaceSecondary;

  return (
    <AlertCtx.Provider value={{ status }}>
      <View
        accessibilityRole="alert"
        style={[
          {
            backgroundColor: bg,
            borderRadius: BorderRadius.lg,
            padding: Spacing.md,
            flexDirection: 'row',
            gap: 12,
            alignItems: 'flex-start',
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    </AlertCtx.Provider>
  );
};

export const Alert = Object.assign(AlertRoot, {
  Indicator: AlertIndicator,
  Content: AlertContent,
  Title: AlertTitle,
  Description: AlertDescription,
});

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------

type AvatarColor = 'default' | 'accent' | 'success' | 'warning' | 'danger';

const AvatarCtx = createContext<{
  size: 'sm' | 'md' | 'lg';
  color: AvatarColor;
  status: 'loading' | 'loaded' | 'error';
  setStatus: (s: 'loading' | 'loaded' | 'error') => void;
}>({
  size: 'md',
  color: 'accent',
  status: 'loading',
  setStatus: () => {},
});

export function useAvatar() {
  return useContext(AvatarCtx);
}

const AvatarImage: React.FC<{
  source?: ImageSourcePropType;
  className?: string;
  asChild?: boolean;
  children?: React.ReactNode;
}> = ({ source, children, asChild }) => {
  const { setStatus } = useAvatar();
  if (asChild) return <>{children}</>;
  if (!source) return null;
  return (
    <Image
      source={source}
      onLoad={() => setStatus('loaded')}
      onError={() => setStatus('error')}
      style={StyleSheet.absoluteFill}
    />
  );
};

const AvatarFallback: React.FC<
  ViewProps & { className?: string; delayMs?: number; children?: React.ReactNode }
> = ({ style, children, ...props }) => {
  const { size, color, status } = useAvatar();
  const palette = usePalette();
  if (status === 'loaded') return null;
  const dim = size === 'sm' ? 32 : size === 'lg' ? 56 : 48;
  const bg =
    color === 'success'
      ? palette.success
      : color === 'warning'
      ? palette.warning
      : color === 'danger'
      ? palette.danger
      : color === 'default'
      ? palette.default
      : palette.accent;
  return (
    <View
      style={[
        {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: bg,
        },
        style,
      ]}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text
          style={{
            color: palette.accentForeground,
            fontWeight: '500',
            fontSize: dim * 0.36,
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
};

const AvatarRoot: React.FC<
  ViewProps & {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'soft';
    color?: AvatarColor;
    className?: string;
    alt?: string;
  }
> = ({ size = 'md', color = 'accent', style, children, alt = 'Avatar', ...props }) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const dim = size === 'sm' ? 32 : size === 'lg' ? 56 : 48;
  return (
    <AvatarCtx.Provider value={{ size, color, status, setStatus }}>
      <View
        accessibilityLabel={alt}
        style={[
          {
            width: dim,
            height: dim,
            borderRadius: dim / 2,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    </AvatarCtx.Provider>
  );
};

export const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
  Background: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
});

// ---------------------------------------------------------------------------
// Switch
// ---------------------------------------------------------------------------

export interface SwitchProps {
  isSelected?: boolean;
  isDisabled?: boolean;
  onSelectedChange?: (v: boolean) => void;
  className?: string;
  children?: React.ReactNode;
  animation?: unknown;
}

const SwitchRoot: React.FC<SwitchProps> = ({
  isSelected,
  isDisabled,
  onSelectedChange,
}) => {
  const palette = usePalette();
  return (
    <RNSwitch
      value={!!isSelected}
      disabled={isDisabled}
      onValueChange={onSelectedChange}
      trackColor={{ false: palette.border, true: palette.accent }}
      thumbColor={palette.accentForeground}
    />
  );
};

export const Switch = Object.assign(SwitchRoot, {
  Thumb: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  StartContent: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  EndContent: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  Background: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
});

// ---------------------------------------------------------------------------
// Separator
// ---------------------------------------------------------------------------

export const Separator: React.FC<
  ViewProps & {
    orientation?: 'horizontal' | 'vertical';
    variant?: 'thin' | 'thick';
    thickness?: number;
    className?: string;
  }
> = ({
  orientation = 'horizontal',
  variant = 'thin',
  thickness,
  style,
  ...props
}) => {
  const palette = usePalette();
  const size = thickness ?? (variant === 'thick' ? 2 : StyleSheet.hairlineWidth);
  return (
    <View
      style={[
        {
          backgroundColor: palette.separator,
          ...(orientation === 'horizontal'
            ? { height: size, width: '100%' }
            : { width: size, height: '100%' }),
        },
        style,
      ]}
      {...props}
    />
  );
};

// ---------------------------------------------------------------------------
// ListGroup
// ---------------------------------------------------------------------------

const ListGroupItemPrefix: React.FC<ViewProps & { className?: string }> = ({
  style,
  children,
  ...props
}) => (
  <View style={[{ marginRight: 12, width: 24, alignItems: 'center' }, style]} {...props}>
    {children}
  </View>
);

const ListGroupItemContent: React.FC<ViewProps & { className?: string }> = ({
  style,
  children,
  ...props
}) => (
  <View style={[{ flex: 1, gap: 2 }, style]} {...props}>
    {children}
  </View>
);

const ListGroupItemTitle: React.FC<TextProps & { className?: string }> = ({
  style,
  children,
  ...props
}) => {
  const palette = usePalette();
  return (
    <Text
      style={[{ fontSize: 15, fontWeight: '500', color: palette.foreground }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

const ListGroupItemDescription: React.FC<TextProps & { className?: string }> = ({
  style,
  children,
  ...props
}) => {
  const palette = usePalette();
  return (
    <Text style={[{ fontSize: 13, color: palette.muted }, style]} {...props}>
      {children}
    </Text>
  );
};

const ListGroupItemSuffix: React.FC<
  ViewProps & {
    className?: string;
    iconProps?: { size?: number; color?: string };
    children?: React.ReactNode;
  }
> = ({ style, children, iconProps, ...props }) => {
  const palette = usePalette();
  return (
    <View style={[{ marginLeft: 8 }, style]} {...props}>
      {children ?? (
        <Text style={{ color: iconProps?.color || palette.muted, fontSize: iconProps?.size || 16 }}>
          ›
        </Text>
      )}
    </View>
  );
};

const ListGroupItem: React.FC<PressableProps & { className?: string }> = ({
  style,
  children,
  ...props
}) => {
  const palette = usePalette();
  return (
    <Pressable
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
          paddingHorizontal: Spacing.md,
          minHeight: TouchTargets.min,
          backgroundColor: pressed ? palette.surfaceSecondary : 'transparent',
        },
        style as StyleProp<ViewStyle>,
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
};

const ListGroupRoot: React.FC<SurfaceProps> = ({ style, children, ...props }) => (
  <Surface
    style={[{ padding: 0, overflow: 'hidden', borderRadius: BorderRadius.lg }, style]}
    {...props}
  >
    {children}
  </Surface>
);

export const ListGroup = Object.assign(ListGroupRoot, {
  Item: ListGroupItem,
  ItemPrefix: ListGroupItemPrefix,
  ItemContent: ListGroupItemContent,
  ItemTitle: ListGroupItemTitle,
  ItemDescription: ListGroupItemDescription,
  ItemSuffix: ListGroupItemSuffix,
});

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

const TabsCtx = createContext<{
  value: string;
  onValueChange?: (v: string) => void;
  variant: 'primary' | 'secondary';
}>({ value: '', variant: 'primary' });

export function useTabs() {
  return useContext(TabsCtx);
}

const TabsList: React.FC<ViewProps & { className?: string; background?: React.ReactNode }> = ({
  style,
  children,
  ...props
}) => {
  const palette = usePalette();
  const { variant } = useTabs();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          backgroundColor: variant === 'primary' ? palette.default : 'transparent',
          borderRadius: BorderRadius.md,
          padding: variant === 'primary' ? 4 : 0,
          gap: 4,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const TabsTrigger: React.FC<
  PressableProps & {
    value: string;
    isDisabled?: boolean;
    className?: string;
    children?:
      | React.ReactNode
      | ((props: { isSelected: boolean; value: string; isDisabled: boolean }) => React.ReactNode);
  }
> = ({ value, isDisabled, style, children, ...props }) => {
  const { value: active, onValueChange, variant } = useTabs();
  const palette = usePalette();
  const isSelected = active === value;
  const content =
    typeof children === 'function'
      ? (children as any)({ isSelected, value, isDisabled: !!isDisabled })
      : children;

  return (
    <Pressable
      disabled={isDisabled}
      onPress={() => onValueChange?.(value)}
      style={[
        {
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: BorderRadius.sm,
          backgroundColor:
            isSelected && variant === 'primary' ? palette.surface : 'transparent',
          borderBottomWidth: variant === 'secondary' && isSelected ? 2 : 0,
          borderBottomColor: palette.accent,
          opacity: isDisabled ? 0.5 : 1,
        },
        style as StyleProp<ViewStyle>,
      ]}
      {...props}
    >
      {content}
    </Pressable>
  );
};

const TabsLabel: React.FC<TextProps & { className?: string }> = ({
  style,
  children,
  ...props
}) => {
  const palette = usePalette();
  return (
    <Text
      style={[{ fontSize: 13, fontWeight: '500', color: palette.foreground }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

const TabsContent: React.FC<
  ViewProps & { value: string; className?: string }
> = ({ value, style, children, ...props }) => {
  const { value: active } = useTabs();
  if (active !== value) return null;
  return (
    <View style={[{ marginTop: Spacing.md }, style]} {...props}>
      {children}
    </View>
  );
};

const TabsIndicator: React.FC<ViewProps & { className?: string }> = () => null;
const TabsSeparator: React.FC<{ betweenValues?: string[]; className?: string }> = () => null;
const TabsScrollView: React.FC<{
  children?: React.ReactNode;
  scrollAlign?: string;
  className?: string;
}> = ({ children }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {children}
  </ScrollView>
);

const TabsRoot: React.FC<
  ViewProps & {
    value?: string;
    onValueChange?: (v: string) => void;
    variant?: 'primary' | 'secondary';
    className?: string;
  }
> = ({ value = '', onValueChange, variant = 'primary', style, children, ...props }) => (
  <TabsCtx.Provider value={{ value, onValueChange, variant }}>
    <View style={style} {...props}>
      {children}
    </View>
  </TabsCtx.Provider>
);

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Label: TabsLabel,
  Content: TabsContent,
  Indicator: TabsIndicator,
  Separator: TabsSeparator,
  ScrollView: TabsScrollView,
  ListBackground: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
});

// ---------------------------------------------------------------------------
// Dialog
// ---------------------------------------------------------------------------

const DialogCtx = createContext<{
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
}>({ isOpen: false, onOpenChange: () => {} });

export function useDialog() {
  return useContext(DialogCtx);
}

const DialogTrigger: React.FC<{
  asChild?: boolean;
  children?: React.ReactNode;
}> = ({ asChild, children }) => {
  const { onOpenChange } = useDialog();
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onPress: () => onOpenChange(true),
    });
  }
  return (
    <Pressable onPress={() => onOpenChange(true)}>
      {children}
    </Pressable>
  );
};

const DialogPortal: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isOpen } = useDialog();
  return (
    <RNModal visible={isOpen} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        }}
      >
        {children}
      </View>
    </RNModal>
  );
};

const DialogOverlay: React.FC<{
  className?: string;
  isCloseOnPress?: boolean;
  variant?: string;
}> = ({ isCloseOnPress = true }) => {
  const { onOpenChange } = useDialog();
  return (
    <Pressable
      style={StyleSheet.absoluteFill}
      onPress={isCloseOnPress ? () => onOpenChange(false) : undefined}
    />
  );
};

const DialogContent: React.FC<ViewProps & { className?: string; isSwipeable?: boolean }> = ({
  style,
  children,
  ...props
}) => {
  const palette = usePalette();
  return (
    <View
      style={[
        {
          width: '100%',
          maxWidth: 420,
          backgroundColor: palette.overlay,
          borderRadius: BorderRadius.xl,
          padding: Spacing.lg,
          ...Shadows.lg,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const DialogClose: React.FC<ButtonProps> = (props) => {
  const { onOpenChange } = useDialog();
  return (
    <CloseButton
      onPress={() => onOpenChange(false)}
      style={[{ position: 'absolute', top: 12, right: 12, zIndex: 2 }, props.style as any]}
      {...props}
    />
  );
};

const DialogTitle: React.FC<TextProps & { className?: string }> = (props) => (
  <Typography type="h4" weight="medium" style={[{ marginBottom: 4 }, props.style]} {...props} />
);

const DialogDescription: React.FC<TextProps & { className?: string }> = (props) => (
  <Typography type="body-sm" color="muted" {...props} />
);

const DialogRoot: React.FC<{
  children?: React.ReactNode;
  isOpen?: boolean;
  isDefaultOpen?: boolean;
  onOpenChange?: (v: boolean) => void;
}> = ({ children, isOpen: controlled, isDefaultOpen = false, onOpenChange }) => {
  const [internal, setInternal] = useState(isDefaultOpen);
  const isOpen = controlled ?? internal;
  const setOpen = (v: boolean) => {
    if (controlled === undefined) setInternal(v);
    onOpenChange?.(v);
  };
  return (
    <DialogCtx.Provider value={{ isOpen, onOpenChange: setOpen }}>
      {children}
    </DialogCtx.Provider>
  );
};

export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Close: DialogClose,
  Title: DialogTitle,
  Description: DialogDescription,
});

// ---------------------------------------------------------------------------
// Spinner / Skeleton / PressableFeedback / ScrollShadow
// ---------------------------------------------------------------------------

export const Spinner: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}> = ({ size = 'md', color }) => {
  const palette = usePalette();
  const dim = size === 'sm' ? 'small' : 'large';
  return <ActivityIndicator size={dim} color={color || palette.accent} />;
};

export const Skeleton: React.FC<ViewProps & { className?: string; variant?: string }> = ({
  style,
  ...props
}) => {
  const palette = usePalette();
  return (
    <View
      style={[
        {
          backgroundColor: palette.surfaceSecondary,
          borderRadius: BorderRadius.sm,
          height: 16,
        },
        style,
      ]}
      {...props}
    />
  );
};

export const SkeletonGroup: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>{children}</>
);

export const PressableFeedback: React.FC<
  PressableProps & { className?: string; animation?: unknown; asChild?: boolean }
> & {
  Scale: React.FC<{ children?: React.ReactNode; className?: string }>;
  Highlight: React.FC<{ className?: string; animation?: unknown }>;
  Ripple: React.FC<{ className?: string; animation?: unknown }>;
} = Object.assign(
  ({ children, style, ...props }: PressableProps & { className?: string }) => (
    <Pressable
      style={({ pressed }) => [
        { opacity: pressed ? 0.92 : 1, transform: [{ scale: pressed ? 0.985 : 1 }] },
        style as StyleProp<ViewStyle>,
      ]}
      {...props}
    >
      {children}
    </Pressable>
  ),
  {
    Scale: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
    Highlight: () => null,
    Ripple: () => null,
  }
);

export const ScrollShadow: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children }) => <>{children}</>;

// ---------------------------------------------------------------------------
// ControlField (Switch/Checkbox field)
// ---------------------------------------------------------------------------

export const ControlField: React.FC<{
  isSelected?: boolean;
  onSelectedChange?: (v: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}> & {
  Indicator: React.FC<{ variant?: 'checkbox' | 'switch' }>;
} = Object.assign(
  ({
    isSelected,
    onSelectedChange,
    children,
  }: {
    isSelected?: boolean;
    onSelectedChange?: (v: boolean) => void;
    children?: React.ReactNode;
  }) => (
    <Pressable
      onPress={() => onSelectedChange?.(!isSelected)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        minHeight: TouchTargets.min,
      }}
    >
      {children}
    </Pressable>
  ),
  {
    Indicator: ({ variant = 'switch' }: { variant?: 'checkbox' | 'switch' }) => {
      // Parent ControlField should wrap; for fallback we render a simple switch
      return <Switch />;
    },
  }
);

// ---------------------------------------------------------------------------
// Checkbox / RadioGroup / TagGroup / Select / Menu / Popover / BottomSheet / Toast
// stubs for API completeness
// ---------------------------------------------------------------------------

export const Checkbox: React.FC<{
  isSelected?: boolean;
  onSelectedChange?: (v: boolean) => void;
  isDisabled?: boolean;
  className?: string;
}> = ({ isSelected, onSelectedChange, isDisabled }) => {
  const palette = usePalette();
  return (
    <Pressable
      disabled={isDisabled}
      onPress={() => onSelectedChange?.(!isSelected)}
      style={{
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: isSelected ? palette.accent : palette.border,
        backgroundColor: isSelected ? palette.accent : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isSelected ? (
        <Text style={{ color: palette.accentForeground, fontSize: 12, fontWeight: '700' }}>
          ✓
        </Text>
      ) : null}
    </Pressable>
  );
};

export const RadioGroup: React.FC<{
  value?: string;
  onValueChange?: (v: string) => void;
  children?: React.ReactNode;
  className?: string;
}> & {
  Item: React.FC<{ value: string; children?: React.ReactNode; className?: string }>;
} = Object.assign(
  ({ children }: { children?: React.ReactNode }) => <View style={{ gap: 8 }}>{children}</View>,
  {
    Item: ({ children }: { value: string; children?: React.ReactNode }) => (
      <View>{children}</View>
    ),
  }
);

export const Accordion: React.FC<{ children?: React.ReactNode }> & {
  Item: React.FC<{ children?: React.ReactNode; value?: string }>;
  Trigger: React.FC<{ children?: React.ReactNode }>;
  Content: React.FC<{ children?: React.ReactNode }>;
} = Object.assign(
  ({ children }: { children?: React.ReactNode }) => <View>{children}</View>,
  {
    Item: ({ children }: { children?: React.ReactNode }) => <View>{children}</View>,
    Trigger: ({ children }: { children?: React.ReactNode }) => <View>{children}</View>,
    Content: ({ children }: { children?: React.ReactNode }) => <View>{children}</View>,
  }
);

export const BottomSheet: React.FC<{ children?: React.ReactNode }> & {
  Trigger: React.FC<{ children?: React.ReactNode }>;
  Portal: React.FC<{ children?: React.ReactNode }>;
  Content: React.FC<{ children?: React.ReactNode }>;
} = Object.assign(
  ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  {
    Trigger: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
    Portal: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
    Content: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  }
);

export const Popover = BottomSheet;
export const Menu = BottomSheet;
export const Select = BottomSheet;
export const TagGroup = ListGroup;
export const Toast = { show: (_: unknown) => {}, dismiss: (_?: string) => {} };
export const PortalHost: React.FC<{ name?: string }> = () => null;
