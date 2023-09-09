import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ChatState {
  status: string;
  error: string;
  conversations: any[]; // Consider defining a type for the conversations
  activeConversation: any; // Consider defining a type for activeConversation
  messages: any[];
  notifications: any[]; // Consider defining a type for the notifications
}

const initialState: ChatState = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {},
  messages: [],
  notifications: [],
};
export const getConversations = createAsyncThunk(
  "conervsation/all",
  async (token: any, { rejectWithValue }) => {
    try {
      // console.log(token)
      const { data } = await axios.get("/api/v1/conversation", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //  console.log(data)
      return data;
    } catch (error: any) {
      console.error("Error in getConversations:", error);
      return rejectWithValue(error.response.data.error.message);
    }
  }
);
export const open_create_conversation = createAsyncThunk(
  "conervsation/open_create",
  async (values: any, { rejectWithValue }) => {
    const { token, receiver_id }: any = values;
    try {
      const { data } = await axios.post(
        "/api/v1/conversation",
        { receiver_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);
export const getConversationMessages = createAsyncThunk(
  "conervsation/messages",
  async (values: any, { rejectWithValue }) => {
    const { token, convo_id }: any = values;
    try {
      const { data } = await axios.get(`/api/v1/message/${convo_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);
export const sendMessage: any = createAsyncThunk(
  "message/sand",
  async (values: any, { rejectWithValue }) => {
    const { token, message, convo_id, files }: any = values;
    try {
      const { data } = await axios.post(
        `/api/v1/message`,
        {
          message,
          convo_id,
          files,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action: any) => {
      // Consider defining a type for action payload
      state.activeConversation = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getConversations.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(open_create_conversation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(open_create_conversation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activeConversation = action.payload;
      })
      .addCase(open_create_conversation.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getConversationMessages.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getConversationMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(getConversationMessages.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = [...state.messages, action.payload];
        let conversation = {
          ...action.payload.conversation,
          latestMessage: action.payload,
        };
        let newConvos = [...state.conversations].filter(
          (c: any) => c._id !== conversation._id
        );
        newConvos.unshift(conversation)
        state.conversations=newConvos
      })
      .addCase(sendMessage.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setActiveConversation } = chatSlice.actions;
export default chatSlice.reducer;
