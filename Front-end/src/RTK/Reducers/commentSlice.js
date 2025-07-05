// features/comments/commentSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// const API_URL = process.env.NEXT_PUBLIC_API_URL ||"https://wasal-api-production.up.railway.app";
const API_URL = process.env.REACT_APP_API_URL ||"https://wasal-api-production.up.railway.app";

// إرسال تعليق جديد
export const submitComment = createAsyncThunk(
    "comments/submitComment",
    async ({ postId, content }, { rejectWithValue }) => {
        console.log("postId", postId, "content", content);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/api/posts/${postId}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content }), // ✅ صح
            });
            const data = await response.json();
            console.log("data in submitComment", data);
            if (!response.ok) return rejectWithValue(data.message);
            return { postId, comment: data.data };
        } catch (error) {
            return rejectWithValue("حدث خطأ أثناء الاتصال بالسيرفر");
        }
    }
);
// get  comments for post
export const getCommentsForPost = createAsyncThunk(
    "comments/getCommentsForPost",
    async (postId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/api/posts/${postId}/comments`);
            const data = await response.json();
            if (!response.ok) return rejectWithValue(data.message);
            console.log("data in getCommentsForPost", data)
            console.log("data in getCommentsForPost", data)
            return { postId, comments: data };
        } catch (error) {
            return rejectWithValue("حدث خطاء في جلب التعليقات");
        }
    }
);
// edite comment
export const editCommentAsync = createAsyncThunk(
    "comments/editCommentAsync",
    async ({ postId, commentId, content }, { rejectWithValue }) => {
        console.log("postId", postId, "commentId", commentId, "content", content);
        try {
            const response = await fetch(`${API_URL}/api/posts/${postId}/comments/${commentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage?.getItem('token')}`,
                },
                body: JSON.stringify({ content }),
            });
            const data = await response.json();
            if (!response.ok) return rejectWithValue(data.message);
            return { postId, commentId, content };
        } catch (error) {
            return rejectWithValue("حدث خطاء في تعديل التعليق");
        }
    }
)
// delete comment from post
export const deleteCommentAsync = createAsyncThunk(
    "comments/deleteCommentAsync",
    async ({ postId, commentId }, { rejectWithValue }) => {
        console.log("postId", postId, "commentId", commentId);
        try {
            const response = await fetch(`${API_URL}/api/posts/${postId}/comments/${commentId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage?.getItem('token')}`,
                },
            });
            const data = await response.json();
            if (!response.ok) return rejectWithValue(data.message);
            console.log("data in deleteCommentAsync", data);
            console.log("commentId in deleteCommentAsync", commentId)
            return { postId, commentId };
        } catch (error) {
            return rejectWithValue("حدث خطاء في حذف التعليق");
        }
    }
)
const commentSlice = createSlice({
    name: "comments",
    initialState: {
        commentsMap: {},
        loading: false,
        error: null,
    },
    reducers: {
        resetComments(state) {
            state.commentsMap = {};
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(submitComment.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            .addCase(submitComment.fulfilled, (state, action) => {
                const { postId, comment } = action.payload;
                console.log("action.payload in submitComment", action.payload);
                state.loading = false;
                state.commentsMap[postId] = [...(state.commentsMap[postId] || []), comment];
            })
            .addCase(submitComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // get comments for post
            .addCase(getCommentsForPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCommentsForPost.fulfilled, (state, action) => {
                const { postId, comments } = action.payload;
                state.loading = false;
                state.commentsMap[postId] = comments;
            })
            .addCase(getCommentsForPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // edite comment
            .addCase(editCommentAsync.fulfilled, (state, action) => {
                const { postId, commentId, content } = action.payload;
                state.commentsMap[postId] = state.commentsMap[postId].map((comment) => {
                    if (comment._id === commentId) {
                        return { ...comment, content };
                    }
                    return comment;
                });
            })
            // delete comment from post
            .addCase(deleteCommentAsync.fulfilled, (state, action) => {
                const { postId, commentId } = action.payload;
                state.commentsMap[postId] = state.commentsMap[postId].filter((comment) => comment._id !== commentId);
            })


    },
});

export const { resetComments } = commentSlice.actions;
export default commentSlice.reducer;
