import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// https://tarmeezacademy.com/api/v1/posts
// http://localhost:4000/api/posts
export const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async () => {
    const res = await fetch('http://localhost:4000/api/posts');
    if (!res.ok) throw new Error('فشل في جلب المنشورات ممكن تحديث الصفحه ');
    const data = await res.json();
    // console.log("Fetched posts:", data);
    return data; // Assuming the posts are in data.data
  }
);
export const fetchPostById = createAsyncThunk(
  'post/fetchPostById',
  async (postId) => {
    const res = await fetch(`http://localhost:4000/api/posts/${postId}`);
    if (!res.ok) throw new Error('Failed to fetch post');
    const data = await res.json();
    console.log("Fetched post by ID:", data);
    return data;
  }
);
export const fetchPostsByUserId = createAsyncThunk(
  'post/fetchPostsByUserId',
  async (userId) => {
    const res = await fetch(`http://localhost:4000/api/posts/${userId}/posts`);
    if (!res.ok) throw new Error('Failed to fetch posts by user ID');
    const data = await res.json();
    console.log("Fetched posts by user ID postSlice :", data);
    return data;
  }
)
export const addPostAsync = createAsyncThunk(
  'post/addPost',
  async ({ formData, token }) => {
    const res = await fetch('http://localhost:4000/api/posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to add post');
    const data = await res.json();
    return data; // يحتوي على post و user و message
  }
);
export const editPostAsync = createAsyncThunk(
  'post/editPost',
  // console.log("Editing post with data:", postData),
  async (postData) => {
    const res = await fetch(`http://localhost:4000/api/posts/${postData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    if (!res.ok) throw new Error('Failed to edit post');
    return res.json();
  }
);
export const deletePostAsync = createAsyncThunk(
  'post/deletePost',
  async (postId) => {
    const res = await fetch(`http://localhost:4000/api/posts/${postId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('فشل في حذف المنشور');
    return postId;
  }
);

const initialState = {
  posts: [],
  loading: false,
  error: null,
  selectedPost: null, // To store the post fetched by ID
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    addPost(state, action) {
      state.posts.unshift(action.payload);
    },
    editPosst(state, action) {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost(state, action) {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    setPostLoading(state, action) {
      state.loading = action.payload;
    },
    setPostError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
        // console.log("Posts fetched successfully:", action.payload.posts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error("Error fetching posts:", action.error.message);
      })
      // Add post
       .addCase(addPostAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPostAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const newPost = action.payload?.post;
        if (newPost) {
          state.posts.unshift(newPost);
        }
      })
      .addCase(addPostAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //  Fetch post by ID
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedPost = null; // تفريغ القديم مؤقتًا
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedPost = action.payload; 
        console.log("Fetched post by ID successfully:", action.payload);
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.selectedPost = null;
      })
      // Fetch posts by user ID
      .addCase(fetchPostsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(fetchPostsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Edit post
      .addCase(editPostAsync.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      // Delete post
      .addCase(deletePostAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log("Post deleted successfully:", action.payload);
        state.posts = state.posts.filter(post => post._id !== action.payload);
      })
      .addCase(deletePostAsync.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Error deleting post:", action.error.message);
      });
  },
});
export const { setPosts, addPost, editPosst, deletePost, setPostLoading, setPostError } = postSlice.actions;
export default postSlice.reducer;