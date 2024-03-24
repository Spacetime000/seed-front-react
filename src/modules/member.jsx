import { createAction, handleActions } from "redux-actions";

// 액션 타입 정의
const SET_MEMBER = "member/SET_MEMBER";

// 액션 생성 함수
export const setMember = createAction(SET_MEMBER, member => ({
    nickname: member.nickname,
    profileImg: member.profileImg,
    role: member.role,
    sub: member.sub,
}));

// 초기 상태
const initialState = {
  sub: "",
  nickname: "",
  profileImg: "",
  role: "",
};

// 리듀서 정의
const member = handleActions(
  {
    [SET_MEMBER]: (state, { payload: member }) => ({
        ...member
    }),
  },
  initialState
);

export default member;
