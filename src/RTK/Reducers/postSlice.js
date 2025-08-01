import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// https://tarmeezacademy.com/api/v1/posts
// const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://wasal-api-production.up.railway.app" ;  
const API_URL = process.env.REACT_APP_API_URL ||"https://wasal-api-production.up.railway.app";
// console.log("API_URL in postSlice", API_URL);
export const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async (_, thunkAPI) => {
    const fetchWithRetry = async (retries = 3, delay = 2000) => {
      try {
        const res = await fetch(`${API_URL}/api/posts`);
        if (!res.ok) throw new Error('فشل في جلب المنشورات');
        const data = await res.json();
        console.log("Fetched posts:", data);
        return data.posts;
      } catch (error) {
        if (retries > 0) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          return fetchWithRetry(retries - 1, delay);
        } else {
          return thunkAPI.rejectWithValue('تعذر تحميل المنشورات بعد عدة محاولات، تحقق من الاتصال بالإنترنت');
        }
      }
    };
    return await fetchWithRetry();
  }
);
export const fetchPostById = createAsyncThunk(
  'post/fetchPostById',
  async (postId) => {
    const res = await fetch(`${API_URL}/api/posts/${postId}`);
    if (!res.ok) throw new Error('فشل في جلب المنشور');
    const data = await res.json();
    console.log("Fetched post by ID:", data);
    return data;
  }
);
export const fetchPostsByUserId = createAsyncThunk(
  'post/fetchPostsByUserId',
  async (userId) => {
    console.log("Fetching posts for user ID:", userId);
    if (!userId) throw new Error('معرف المستخدم غير صالح');
    const res = await fetch(`${API_URL}/api/posts/${userId}/posts`);
    if (!res.ok) throw new Error(' فشل في جلب المنشورات للمستخدم');
    const data = await res.json();
    console.log("Fetched posts by user ID postSlice :", data);
    return data;
  }
)
export const addPostAsync = createAsyncThunk(
  'post/addPost',
  async ({ formData, token }) => {
    const res = await fetch(`${API_URL}/api/posts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) throw new Error('فشل في اضافة المنشور');
    const data = await res.json();
    return data; // يحتوي على post و user و message
  }
);
export const editPostAsync = createAsyncThunk(
  'post/editPost',
  // console.log("Editing post with data:", postData),
  async (postData) => {
    console.log("Editing post with data:", postData);
    const res = await fetch(`${API_URL}/api/posts/${postData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage?.getItem('token')}`,
      },
      body: JSON.stringify(postData),
    });
    if (!res.ok) throw new Error('فشل في تعديل المنشور');
    const data = await res.json();
    console.log("Edited post:", data);
    return data;
  }
);
export const deletePostAsync = createAsyncThunk(
  'post/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage?.getItem('token')}`,
        },
      });
      if (!res.ok) {
        const data = await res.json();
        return rejectWithValue(data?.message || 'فشل في حذف المنشور');
      }
      return postId;
    } catch (error) {
      return rejectWithValue('فشل في حذف المنشور');
    }
  }
);
export const toggleLikeOnPost = createAsyncThunk(
  "likes/toggleLikeOnPost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/posts/${postId}/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("data in toggleLikeOnPost", data);
      console.log("data in toggleLikeOnPost -----", data.post.likes);

      if (!response.ok) return rejectWithValue(data.message);

      // هنا المفروض الباك يرجع post كامل أو likes فقط (حسب انت عامله إيه)
      return { postId, likes: data.post.likes };
    } catch (error) {
      return rejectWithValue("حدث خطأ أثناء تعديل الإعجاب");
    }
  }
);
export const getLikesForPost = createAsyncThunk(
  "likes/getLikesForPost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/posts/${postId}/likes`);
      const data = await response.json();
      console.log("data in getLikesForPost", data);
      if (!response.ok) return rejectWithValue(data.message);
      return { postId, likes: data.likes };
    } catch (error) {
      return rejectWithValue("حدث خطأ في جلب اللايكات");
    }
  }
);
const initialState = {
  posts: [],
  loading: false,
  error: null,
  selectedPost: null,
};
const postSlice = createSlice({
  name:'post',
  initialState,
  reducers: {
    updateLikesInPosts: (state, { payload: { postId, likes } }) => {
      // if(Array.isArray(state.posts)) {
      // console.log("postId in updateLikesInPosts", postId);
      // console.log("likes in updateLikesInPosts", likes);
      if (state.selectedPost?._id === postId) {
          state.selectedPost.likes = likes;
        }
      const post = state.posts.find(post => post._id === postId);
      console.log("post in updateLikesInPosts", post);
      if (post) post.likes = likes;
    // }
    },
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
        state.error = null;
        state.posts = action.payload;

        // console.log("Posts fetched successfully:", action.payload.posts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        // console.log("action.error.message", action.error)
        // console.log("action.error.payload", action.payload)
        state.error = action.error.message;
        // console.error("Error fetching posts:", action.error.message);
      })
      // Add post
      // .addCase(addPostAsync.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      .addCase(addPostAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const newPost = action.payload?.post;
        if (newPost) {
          if (!Array.isArray(state.posts)) {
            console.log(" state.posts", state.posts);
            state.posts = [];
            // احتياطيًا
          }
          state.posts.unshift(newPost);
        }
      })
      .addCase(addPostAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //  Fetch post by ID
      // .addCase(fetchPostById.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      //   state.selectedPost = null; // تفريغ القديم مؤقتًا
      // })
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
      // .addCase(editPostAsync.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      .addCase(editPostAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log("action.payload in editPostAsync", action.payload)
        if (Array.isArray(state.posts)) {
          state.posts = state.posts.map(post => {
            if (post._id === action.payload._id) {
              return action.payload;
            }
            return post;
          });
        }
      })
      .addCase(editPostAsync.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Error editing post:", action.error.message);
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
        if (Array.isArray(state.posts)) {
          state.posts = state.posts.filter(post => post._id !== action.payload);
        }
      })
      .addCase(deletePostAsync.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Error deleting post:", action.error.message);
      })
      // Like post
      // .addCase(toggleLikeOnPost.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      .addCase(toggleLikeOnPost.fulfilled, (state, action) => {
        state.loading = false
        state.error = null;
        const { postId, likes } = action.payload;
        console.log("toggleLikeOnPost fulfilled payload:", action.payload);
        console.log("(state.selectedPost?._id === postId ", state.selectedPost?._id === postId)
        // if (state.selectedPost?._id === postId) {
        //   state.selectedPost.likes = likes;
        // }
        // const { postId, likes } = action.payload;
        // if (Array.isArray(state.posts)) {
        //   const post = state?.posts?.find(p => p._id === postId);
        //   if (post) {
        //     post.likes = likes;
        //     console.log("Post likes updated:", post.likes);
        //   }
        // }
      })
      // .addCase(toggleLikeOnPost.fulfilled, (state, action) => {
      //   const { postId, likes } = action.payload;
      //   console.log("likes ", likes)
      //   console.log("toggleLikeOnPost fulfilled payload:", action.payload);
      //   state.loading = false;
      //   state.likesMap[postId] = likes;
      // })
      .addCase(toggleLikeOnPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Get likes for post
      .addCase(getLikesForPost.fulfilled, (state, action) => {
        const { postId, likes } = action.payload;
        state.loading = false;
        state.likesMap[postId] = likes;
      })
      .addCase(getLikesForPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
  },
});
export const { setPosts, addPost, editPosst, deletePost, setPostLoading, setPostError, resetPosts, updateLikesInPosts } = postSlice.actions;
export default postSlice.reducer;