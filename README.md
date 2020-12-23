# 🐼 판다마켓

**판다마켓**은 일반인들이 자신의 중고물품을 라이브 스트리밍을 통해 직접 경매할 수 있는 웹 사이트입니다.![panda logo](https://panda-market.s3.ap-northeast-2.amazonaws.com/5fd9cb748c5228f376f5fecc16086444664550)

👉 Deploy Address: [https://www.pandamarket.live/](https://www.pandamarket.live/)

👉 시뮬레이션 가이드 영상 : [https://www.youtube.com/watch?v=hcTGFmjfqOs](https://www.youtube.com/watch?v=hcTGFmjfqOs)

![https://media.giphy.com/media/xnHosKB0mFOK8Yy3WG/giphy-downsized.gif](https://media.giphy.com/media/xnHosKB0mFOK8Yy3WG/giphy-downsized.gif)

![https://media.giphy.com/media/4RlgoDefSt3FSJGeux/giphy-downsized-large.gif](https://media.giphy.com/media/4RlgoDefSt3FSJGeux/giphy-downsized-large.gif)

👉 라이브 중고 경매 시연 영상(프로젝트 발표 中) : [https://youtu.be/jMw5MIxLY3o?t=6597](https://youtu.be/jMw5MIxLY3o?t=6597)

# 🔍Table Contents

- [Motivation](#❗️-Motivation)
- [Features](#💡-Features)
- [Tech Stack](#🛠-Tech-Stack)
- [Requirements](#📌-Requirements)
- [Installation](#📀-Installation)
- [Deploy](#🌐-Deploy)
- [How to use](#🕹-How-to-Use)
- [Project Schedule](#🗓-Project-Schedule)
- [Challenge & Focus point](#🥊-Challenge-&-Focus-point)
- [Things to do](#🚀-Things-to-do)

# ❗️ Motivation

- 현재 중고나라 가입자 수(당근마켓, 번개장터 제외)만 **2천 만명**이 넘을 정도로 중고 거래에 대한 전국민적인 수요가 높습니다. 이처럼 저 또한 평소에 많이 이용하는 중고거래의 `시장성`을 항상 주목하고 있었습니다.
- 아직까지 판매자가 가격을 정하고, 구매자는 정해진 가격으로 구매하는 전통적인 방식의 중고거래가 주를 이루고 있습니다. 하지만 판매자가 라이브 방송으로 중고 물품을 경매하는 서비스는 거의 전무하기 때문에, 해당 서비스를 개시한다면 `선점효과`를 얻을 수 있다고 생각했습니다.
- 기존 중고 거래에서는 판매자와 대면하기까지 막연한 두려움을 갖는 것이 일반적입니다. 판매자의 얼굴을 미리 확인해볼 수 있는 라이브 중고 경매를 통해 해당 부분을 상쇄시키고, 중고거래에 대한 `신뢰성`증가를 도모하고자 하였습니다.
- 이미 인스타그램과 같은 소셜 플랫폼에서 라이브 중고거래가 간간히 이루어지고 있지만, 특정 influencer에게만 영향력이 발휘됩니다. 이후 앞으로 도래할 비대면 시대 흐름에 맞추어 일반인들도 쉽게 참여할 수 있는 `대중적`이고 `특성화` 된 라이브 중고 경매 플랫폼을 만들고 싶었습니다.

# 💡 Features

- **경매를 원하는 중고 물품을 등록**할 수 있습니다.
- 원하는 시간 대에 경매방을 개설하여, **실시간 비디오 스트리밍을 통해 경매를 진행**할 수 있습니다.
- **구매를 원하는 중고 물품을 검색**할 수 있습니다.
- 경매방에 참여하여, 경매중인 물품에 대해 **원하는 가격대로 실시간 배팅**을 할 수 있습니다.
- 경매 일자, 경매 참여 등 예약에 대한 **메일 서비스를 제공합니다.**
- 마이 페이지를 통해 등록한 경매, 예약한 경매 정보를 다시 확인할 수 있습니다.

# 🛠 Tech Stack

### Frontend

- ES2015+
- React for component-based-architecture
- Redux for state management(Redux-toolkit)
- Redux Thunk for managing asynchronous operation
- Styled Component
- Socket.io
- Web RTC for real time communication
- Jest for unit-test
- Enzyme for component-test

### Backend

- Node.js
- Express
- MongoDB / MongoDB Atlas for data persistence
- Moongoose
- JSON Web Token Authentication
- AWS S3 for uploading data file
- Socket.io
- Node mailer / Node-schedule for reservation service
- Chai / Mocha / SuperTest for unit-test

# 📌 Requirements
- 크롬 환경에서의 실행을 권장합니다.
# 📀 Installation
Local 환경에서 실행을 위해 환경 변수 설정이 필요합니다.

### Client

Root 디렉토리에 .env파일을 생성 후 아래와 같이 환경변수 값을 입력합니다.
- [구글 개발자 계정](https://developers.google.com/)

```
// in .env in Root directory
REACT_APP_GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
```

```
git clone https://github.com/maxlchan/PandaMarket-frontend.git
cd PandaMarket-frontend
npm install
npm start
```

### Server
Root 디렉토리에 .env파일을 생성 후 아래와 같이 환경변수 값을 입력합니다.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Amanzon Web Services](https://aws.amazon.com/ko/free/?trk=ps_a134p000003yHYmAAM&trkCampaign=acq_paid_search_brand&sc_channel=PS&sc_campaign=acquisition_KR&sc_publisher=Google&sc_category=Core-Main&sc_country=KR&sc_geo=APAC&sc_outcome=acq&sc_detail=aws&sc_content=Brand_Core_aws_e&sc_segment=444218215904&sc_medium=ACQ-P|PS-GO|Brand|Desktop|SU|Core-Main|Core|KR|EN|Text&s_kwcid=AL!4422!3!444218215904!e!!g!!aws&ef_id=CjwKCAiAz4b_BRBbEiwA5XlVVhkBbEbvDkN2vXClY2PXvAUvLqkLu7IllZ8wVehErHOSqlSnaqOTwBoCekwQAvD_BwE:G:s&s_kwcid=AL!4422!3!444218215904!e!!g!!aws&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc)
```
// in .env in Root directory
PORT=<YOUR_PORT_NUMBER>
DB_URL=<YOUR_MONGODB_URL>
JWT_SECRET=<YOUR_JWT_SECRET>
AWS_ACCESS_KEY=<YOUR_AWS_ACCESS_KEY>
AWS_SECRET_KEY=<YOUR_AWS_SECRET_KEY>
NODE_MAILER_EMAIL=<YOUR_GMAIL_ADDRESS>
NODE_MAILER_PASSWORD=<YOUR_GMAIL_PASSWORD>
```

```
git clone https://github.com/maxlchan/PandaMarket-backend.git
cd PandaMarket-backend
npm install
npm run dev
```
# 🌐 Deploy
### Client
- Netlify를 이용한 Client 배포 https://www.pandamarket.live/
### Server
- AWS Elastic Beanstalk (EB)
- AWS Code Pipeline for Deployment automation
# 🕹 How to Use

[판매자]

- 소셜 로그인 후, 메인 화면 하단에 [내 중고물품 경매하기] 버튼을 누릅니다.
- 상품 사진 ~ 경매 일시까지 요구사항을 모두 채운 후 [경매 등록하기] 버튼을 누릅니다.
- 경매를 바로 시작하고 싶을 경우, [경매 바로 시작] 버튼을 누릅니다.
- 경매 일시가 다다를 경우, 판매자의 메일로 전송되는 경매방 링크를 통해 경매방을 개설할 수 있습니다.
- 참여자가 경매방 입장 후 일정 금액을 배팅하면, [카운트 다운 Start] 버튼이 활성화됩니다.
- [카운트 다운 Start] 버튼을 누르면, 10초의 카운트 다운이 시작됩니다.
- 10초 동안 최고가의 배팅이 나오지 않으면 1등 구매자와의 개인 대화창으로 이동합니다.

[구매자]

- 소셜 로그인 후, 홈 화면에 [바로 참여하기] 버튼을 눌러 현재 경매중인 경매방으로 입장할 수 있습니다.
- [경매상품] 탭을 통해 현재 예약중인 경매 상품들을 둘러 볼 수 있으며, 검색할 수 있습니다.
- [상세보기]의 [경매 예약하기] 버튼을 눌러 해당 경매를 예약할 수 있습니다.
- 판매자가 경매를 시작할 경우, 구매자 메일로 전송되는 경매방 링크를 통해 경매방에 참여할 수 있습니다.
- 경매방 입장 후 가격을 배팅할 수 있으며, 최고가보다 높은 가격으로 배팅 할 경우 1위 구매자로 등극합니다.
- 만약 경매방을 나가게 될 경우, 자동으로 2위가 1위로 변경됩니다.
- 10초 동안 최고가의 배팅이 나오지 않으면 판매자와의 개인 대화창으로 이동합니다.

[공통]

- [내정보] 탭을 클릭하면 '내가 등록한 경매', '내가 예약한 경매'를 구분하여 제품을 다시 확인할 수 있으며, 경매시작 혹은 경매 참여가 가능합니다.

# 🗓 Project Schedule
전체 기간 2020. 11. 30(월) ~ 2020. 12. 18(금) 총 3주 진행

### `1주차 - 기획(2020. 11. 30 ~ 2020. 12. 04)`

- 아이디어 확정 + 기술 스택 검토
- [Figma를 통한 Mockup 작업](https://www.figma.com/file/fXBrE7VHuu7hDAeyZEjhqT/Panda-market?node-id=0%3A1)
- [LucidChart를 활용한 MongoDB Database Schema Modeling](https://lucid.app/lucidchart/965ed466-7a58-45ce-b981-c74905ca64d0/edit?page=0_0#?folder_id=home&browser=icon)
- [Notion Todo를 활용한 Task Management](https://www.notion.so/9b7194267d7948aab155858419012b3a)
- GitHub Repository Setting(Client / Server 분리)

### `2주차 - 개발(2020. 12. 05 ~ 2020. 12. 13)`

- Social Login & JWT 토큰 로그인 구현
- 중고 경매 물품 등록 정보 MongoDB 저장 및 사진 파일 AWS S3 업로드
- 등록된 중고 경매 상품 list-up, categorizing, 검색 기능 구현
- Web RTC를 통한 one-to-many Peer Connection 구현
- 실시간 채팅 및 경매 정보 공유를 위한 Socket 연결
- nodeMailer & nodeScheduler 를 통한 경매 예약 기능 구현
- 물품 등록 및 예약 이력 확인을 위한 마이페이지 탭 추가

### `3주차 - 검토 및 정리(2020. 12. 14 ~ 2020. 12. 18)`

- Refactoring & Styling & Debugging
- Netlify 프론트 배포
- AWS Elastic Beanstalk 백엔드 서버 배포
- Frontend & Backend Test code 작성


# 🥊 Challenge & Focus point

### 컴포넌트 세분화와 재사용

이번 프로젝트는 비록 규모는 작지만 재사용 할 수 있는 컴포넌트를 많이 만들어보고 재사용도 많이 해보자! 라는 목표를 정하고 프로젝트에 임하였습니다. 이에 상태관리 로직은 최대한 컨테이너에서 이루어지도록하여 컴포넌트를 최대한 경량화시키고자 하였고, 큰 단위라고 생각되어지는 모달창 혹은 카루셀 카드에서부터 네비게이션 Tab 등 작은 단위의 요소들까지 컴포넌트로 분리하고자 노력하였습니다.

해당 부분에 집중하면서 느낀 장점은 **첫번째,** Redux와 소통하는 컨테이너의 로직이 길어지고 복합하게 업데이트 되더라도 Concern 분리가 명확해짐에 따라 가독성이 크게 떨어지지 않았습니다. **두번째로** 컴포넌트 함수가 순수해짐에 따라 테스트 코드를 작성하는 것이 원활했습니다.

굉장히 작은 단위까지 컴포넌트를 분리한다는 것이 굉장히 초반에는 번거롭고 시간이 많이 소요되는 작업이었지만, 왜 리액트를 사용할 때에는 리액트적으로 사고해야하고, 순수함수를 작성해야하는 것이 중요한지에 대해 조금이나마 배울 수 있었습니다.

### Redux Thunk를 통한 비동기 처리

[1차 프로젝트](https://github.com/daechidongVibe/Rice-coco-frontend) 당시 한 컨테이너 내부에서 모든 비동기 처리 로직이 한꺼번에 작성되어있다보니, 코드가 너무 장황해진 느낌을 받았습니다. 해당 부분을 개선하기 위해 이번 프로젝트에서는 redux-thunk 미들웨어를 적용해보았습니다. thunk 미들웨어를 사용해본 결과, 아래 세가지 정도의 장점을 체감하였습니다.

**첫번째** 컨테이너 입장에서는 비동기 처리와 관련된 액션에 대해서는 thunk에 위임하기 때문에 컨테이너 함수가 좀더 간결해지고 관심 분리도 잘되는 방향으로 코드 작성이 이루어질 수 있었습니다.

**두번째,** 특정 비동기 작업에 대한 pending, success, failure 단계가 리덕스 상태로 명확하게 분리될 수 있었으며, 이에 따라 비동기 Loading이나 Error에 대한 부분을 관리하거나 UI 상으로 보여주는 데 용이했습니다.

**마지막으로,** thunk 내부에서 1)현재 리덕스 state를 불러와 사용한다든지, 2)다른 액션들을 연달아 호출할 수 있다든지, 3)비동기 처리 후에 특정 URL로 라우팅을 한다든 지 등 자유도가 높아서 개발하기에 굉장히 편리했습니다.

하지만 thunk가 반환하는 함수가 '순수하지 않다'라는 것을 느꼈습니다. thunk 내부에서 너무 여러가지 일을 하다보니, 제 3자가 보았을 때 위 함수가 대체 역할을 하는 함수인지에 대해 이해할수 없는 여지가 많았고, 결론적으로 테스트 코드를 작성하기 어려운 코드가 도출되었습니다. Functional Programming을 지향하는 React 생태계에서 redux-thunk보다 redux-saga가 왜 더 실무에서 많이 쓰이는 것인지 깊히 이해하게 되었고, redux-saga에 대해서도 공부를 해볼 예정입니다.

### 사용자 입장에서의 Edge Case에 대한 고민

해당 프로젝트에서 가장 중점적으로 생각했던 부분은 '이 상황에서 사용자가 어떤 특이 행동을 취할 수 있으며, 그  Edge Case에 어떻게 대비해야할까?'에 대한 것이었습니다. 그 중 하나가 1등 구매자가 경매 도중에 방을 나가버리는 경우였습니다. 처음 redux를 설계할 때에는 currentWinner라는 1등 구매자만을 나타내는 state를 가지고 있었기 때문에 이에 대응하지 못했습니다. 이를 해결하기 위해 1등이 업데이트 될 때마다, 1등의 정보를 쌓아올리는 stack 자료구조 형태로 currentWinnerList라는 state를 관리하였고, 1등 구매자가 부득이하게 경매방을 나갈 경우 해당 배열에서 제거해주어 자동으로 1등이 변경되는 방식으로 해결하였습니다.

이외에도 다른 Edge case(경매 도중 새로고침 시 peerConnection 유지, 경매 종료 후 뒤로가기 버튼을 통해 다시 경매방에 입장하는 상황 방지 등)들에 대해서도 모든 상황에 완벽하게는 아니지만 최대한 대응할 수 있도록 구현하는 데 초점을 맞추었습니다.

# 🚀 Things to do

- 원하는 물품과 가격을 등록하면, 차후 조건에 해당하는 물품이 등록되었을 때 메일 알람이 오는 서비스
- 실제 경매가 낙찰되었을 때 구매자의 포인트가 선결제되는 거래 시스템
- 경매시 다채로운 animation효과, 반응형 등 더욱 Interactive 한 UI 구현
