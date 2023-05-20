import { styled } from "@linaria/react";
import { memo } from "react";

const Checkbox = styled.input`
  display: none;
`;

const Label = styled.label`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 50%;
    box-sizing: border-box;
    transition: background-color 0.3s ease-in-out;
  }

  ${Checkbox}:checked + &::after {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    width: 10px;
    height: 10px;
    background-color: #db4c3f;
    border-radius: 50%;
  }
`;

interface Props {
  checked: boolean;
  onChange: () => void;
  id: string;
}

const CircleCheckbox = memo(({ checked, onChange, id }: Props) => (
  <>
    <Checkbox type="checkbox" id={id} checked={checked} onChange={onChange} />
    <Label htmlFor={id} />
  </>
));

export default CircleCheckbox;
