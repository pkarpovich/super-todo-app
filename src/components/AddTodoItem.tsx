import { ChangeEvent, FormEvent, memo, useCallback, useState } from "react";
import { styled } from "@linaria/react";
import { useAppDispatch } from "../store/store.ts";
import { add } from "../store/todos-slice.ts";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 10%);
  outline: none;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: none;
  border-radius: 5px;
  resize: none;
  box-shadow: 0 3px 10px rgb(0 0 0 / 10%);
  outline: none;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #db4c3f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: bold;

  &:hover {
    background-color: #c23a30;
  }
`;

export const AddTodoItem = memo(() => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      switch (name) {
        case "title":
          setTitle(value);
          break;
        case "description":
          setDescription(value);
          break;
      }
    },
    []
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!title) {
        return;
      }

      dispatch(
        add({
          title,
          description,
        })
      );

      setTitle("");
      setDescription("");
    },
    [description, dispatch, title]
  );

  return (
    <Container data-testid="add-todo-form" onSubmit={handleSubmit}>
      <Input
        data-testid="title-input"
        value={title}
        placeholder="Title"
        name="title"
        required={true}
        onChange={handleChange}
      />
      <TextArea
        data-testid="description-input"
        value={description}
        placeholder="Description (optional)"
        name="description"
        onChange={handleChange}
      />
      <Button data-testid="add-todo-submit" type="submit">
        Add Todo
      </Button>
    </Container>
  );
});
