import mongoose from "mongoose";

interface TodoProps extends Document {
  title: string;
  description: string;
  isDone: boolean;
}

const TodoSchema = new mongoose.Schema<TodoProps>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.models.Todo||mongoose.model<TodoProps>("Todo", TodoSchema);
export default Todo;