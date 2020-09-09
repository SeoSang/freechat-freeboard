import styled from "styled-components"

interface FlexDivProps {
  backgroundColor?: string
  width?: string
  height?: string
  flex?: string
  align?: string
  justify?: string
  direction?: "row" | "column"
}

export const FlexDiv = styled.div`
  display: ${(props: FlexDivProps) => props.flex || "flex"};
  flex-direction: ${(props: FlexDivProps) => props.direction || "row"};
  justify-content: ${(props: FlexDivProps) => props.justify || "center"};
  align-items: ${(props: FlexDivProps) => props.align || "center"};
  flex-wrap: wrap;
  background-color: ${(props: FlexDivProps) => props.backgroundColor || "auto"};
  height: ${(props: FlexDivProps) => props.height || "auto"};
  width: ${(props: FlexDivProps) => props.width || "auto"};
`
