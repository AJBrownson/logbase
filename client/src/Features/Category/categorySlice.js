import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import baseApi from './../../utils/api';

// Fetch categories
// export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
//   const response = await baseApi.get('/category/all'); // Adjust the URL as needed
//   return response.data;
// });

// export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (categoryId = null) => {
//   let url = '/category/all';
//   if (categoryId) {
//     url = `/category/${categoryId}`;
//   }
//   const response = await baseApi.get(url);
//   return response.data;
// });

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (categoryId = null) => {
  let url = '/category/all';
  if (categoryId && isValidObjectId(categoryId)) {
    url = `/category/${categoryId}`;
  }
  const response = await baseApi.get(url);
  return response.data;
});

function isValidObjectId(id) {
  if (typeof id !== 'string') return false;
  return id.match(/^[0-9a-fA-F]{24}$/) != null;
}

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    currentCategory: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;