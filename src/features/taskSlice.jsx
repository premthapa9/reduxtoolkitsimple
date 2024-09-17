import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  task: [],
  loading: false,
  error: null,
  status: "All",
  edit: false,
  editID: null,
};

export const fetchtodo = createAsyncThunk("task/fetchtodo", async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  const json = await res.json();
  return json.map((task) => ({
    id: task.id,
    title: task.title,
    description: "",
    status: task.completed ? "Completed" : "To do",
  }));
});

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask(state, action) {
      state.task.push(action.payload);
    },
    deleteTask(state, action) {
      let item = state.task.filter((item) => item.id !== action.payload);
      state.task = item;
    },
    editTask(state, action) {
      state.edit = true;
      console.log(action.payload);
      state.editID = action.payload;
    },
    updateTask(state, action) {
      const { title, description, status, editID } = action.payload;
      state.task = state.task.map((item) => {
        return item.id === editID
          ? { ...item, title, description, status }
          : item;
      });
      state.edit = false;
      state.editID = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchtodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    }),
      builder.addCase(fetchtodo.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      }),
      builder.addCase(fetchtodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default taskSlice.reducer;
export const { addTask, deleteTask, editTask, updateTask } = taskSlice.actions;
