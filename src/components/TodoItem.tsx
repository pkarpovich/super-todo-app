import { memo, useId } from "react";
import { styled } from "@linaria/react";
import CircleCheckbox from "./CircleCheckbox.tsx";

const Container = styled.div`
  background: white;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  padding: 20px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

interface LabelProps {
  completed: boolean;
}

const Label = styled.label<LabelProps>`
  color: ${({ completed }) => (completed ? "#c2c2c2" : "#000")};
  cursor: pointer;
  font-weight: bold;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
`;

interface DescriptionProps {
  completed: boolean;
}

const Description = styled.p<DescriptionProps>`
  color: ${({ completed }) => (completed ? "#c2c2c2" : "#595959")};
  font-size: 0.8em;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
`;

const RemoveIcon = styled.div`
  cursor: pointer;
  color: #db4c3f;
`;

interface Props {
  title: string;
  description?: string;
  completed: boolean;
  onToggle: () => void;
  onRemove: () => void;
}

export const TodoItem = memo(
  ({ title, description, completed, onToggle, onRemove }: Props) => {
    const id = useId();

    return (
      <Container>
        <LabelContainer>
          <CircleCheckbox id={id} checked={completed} onChange={onToggle} />
          <div>
            <Label
              data-testid="toggle-icon"
              completed={completed}
              htmlFor={id}
              onChange={onToggle}
            >
              {title}
            </Label>
            <Description completed={completed}>{description}</Description>
          </div>
        </LabelContainer>
        <RemoveIcon data-testid="remove-icon" onClick={onRemove}>
          ✖
        </RemoveIcon>
      </Container>
    );
  }
);
