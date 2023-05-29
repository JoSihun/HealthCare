# HealthCare

```
헬스장 운영측과 고객 모두를 위한 종합 Healthcare 웹 서비스
```
- 헬스장 운영측 고객관리 기능 제공
    - `JWT` 인증 토큰 기반 회원 관리 기능 제공
    - `WebSocket` 기반 `LiveChat` 고객지원 서비스 제공
- 헬스장 사용자 건강관리 기능 제공
    - ex) `인바디`, `운동 루틴 추천`, `식단 추천` 등
    - 인바디 체성분(BMI) 그래프 제공
    - 인바디 체성분(BMI) 기반 `식단 관리`, `식단 추천` 서비스 제공
    - 인바디 체성분(BMI) 기반 `운동 루틴 추천` 서비스 제공
- 헬스장 사용자 커뮤니티 기능 제공
    - ex) `FAQ`, `Q&A`, `자유게시판`, `댓글`, `첨부파일` 등
- 공공데이터포털 `농촌진흥청_추천식단정보` 데이터 활용
- 공공데이터포털 `한국건강증진개발원_보건소 모바일 헬스케어_체성분(BMI)` 데이터 활용





&nbsp;
***





## Table of Contents
- [1. Environment](#1-environment)
    - [1. 1 Environment](#1-1-environment)
    - [1. 2 Technologies](#1-2-technologies)
    - [1. 3 Installation](#1-3-installation)
- [2. Architecture](#2-architecture)
    - [2. 1 ReactFront](#2-1-reactfront)
    - [2. 2 SpringBoot](#2-2-springboot)
    - [2. 3 Database](#2-3-database)
- [3. Features](#3-features)
    - [3. 1 Features](#3-1-features)
    - [3. 2 REST API](#3-2-rest-api)
- [4. Server & DNS](#4-server--dns)
    - [4. 1 Server](#4-1-server)
    - [4. 2 DNS](#4-2-dns-domain-name-system)
- [5. Contributing](#5-contributing)





&nbsp;
***





# 1. Environment
- [1. Environment](#1-environment)
    - [1. 1 Environment](#1-1-environment)
    - [1. 2 Technologies](#1-2-technologies)
    - [1. 3 Installation](#1-3-installation)

[ [처음으로](#healthcare) ]
[ [목차보기](#table-of-contents) ]



&nbsp;
***



## 1. 1 Environment
- Windows 10
- Ubuntu 20.04 LTS



&nbsp;
***



## 1. 2 Technologies
- Java 11, SpringBoot, JWT, WebSocket
- React, JavaScript, CSS, Axios
- MySQL, JPA



&nbsp;
***



## 1. 3 Installation

```shell
npm install chart.js
```
```shell
npm install react-router-dom
```
```shell
npm install sockjs-client stompjs
```
```shell
npm install react-bootstrap bootstrap
```





&nbsp;
***





# 2. Architecture

- [2. Architecture](#2-architecture)
    - [2. 1 ReactFront](#2-1-reactfront)
    - [2. 2 SpringBoot](#2-2-springboot)
    - [2. 3 Database](#2-3-database)

[ [처음으로](#healthcare) ]
[ [목차보기](#table-of-contents) ]



&nbsp;
***



## 2. 1 ReactFront

- [2. 1 ReactFront](#2-1-reactfront)
    - [2. 1. 1 ReactFront Architecture](#2-1-1-reactfront-architecture)
    - [2. 1. 2 ReactFront Architecture Details](#2-1-2-reactfront-architecture-details)

[ [처음으로](#healthcare) ]
[ [돌아가기](#2-architecture) ]

&nbsp;
***

### 2. 1. 1 ReactFront Architecture
- React Front-end Architecture 디렉토리 구조
```shell
├─api
│  ├─Introduce
│  ├─support
│  └─user
├─assets
│  └─images
├─components
│  ├─introduce
│  ├─support
│  └─user
├─pages
│  ├─introduce
│  ├─support
│  └─users
└─styles
```

[ [처음으로](#healthcare) ]
[ [돌아가기](#2-1-reactfront) ]

&nbsp;
***

### 2. 1. 2 ReactFront Architecture Details

- ReactFront Architecture에 대한 세부정보는 아래 링크를 참조
    - [ [ReactFront Architecture Document](./docs/ReactFront_Architecture.md) ]

[ [처음으로](#healthcare) ]
[ [돌아가기](#2-1-reactfront) ]



&nbsp;
***



## 2. 2 SpringBoot

- [2. 2 SpringBoot](#2-2-springboot)
    - [2. 2. 1 MVC Design Pattern](#2-2-1-mvc-design-pattern)
    - [2. 2. 2 MVC Design Pattern Model 1](#2-2-2-mvc-model-1)
    - [2. 2. 3 MVC Design Pattern Model 2](#2-2-3-mvc-model-2)
    - [2. 2. 4 HealthCare Design Pattern](#2-2-4-healthcare-design-pattern)

[ [처음으로](#healthcare) ]
[ [돌아가기](#2-architecture) ]

&nbsp;
***

### 2. 2. 1 MVC Design Pattern

- **MDN(Mozila Developer Network) Web Docs의 MVC 정의**  
    > **MVC(Model-View-Controller) 는 사용자 인터페이스, 데이터 및 논리 제어를**  
    > **구현하는데 널리 사용되는 소프트웨어 디자인 패턴입니다.**  
    >  
    > **소프트웨어의 비즈니스 로직과 화면을 구분하는데 중점을 두고 있습니다.**  
    > **이러한 "관심사 분리" 는 더나은 업무의 분리와 향상된 관리를 제공합니다.**  
- **MVC(Model-View-Controller): 애플리케이션을 3가지 역할로 구분한 개발 방법론**
  - `Model`: 애플리케이션의 데이터 가공을 책임지는 컴포넌트
  - `View`: 사용자 인터페이스(UI, User Interface) 요소
  - `Controller`: `Model`과 `View` 사이를 이어주는 다리(Bridge) 역할 수행
- 비즈니스 로직과 UI 로직을 분리하여, 독립적으로 유지보수 가능
- `Model`과 `View`가 다른 컴포넌트들에 종속되지 않아, 애플리케이션의 확장성과 유연성에 유리함
- 중복 코딩의 문제점 제거 

[ [처음으로](#healthcare) ]
[ [돌아가기](#2-2-springboot) ]

&nbsp;
***

### 2. 2. 2 MVC Model 1

<p align="center"><img width="100%" src="https://user-images.githubusercontent.com/59362257/227861870-406ca57d-c305-49b9-a6fb-136155b85b59.png"></p>

<div style="border: 1px solid white; padding-top: 1.5vh; margin-bottom: 1vh">

- `Controller` 영역에 `View` 영역을 같이 구현하는 방식
- `Controller` 영역과 `View` 영역 모두 `JSP`가 담당하는 형태로, 구현이 쉽다는 장점 존재
- `JSP`에서 `MVC`가 모두 이루어지므로 재사용성과 가독성 하락
  - 유지보수 불리함

</div>

[ [처음으로](#healthcare) ]
[ [돌아가기](#2-2-springboot) ]

&nbsp;
***

### 2. 2. 3 MVC Model 2

<p aling="center"><img width="100%" src="https://user-images.githubusercontent.com/59362257/227862180-9ba06407-e59d-4e93-bdcf-fc14a7afed8b.png"></p>

<div style="border: 1px solid white; padding-top: 1.5vh; margin-bottom: 1vh">

- 본 프로젝트에서 채택중인 `MVC Pattern`
- `Spring Framework` 에서 권장하는 패턴 / 널리 표준으로 사용되는 `Design Pattern` 
- `MVC Model 1` 과 달리 `Controller` 와 `View` 가 분리되어 `MVC Model 1` 의 단점 보완
- `Model`, `View`, `Controller` 가 분리되어 있으므로, 문제가 있는 부분만 별도로 수정 가능
  - 유지보수 용이함

</div>

[ [처음으로](#healthcare) ]
[ [돌아가기](#2-2-springboot) ]

&nbsp;
***

### 2. 2. 4 HealthCare Design Pattern 

- **본 프로젝트에서는 `MVC Model 2`를 채택하여 사용**
- `Project Architecture`에 대한 세부정보는 아래 링크를 참조
    - [ [SpringBoot Architecture](./docs/SpringBoot_Architecture.md) ]


<p align="center"><img width="100%" src="https://user-images.githubusercontent.com/59362257/228431610-6a76ff6b-ae60-4757-936d-9e361db076bb.png"></p>

[ [처음으로](#healthcare) ]
[ [돌아가기](#2-2-springboot) ]



&nbsp;
***



## 2. 3 Database

- [2. 3 Database](#2-3-database)
    - [2. 3. 1 Tables](#2-3-1-tables)
    - [2. 3. 2 ERD](#2-3-2-erd-entity-relation-diagram)

[ [처음으로](#healthcare) ]
[ [돌아가기](#2-architecture) ]

&nbsp;
***

### 2. 3. 1 Tables

- 회원 관련
    - `Auth`: 인증 토큰 테이블
    - `User`: 유저 테이블
- Introduce 관련
    - `Staff`: 헬스장 트레이너 소개 테이블
    - `Facility`: 헬스장 시설 소개 테이블
    - `Image`: 헬스장 시설 이미지 테이블
- Support 관련
    - `Post`: 게시글 테이블
    - `Comment`: 댓글 테이블
    - `Attachment`: 첨부파일 테이블
- LiveChat 관련
    - `ChatRoom`: 고객지원 LiveChat 채팅방 테이블
    - `ChatMessage`: 고객지원 LiveChat 채팅 메세지 테이블
    - `UserChatRoom`: `User:ChatRoom` = `N:M` 연결 관계를 위한 중간 테이블
- 건강관리 관련
    - `BMI`: 고객 체질량지수 테이블
    - `Diet`: 고객 식단 테이블
    - `Food`: 음식 정보 테이블
    - `DietFood`: `Diet:Food` = `N:M` 연결 관계를 위한 중간 테이블

[ [처음으로](#healthcare) ]
[ [돌아가기](#2-3-database) ]

&nbsp;
***

### 2. 3. 2 ERD (Entity-Relation Diagram)
<p align="center"><img width="100%" src="https://github.com/JoSihun/HealthCare/assets/59362257/8b063c26-9c6c-412b-b576-30b1ae76e0a6"></p>

[ [처음으로](#healthcare) ]
[ [돌아가기](#2-3-database) ]



&nbsp;
***





# 3. Features

- [3. Features](#3-features)
    - [3. 1 Features](#3-1-features)
    - [3. 2 REST API](#3-2-rest-api)

[ [처음으로](#healthcare) ]
[ [목차보기](#table-of-contents) ]



&nbsp;
***



## 3. 1 Features

- 헬스장 운영측 고객관리 기능 제공
    - `JWT` 인증 토큰 기반 회원 관리 기능 제공
    - `WebSocket` 기반 `LiveChat` 고객지원 서비스 제공
- 헬스장 사용자 건강관리 기능 제공
    - ex) `인바디`, `운동 루틴 추천`, `식단 추천` 등
    - 인바디 체성분(BMI) 그래프 제공
    - 인바디 체성분(BMI) 기반 `식단 관리`, `식단 추천` 서비스 제공
    - 인바디 체성분(BMI) 기반 `운동 루틴 추천` 서비스 제공
- 헬스장 사용자 커뮤니티 기능 제공
    - ex) `FAQ`, `Q&A`, `자유게시판`, `댓글`, `첨부파일` 등
- 공공데이터포털 `농촌진흥청_추천식단정보` 데이터 활용
- 공공데이터포털 `한국건강증진개발원_보건소 모바일 헬스케어_체성분(BMI)` 데이터 활용



&nbsp;
***



## 3. 2 REST API

- REST API에 대한 세부정보는 아래 링크를 참조
    - [ [REST API Document](./docs/REST%20API.md) ]





&nbsp;
***





# 4. Server & DNS

- [4. Server & DNS](#4-server--dns)
    - [4. 1 Server](#4-1-server)
    - [4. 2 DNS](#4-2-dns-domain-name-system)

[ [처음으로](#healthcare) ]
[ [목차보기](#table-of-contents) ]



&nbsp;
***



## 4. 1 Server

- 서버부재로 현재 미완

<div style="color: white; border: 2px solid red; padding: 0px 10px 0px 20px"><h2><strong>
    작성 미완료! | 작성 미완료! | 작성 미완료! | 작성 미완료! | 작성 미완료! |
</strong></h2></div>



&nbsp;
***



## 4. 2 DNS (Domain Name System)

<p align="center">
  <img width="50%" src="https://user-images.githubusercontent.com/59362257/227839526-ed892d25-aced-4980-88e5-548bd89600a7.png"> <img width="48%" src="https://user-images.githubusercontent.com/59362257/227864462-7719d618-1f75-438d-b8a5-65a8a1f0c3af.png">
</p>  

- 클라이언트는 DNS로부터 전달받은 IP주소로 `REQUEST` 요청을 보내고 `RESPONSE` 응답을 받는다.  
- DNS(Domain Name System)는 사람이 읽을 수 있는 도메인을, 기계가 읽을 수 있는 IP주소로 변환한다.  
  - 사람이 읽을 수 있는 도메인: `https://www.example.com`, `https://example.com`, `example.com` 등
  - 기계가 읽을 수 있는 IP주소: `그림1예시(192.0.2.11)`, `AMAZON(192.0.2.44)` 등

[Reference]: [Amazon AWS: What is DNS (https://aws.amazon.com/ko/route53/what-is-dns/)](https://aws.amazon.com/ko/route53/what-is-dns/)  





&nbsp;
***





# 5. Contributing

- [5. Contributing](#5-contributing)
    - [5. 1 Contribute](#5-1-contribute)
    - [5. 2 Future Plans](#5-2-future-plans)
    - [5. 3 Result](#5-3-result)

[ [처음으로](#healthcare) ]
[ [목차보기](#table-of-contents) ]



&nbsp;
***



## 5. 1 Contribute

정영도
- 프로젝트 기획
- 헬스장 소개
    - (FE) React 화면 구현
    - (BE) REST API 기능 구현
    - (BE) 데이터베이스 설계 및 구현
- 트레이너 소개
    - (FE) React 화면 구현
    - (BE) REST API 기능 구현
    - (BE) 데이터베이스 설계 및 구현
- 운동 루틴 추천 알고리즘 구현
    - 체질량지수(BMI) 기반 운동 루틴 추천 알고리즘 구현

&nbsp;

조시훈
- **프로젝트 설계 및 개발일정 관리**
- **회원 관리**
    - ***Backend (BE)***
        - REST API 기능 구현
        - ___JWT 인증 토큰 구현___
        - ___로그인 및 회원가입___
        - ___BCryptPasswordEncoder 패스워드 암호화___
        - 데이터베이스 설계 및 구현
    - ***Frontend (FE)***
        - React 화면 구현:
            - 로그인 및 회원가입 화면 구현
- **FAQ, Q&A, 자유게시판**
    - ***Backend (BE)***
        - CRUD 시스템
        - REST API 기능 구현
        - ___Binary Data 첨부파일 기능 구현___
        - 데이터베이스 설계 및 구현
    - ***Frontend (FE)***
        - React 화면 구현:
            - FAQ 게시판 화면
            - Q&A 게시판, 자유 게시판 목록 화면
            - Q&A 게시판, 자유 게시판 게시글 상세 화면
            - Q&A 게시판, 자유 게시판 게시글 작성 화면
            - Q&A 게시판, 자유 게시판 게시글 수정 화면
- **고객지원 LiveChat**
    - ***Backend (BE)***
        - REST API 기능 구현
        - 데이터베이스 설계 및 구현
        - ___WebSocket & STOMP 실시간 통신 기능 구현___
    - ***Frontend (FE)***
        - React 화면 구현:
            - 실시간 문의사항 채팅방 목록 화면
            - 실시가 문의사항 채팅방 기록 화면
- **BMI**
    - ***Backend (BE)***
        - CRUD 시스템
        - REST API 기능 구현
        - ___데이터베이스 설계 및 구현___
            - ___공공데이터포털 데이터 활용: `한국건강증진개발원_보건소 모바일 헬스케어_체성분(BMI)`___
    - ***Frontend (FE)***
        - React 화면 구현:
            - BMI 상세 화면
            - BMI 그래프 화면
- **Diet & Food**
    - ***Backend (BE)***
        - CRUD 시스템
        - REST API 기능 구현
        - ___개인 식단 관리 기능 구현___
        - ___BMI 기초대사량 및 칼로리 기반 식단 추천 알고리즘 구현___
        - ___데이터베이스 설계 및 구현___
            - ___공공데이터포털 데이터 활용: `농촌진흥청_추천식단정보`___
    - ***Frontend (FE)***
        - React 화면 구현:
            - 추천식단 목록 화면
            - 개인식단 목록 화면
            - 개인식단 상세 화면
            - 개인식단 추가 화면
            - 개인식단 수정 화면


[ [처음으로](#healthcare) ]
[ [돌아가기](#5-contributing) ]

&nbsp;
***

## 5. 2 Future Plans(Improvements)

- OAuth2 구현:
    - 애플리케이션 보안 강화 및 인증 프로세스 간소화
    - 사용자에게 보다 안전하고 편리한 로그인 시스템 제공
- Flutter 적용:
    - 크로스 플랫폼 개발 프레임워크 사용
    - iOS 및 Android용 인터페이스 구축 가능
    - 응답성, 성능 및 접근성 향상
- React Native 적용:
    - 크로스 플랫폼 개발 프레임워크 사용
    - iOS 및 Android 등 모바일 환경 확장
    - 사용자 사용 환경 개선 및 접근성 향상
- Spring Mobile 적용:
    - 모바일 플랫폼 접근성 향상
    - 사용자 인터페이스 최적화, 응답성 개선, 모바일 사용 경험 제공
- 중요 업데이트 알림 시스템 구축:
    - 사용자 운동 시간, 추천 식단 등 개인 건강관리 관련 알림
    - 휴일, 공휴일에 따른 운영시간 변경 및 할인 이벤트 등 알림
    - 사용자 편의 기능 개선 및 접근성 향상 목적
- 리팩토링을 통한 코드 최적화:
    - 패키지 구조 및 코드 최적화
    - 코드 가독성 향상, 중복 코드 제거, 성능 및 유지보수 향상

[ [처음으로](#healthcare) ]
[ [돌아가기](#5-contributing) ]

&nbsp;
***

## 5. 3 Result

<div style="color: white; border: 2px solid red; padding: 0px 10px 0px 20px;"><h2><strong>
    이 밑으로 작성 미완료! | 이 밑으로 작성 미완료! | 이 밑으로 작성 미완료! |
</strong></h2></div>

### 5. 1. 1 FAQ
<p align="center"><img width="50%" src="https://user-images.githubusercontent.com/59362257/228136980-6df9a436-2026-4fad-996d-fc3ac0ba55fb.png"><img width="50%" src="https://user-images.githubusercontent.com/59362257/228136786-ceb8abce-346b-4964-8ded-a500c6ee4acb.png"></p>
<p align="center">FAQ 게시판<br>목록 및 수정화면(왼쪽), 작성화면(오른쪽)</p>

### 5. 1. 2 Q&A
<p align="center"><img width="50%" src="https://user-images.githubusercontent.com/59362257/228156675-ad4459e9-687b-4cdb-b4a8-4b7e1dd05a55.png"><img width="50%" src="https://user-images.githubusercontent.com/59362257/228156912-488928e6-81fa-4697-aa8e-04afd3b72ab5.png"></p>
<p align="center">Q&A 게시판<br>목록화면(왼쪽), 게시글화면(오른쪽)</p>

<p align="center"><img width="50%" src="https://user-images.githubusercontent.com/59362257/228157140-926a6679-f7ec-432a-a5a7-b0177b35e180.png"><img width="50%" src="https://user-images.githubusercontent.com/59362257/228157288-f4148bc4-3b8b-43f3-be4a-3d81d7d96b4a.png"></p>
<p align="center">Q&A 게시판<br>작성화면(왼쪽), 수정화면(오른쪽)</p>

### 5. 1. 3 자유게시판

<p align="center"><img width="50%" src="https://user-images.githubusercontent.com/59362257/228138342-6d83eae7-26e0-4af4-9aab-9f196ea37088.png"><img width="50%" src="https://user-images.githubusercontent.com/59362257/228157487-d397f882-a596-4c9d-ae1d-721d31bd285e.png"></p>
<p align="center">자유게시판<br>목록화면(왼쪽), 게시글화면(오른쪽)</p>

<p align="center"><img width="50%" src="https://user-images.githubusercontent.com/59362257/228137965-fcaa1352-6914-4069-bd55-1a2ff98a3c56.png"><img width="50%" src="https://user-images.githubusercontent.com/59362257/228157764-43727254-50ce-40f7-8154-e545496bf839.png"></p>
<p align="center">자유게시판<br>작성화면(왼쪽), 수정화면(오른쪽)</p>

### 5. 1. 4 댓글화면

<p align="center"><img width="50%" src="https://user-images.githubusercontent.com/59362257/228460637-e6be9fb0-4f53-42a3-822d-fe597520c61f.png"><img width="50%" src="https://user-images.githubusercontent.com/59362257/228460870-29cb613c-7837-4d41-9313-08c5502067e1.png"></p>
<p align="center">자유게시판<br>댓글작성화면(왼쪽), 댓글수정화면(오른쪽)</p>

### 5. 1. 5 WebSocket LiveChat

<p align="center"><img width="50%" src="https://user-images.githubusercontent.com/59362257/228139129-6c245d19-f4e1-43b5-bb89-4542aa5ddbc5.png"><img width="50%" src="https://user-images.githubusercontent.com/59362257/228139291-1b2291d8-41d0-4b66-af0f-859f5623313b.png"></p>
<p align="center">채팅방 목록화면<br>고객화면(왼쪽), 관리자화면(오른쪽)</p>

<p align="center"><img width="75%" src="https://user-images.githubusercontent.com/59362257/228158782-defc7bfd-65d8-4622-bbad-23556a3b3c0c.png">
<p align="center">채팅방 화면<br>고객화면(왼쪽), 관리자화면(오른쪽)</p>

[ [처음으로](#healthcare) ]
[ [돌아가기](#5-contributing) ]
