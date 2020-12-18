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
  START: '/start',
  FINISH: '/finish',
  RESERVE: '/reserve',
  UPLOAD: '/upload',
  MY_PAGE: '/mypage',
  MY_AUCTIONS: '/my-auctions',
  RESERVED_AUCTIONS: '/reserved-auctions',
  PRIVATE_CHAT: '/private-chat',
};

const MESSAGE = {
  BROADCAST_END_HOST: {
    title: '경매가 종료되었습니다.',
    text: '낙찰자와의 대화창으로 이동합니다',
  },
  BROADCAST_END_WINNER: {
    title: '축하합니다. 1등이시군요!',
    text: '판매자와의 대화창으로 이동합니다',
  },
  BROADCAST_END_MEMBER: {
    title: '경매가 종료되었습니다.',
    text: '아쉽지만 다음 기회를 노리세요!',
  },
  REGISTER_SUCCESS: {
    title: '등록 성공!',
    text: '경매 시간을 반드시 준수해주세요!',
  },
  REGISTER_SUCCESS_BROADCAST: {
    title: '등록 성공!',
    text: '바로 경매방으로 입장입니다',
  },
  RESERVE_SUCCESS: {
    title: '예약 완료!',
    text: '경매 시작전 1시간 전 메일로 링크를 보내드립니다',
  },
  UNKNOWN_ERROR: '실행 도중 오류가 발생했습니다. 다시 시도해주세요',
  LOWER_THAN_INITIAL: '시작가 보다 높지 않습니다. 다시 배팅해주세요',
  LOWER_THAN_HIGHTEST: '최고가 보다 높지 않습니다. 다시 배팅해주세요',
  HOST_OUT: '판매자가 나감으로 경매가 종료되었습니다',
  PHOTO_UNDER_LIMIT: '최소 1장의 사진을 등록해주세요',
  PHOTO_OVER_LIMIT: '사진은 최대 5개만 등록됩니다',
  MEDIA_NOT_CONNETED: '미디어 연결이 제대로 이루어지지 않았습니다. 다시 시도해주세요.',
  EMPTY_TITLE: '경매 제목을 입력해주세요',
  EMPTY_ITEMNAME: '상품명을 입력해주세요',
  EMPTY_DESCRIPTION: '상품 설명을 입력해주세요',
  EMPTY_INITIALPRICE: '시작 가격을 입력해주세요',
  EMPTY_DATETIME: '경매 일시를 입력해주세요',
  PRICE_UNDER_LIMIT: '최소 1,000원 이상을 입력해주세요',
  DATETIME_UNDER_LIMIT: '최소 1시간 후의 시간을 등록해주세요',
  NOT_LOGIN: '로그인 후 이용 가능합니다',
  INVALID_RESERVATION: '자신이 만든 경매는 예약할 수 없습니다',
  ALREADY_RESERVED: '이미 예약하신 경매입니다',
};

const TYPE = {
  GOOGLEAUTH: 'googleAuth',
  TOKEN: 'token',
  START: 'start',
  JOIN: 'join',
  MYAUCTION_DEATAIL: 'myAuctionDetail',
  RESERVED_DETAIL: 'reservedDetail',
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
  '도서 기타',
];

const CONFIG = {
  LIMITED_SECONDS: 10,
  DEBOUNCED_TIME: 500,
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
  TOASTIFY: {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  },
};

const SOCKET_EVENT = {
  CREATE_ROOM: 'create room',
  JOIN_ROOM: 'join room',
  LEAVE_ROOM: 'leave room',
  OFFER: 'offer',
  ANSWER: 'answer',
  CANDIDATE: 'candidate',
  UPDATE_HIGHEST_BID_PRICE: 'update highest bid price',
  SEND_MESSAGE: 'send message',
  COUNTDOWN: 'countdown',
  MEMBER_JOIN_ROOM: 'member join room',
  CHANGE_ROOM_STATUS: 'change room status',
  FINISH_BROADCAST: 'finish broadcast',
  ROOM_BROKED_BY_HOST: 'room broked by host',
  SEND_PRIVATE_MESSAGE: 'send private message',
};

const URL = {
  LOADING: 'https://acegif.com/wp-content/gif/panda-80.gif',
  CONFETTI: 'https://acegif.com/wp-content/gif/confetti-18.gif',
  BID: 'https://www.cityofcottonwoodmn.com/vertical/Sites/%7BE0FDF809-1956-4DF5-8E65-A031493D88F5%7D/uploads/Bidding.png',
  BROADCAST_BACKGROUND: 'https://previews.123rf.com/images/marisha5/marisha51010/marisha5101000057/8009927-frame-made-of-money-isolated-on-white-background.jpg',
};

export { ROUTES, MESSAGE, ITEM_CATEGORY, CONFIG, TYPE, URL, SOCKET_EVENT };
