import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMessagesForConversation = createAsyncThunk(
    "chat/fetchMessagesForConversation",
    async (conversationId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:4000/api/messages/${conversationId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch messages");
            }
            const data = await response.json();
            return data.messages;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async ({ conversationId, content }, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:4000/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authentication: `Bearer ${localStorage?.getItem('token')}`,
                },
                body: JSON.stringify({ conversationId, content }),
            });
            if (!response.ok) {
                throw new Error("Failed to send message");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const editMessage = createAsyncThunk(
    "chat/editMessage",
    async ({ messageId, content }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:4000/api/messages/${messageId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authentication: `Bearer ${localStorage?.getItem('token')}`,
                },
                body: JSON.stringify({ content }),
            });
            if (!response.ok) {
                throw new Error("Failed to edit message");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const deleteMessage = createAsyncThunk(
    "chat/deleteMessage",
    async (messageId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:4000/api/messages/${messageId}`, {
                method: "DELETE",
                headers: {
                    authentication: `Bearer ${localStorage?.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete message");
            }
            return messageId; // Return the ID of the deleted message
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const createConversation = createAsyncThunk(
    "chat/createConversation",
    async (participantId, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:4000/api/conversations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authentication: `Bearer ${localStorage?.getItem('token')}`,
                },
                body: JSON.stringify({ participantId }),
            });
            if (!response.ok) {
                throw new Error("Failed to create conversation");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const fetchConversations = createAsyncThunk(
    "chat/fetchConversations",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:4000/api/conversations", {
                headers: {
                    authentication: `Bearer ${localStorage?.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch conversations");
            }
            const data = await response.json();
            return data.conversations;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const fetchConversationById = createAsyncThunk(
    "chat/fetchConversationById",
    async (conversationId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:4000/api/conversations/${conversationId}`, {
                headers: {
                    authentication: `Bearer ${localStorage?.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch conversation");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const deleteConversation = createAsyncThunk(
    "chat/deleteConversation",
    async (conversationId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:4000/api/conversations/${conversationId}`, {
                method: "DELETE",
                headers: {
                    authentication: `Bearer ${localStorage?.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete conversation");
            }
            return conversationId; // Return the ID of the deleted conversation
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
const initialState = {
    conversations: [],
    messages: [],
    selectedConversation: null,
    loading: false,
    error: null,
};
export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload;
        },
        addMessage: (state, action) => {
            const { conversationId, message } = action.payload;
            if (!state.conversations[conversationId]) {
                state.conversations[conversationId] = [];
            }
            state.conversations[conversationId].push(message);
        },
        removeMessage: (state, action) => {
            state.messages = state.messages.filter((message) => message.id !== action.payload);
        },
        clearChatState: (state) => {
            state.conversations = [];
            state.messages = [];
            state.selectedConversation = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessagesForConversation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMessagesForConversation.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(fetchMessagesForConversation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(sendMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.messages.push(action.payload);
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editMessage.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.messages.findIndex(msg => msg._id === action.payload._id);
                if (index !== -1) {
                    state.messages[index] = action.payload; // Update the edited message
                }
            })
            .addCase(editMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.loading = false;
                // Remove the deleted message from the messages array
                state.messages = state.messages.filter(msg => msg._id !== action.payload);
            })
            .addCase(deleteMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createConversation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createConversation.fulfilled, (state, action) => {
                state.loading = false;
                state.conversations.push(action.payload); // Add the new conversation
            })
            .addCase(createConversation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchConversations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchConversations.fulfilled, (state, action) => {
                state.loading = false;
                state.conversations = action.payload; // Set the conversations
            })
            .addCase(fetchConversations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchConversationById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchConversationById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedConversation = action.payload; // Set the selected conversation
            })
            .addCase(fetchConversationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteConversation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteConversation.fulfilled, (state, action) => {
                state.loading = false;
                // Remove the deleted conversation from the conversations array
                state.conversations = state.conversations.filter(conv => conv._id !== action.payload);
                if (state.selectedConversation && state.selectedConversation._id === action.payload) {
                    state.selectedConversation = null; // Clear selected conversation if it was deleted
                }
            })
            .addCase(deleteConversation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});
export const { setSelectedConversation, addMessage, removeMessage, clearChatState } = chatSlice.actions;
export default chatSlice.reducer;
