const ROUTES = {
  HOME: '/',
  USERS: '/users',
  USERS_DETAIL: '/:userId',
  LOGIN: '/login',
  TOKEN: '/token',
  REGISTERATION: '/registeration',
  BROADCAST: '/broadcast',
  AUCTIONS: '/auctions',
  AUCTION_DETAIL: '/:auctionId',
  UPLOAD: '/upload',
  MY_INFO: '/my-info',
};

const MESSAGE = {
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요',
  INVAILD_BIDDING: '최고가 보다 높지 않습니다. 다시 배팅해주세요',
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

export { ROUTES, MESSAGE, ITEM_CATEGORY, CONFIG };
