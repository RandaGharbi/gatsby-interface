/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import { FormFieldBlockLayout } from "./FormField"
import {
  AriaFormFieldData,
  useAriaFormField,
  AriaFormGroupFieldData,
  useAriaFormGroupField,
  ErrorValidationMode,
} from "../../form-skeletons"
import {
  FormError,
  FormHint,
  StyledLabel,
  StyledGroupLabel,
  StyledLabelSize,
  FieldLayoutContainer,
} from "./styled-primitives/StyledFormElements"

export type CommonFieldBlockProps = {
  id: string
  label: React.ReactNode
  labelSize?: StyledLabelSize
  error?: React.ReactNode
  hint?: React.ReactNode
  validationMode?: ErrorValidationMode
  layout?: FormFieldBlockLayout
}

export type RenderFieldControl = (
  controlProps: AriaFormFieldData["controlProps"]
) => React.ReactNode

export type FormFieldBlockProps = CommonFieldBlockProps & {
  required?: boolean
  className?: string
  children: React.ReactNode | RenderFieldControl
}

export function FormFieldBlock({
  id,
  label,
  error,
  hint,
  required,
  labelSize,
  validationMode,
  layout,
  className,
  children,
}: FormFieldBlockProps) {
  const fieldData = useAriaFormField(id, {
    required: required,
    hasError: !!error,
    hasHint: !!hint,
    validationMode,
  })

  return (
    <FormFieldBlockBoilerplate
      fieldData={fieldData}
      label={label}
      error={error}
      hint={hint}
      layout={layout}
      labelSize={labelSize}
      className={className}
    >
      {typeof children === `function`
        ? children(fieldData.controlProps)
        : children}
    </FormFieldBlockBoilerplate>
  )
}
export function FormFieldBlockBoilerplate({
  fieldData,
  children,
  label,
  error,
  hint,
  layout,
  labelSize,
  ...rest
}: Omit<React.ComponentPropsWithoutRef<"div">, "label"> & {
  fieldData: AriaFormFieldData
  label?: React.ReactNode
  labelSize?: StyledLabelSize
  error?: React.ReactNode
  hint?: React.ReactNode
  layout?: FormFieldBlockLayout
}) {
  return (
    <FieldLayoutContainer layout={layout} {...rest}>
      <StyledLabel
        required={fieldData.controlProps.required}
        labelSize={labelSize}
        {...fieldData.labelProps}
        css={{ display: `block` }}
      >
        {label}
      </StyledLabel>
      <div>
        {children}
        <FormHint {...fieldData.hintProps}>{hint}</FormHint>
        <FormError {...fieldData.errorProps}>{error}</FormError>
      </div>
    </FieldLayoutContainer>
  )
}

/**
 * Group field organism
 *
 */

export type RenderGroupFieldControl = (
  controlProps: Pick<
    AriaFormGroupFieldData,
    "getOptionControlProps" | "getOptionLabelProps"
  >
) => React.ReactNode

export type FormGroupFieldBlockProps = CommonFieldBlockProps & {
  required?: boolean
  className?: string
  role?: "group" | "radiogroup"
  children: RenderGroupFieldControl
}

export function FormGroupFieldBlock({
  id,
  label,
  error,
  hint,
  required,
  labelSize,
  validationMode,
  layout,
  className,
  role = `group`,
  children,
}: FormGroupFieldBlockProps) {
  const fieldData = useAriaFormGroupField(id, {
    required: required,
    error,
    hint,
    validationMode,
  })

  return (
    <FormGroupFieldBlockBoilerplate
      fieldData={fieldData}
      label={label}
      error={error}
      hint={hint}
      layout={layout}
      labelSize={labelSize}
      role={role}
      className={className}
    >
      {children({
        getOptionControlProps: fieldData.getOptionControlProps,
        getOptionLabelProps: fieldData.getOptionLabelProps,
      })}
    </FormGroupFieldBlockBoilerplate>
  )
}

export function FormGroupFieldBlockBoilerplate({
  fieldData,
  children,
  label,
  error,
  hint,
  layout,
  labelSize,
  ...rest
}: Omit<React.ComponentPropsWithoutRef<"div">, "label"> & {
  fieldData: AriaFormGroupFieldData
  label?: React.ReactNode
  labelSize?: StyledLabelSize
  error?: React.ReactNode
  hint?: React.ReactNode
  layout?: FormFieldBlockLayout
}) {
  return (
    <FieldLayoutContainer
      layout={layout}
      {...fieldData.groupContainerProps}
      {...rest}
    >
      <StyledGroupLabel
        labelSize={labelSize}
        required={fieldData.meta.required}
        {...fieldData.getGroupLabelProps(label)}
        css={{ display: `block` }}
      />
      <div>
        {children}
        <FormHint {...fieldData.hintProps}>{hint}</FormHint>
        <FormError {...fieldData.errorProps}>{error}</FormError>
      </div>
    </FieldLayoutContainer>
  )
}
