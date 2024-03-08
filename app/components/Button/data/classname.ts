import { ComponentSize, ComponentStyle } from "@/types/components/generic.types";
import classNames from "classnames";
import { ButtonVariant } from "../index.types";

export const getClasses = (
  variant: ButtonVariant,
  styles: ComponentStyle,
  className: undefined | string,
  size: ComponentSize,
  fluid: undefined | boolean): string => {

  const defaultButtonClass = styles.button;
  const variantClass = getVariantClass(variant, styles);
  const sizeClass = getSizeClass(size, styles);
  const fluidClass = getFluidClass(fluid, styles);

  return classNames(
    defaultButtonClass,
    variantClass,
    sizeClass,
    fluidClass,
    className ?? null
  );
};


const getVariantClass = (variant: ButtonVariant, styles: ComponentStyle): string => {
  if (variant === "Primary") return styles.primary;

  if (variant === "Dark") return styles.dark;

  return "";
}

const getSizeClass = (size: ComponentSize, styles: ComponentStyle): string => {
  if (size === "Small") return styles.small;

  if (size === "Medium") return styles.medium;

  if (size === "Large") return styles.large;
  return "";
}

const getFluidClass = (fluid: undefined | boolean, styles: ComponentStyle): string => {
  if (fluid) return styles.fluid;

  return "";
}