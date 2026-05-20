import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");

const userSlice = createSlice({
    name: "user",

    initialState: {
        userData: savedUser ? JSON.parse(savedUser) : null
    },

    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;

            localStorage.setItem(
                "user",
                JSON.stringify(action.payload)
            );
        },
        updateCredits: (state, action) => {
            if (state.userData) {

                state.userData.credits = action.payload

                localStorage.setItem(
                    "user",
                    JSON.stringify(state.userData)
                )
            }
        }
    }
});

export const { setUserData, updateCredits } = userSlice.actions;

export default userSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const savedUser = localStorage.getItem("user");

// const initialUser =
//   savedUser && savedUser !== "undefined"
//     ? JSON.parse(savedUser)
//     : null;

// const userSlice = createSlice({
//   name: "user",

//   initialState: {
//     userData: initialUser,
//   },

//   reducers: {
//     setUserData: (state, action) => {

//       state.userData = action.payload;

//       localStorage.setItem(
//         "user",
//         JSON.stringify(action.payload)
//       );
//     },
//   },
// });

// export const { setUserData } = userSlice.actions;

// export default userSlice.reducer;