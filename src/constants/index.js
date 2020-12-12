const ROUTES = {
  HOME: '/',
  USERS: '/users',
  USER_DETAIL: '/:userId',
  LOGIN: '/login',
  TOKEN: '/token',
  REGISTERATION: '/registeration',
  BROADCAST: '/broadcast',
  AUCTIONS: '/auctions',
  AUCTION_DETAIL: '/:auctionId',
  FINISH: '/finish',
  RESERVE: '/reserve',
  UPLOAD: '/upload',
  MY_PAGE: '/mypage',
  MY_AUCTIONS: '/my-auctions',
  RESERVED_AUCTIONS: '/reserved-auctions',
  PRIVATE_CHAT: '/private-chat'
};

const MESSAGE = {
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요',
  INVAILD_BIDDING: '최고가 보다 높지 않습니다. 다시 배팅해주세요',
  BROADCAST_END_HOST: '경매가 종료되었습니다. 낙찰자와의 대화창으로 이동합니다',
  BROADCAST_END_WINNER : '축하합니다. 1등이시군요! 판매자와의 대화창으로 이동합니다',
  BROADCAST_END_MEMBER: '경매가 종료되었습니다. 아쉽지만 다음 기회를 노리세요!',
  HOST_OUT: '판매자가 나감으로 경매가 종료되었습니다.'
};

const TYPE = {
  GOOGLEAUTH: 'googleAuth',
  TOKEN: 'token',
  START: 'start',
  MODIFY: 'modify',
  DELETE: 'delete',
  JOIN: 'join',
  REGISTER: 'register',
  LOADING: 'spokes',
};

const ITEM_CATEGORY = [
  '패션의류',
  '뷰티 잡화',
  '유아용품',
  '가구생활',
  '취미컬렉션',
  '디지털',
  '컴퓨터',
  '스포츠레저',
  '뷰티',
  '생활가전',
  '자동차 공구',
  '도서 기타',
];

const CONFIG = {
  LIMITED_SECONDS: 5,
  ICE_SERVER: {
    iceServers: [
      { urls: 'stun:stun.stunprotocol.org' },
      {
        urls: 'turn:numb.viagenie.ca',
        credential: 'muazkh',
        username: 'webrtc@live.com',
      },
    ],
  },
};

export { ROUTES, MESSAGE, ITEM_CATEGORY, CONFIG, TYPE };
