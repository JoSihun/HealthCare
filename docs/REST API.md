# 3. 2 REST API
- 아래 기능들에 대해서 `RESTful` 하게 `API`를 구현

[ [처음으로](../README.md#healthcare) ]
[ [돌아가기](../README.md#3-2-rest-api) ]



&nbsp;
***



# 3. 2. 1 Tables of contents

- ## **[1. Introduce](#1-introduce)**
    - **[1. 1 Staff API](#1-1-staff-api)**
        - **[1. 1. 1 기능소개 1](#1-1-1-기능소개-1)**
        - **[1. 1. 2 기능소개 2](#1-1-2-기능소개-2)**
        - **[1. 1. 3 기능소개 3](#1-1-3-기능소개-3)**
    - **[1. 2 Facility API](#1-2-facility-api)**
        - **[1. 2. 1 기능소개 1](#1-2-1-기능소개-1)**
        - **[1. 2. 2 기능소개 2](#1-2-2-기능소개-2)**
        - **[1. 2. 3 기능소개 3](#1-2-3-기능소개-3)**
    - **[1. 3 Direction API](#1-3-direction-api)**
        - **[1. 3. 1 기능소개 1](#1-3-1-기능소개-1)**
        - **[1. 3. 2 기능소개 2](#1-3-2-기능소개-2)**
        - **[1. 3. 3 기능소개 3](#1-3-3-기능소개-3)**
- ## **[2. Support](#2-support)**
    - **[2. 1 Post API](#2-1-post-api)**
        - [2. 1. 1 게시글 상세조회](#2-1-1-게시글-상세조회)
        - [2. 1. 2 게시판 목록조회](#2-1-2-게시판-목록조회)
        - [2. 1. 3 게시판 검색조회](#2-1-3-게시판-검색조회)
        - [2. 1. 4 게시글 데이터 삽입](#2-1-4-게시글-데이터-삽입---v1)
        - [2. 1. 5 게시글 데이터 수정](#2-1-5-게시글-데이터-수정---v1)
        - [2. 1. 6 게시글 데이터 삭제](#2-1-6-게시글-데이터-삭제---v1)
    - **[2. 2 Comment API](#2-2-comment-api)**
        - [2. 2. 1 댓글 조회](#2-2-1-댓글-조회)
        - [2. 2. 2 댓글 생성](#2-2-2-댓글-생성)
        - [2. 2. 3 댓글 수정](#2-2-3-댓글-수정)
        - [2. 2. 4 댓글 삭제](#2-2-4-댓글-삭제)
    - **[2. 3 Attachment API](#2-3-attachment-api)**
        - [2. 3. 1 첨부파일 조회](#2-3-1-첨부파일-조회)
        - [2. 3. 2 첨부파일 생성](#2-3-2-첨부파일-생성)
        - [2. 3. 3 첨부파일 수정](#2-3-3-첨부파일-수정)
        - [2. 3. 4 첨부파일 삭제](#2-3-4-첨부파일-삭제)
        - [2. 3. 5 첨부파일 다운로드](#2-3-5-첨부파일-다운로드)
        - [2. 3. 6 첨부파일 바이너리](#2-3-6-첨부파일-바이너리)
    - **[2. 4 ChatRoom API](#2-4-chatroom-api)**
        - [2. 4. 1 채팅방 조회](#2-3-1-채팅방-조회)
        - [2. 4. 2 채팅방 생성](#2-3-2-채팅방-생성)
        - [2. 4. 3 채팅방 수정](#2-3-3-채팅방-수정)
        - [2. 4. 4 채팅방 삭제](#2-3-4-채팅방-삭제)
        - [2. 4. 5 채팅방 검색조회 - UUID](#2-3-5-채팅방-검색조회---UUID)
        - [2. 4. 6 채팅방 사용자 목록조회 - List](#2-3-6-채팅방-사용자-목록조회---List)
        - [2. 4. 7 채팅방 사용자 목록조회 - Page](#2-3-7-채팅방-사용자-목록조회---Page)
        - [2. 4. 8 채팅방 관리자 목록조회 - List](#2-3-8-채팅방-관리자-목록조회---List)
        - [2. 4. 9 채팅방 관리자 목록조회 - Page](#2-3-9-채팅방-관리자-목록조회---Page)
    - **[2. 5 ChatMessage API](#2-5-chatmessage-api)**
        - [2. 5. 1 채팅 메세지 조회](#2-5-1-채팅-메세지-조회)
        - [2. 5. 2 채팅 메세지 송신](#2-5-2-채팅-메세지-송신)
        - [2. 5. 3 채팅 메세지 수신](#2-5-3-채팅-메세지-수신)
- ## **[3. Management](#3-management)**
    - **[3. 1 BMI API](#3-1-bmi-api)**
        - [3. 1. 1 BMI 조회](#3-1-1-bmi-조회)
        - [3. 1. 2 BMI 생성](#3-1-2-bmi-생성)
        - [3. 1. 3 BMI 수정](#3-1-3-bmi-수정)
        - [3. 1. 4 BMI 삭제](#3-1-4-bmi-삭제)
        - [3. 1. 5 BMI 목록조회 - List](#3-1-5-bmi-목록조회---list)
        - [3. 1. 6 BMI 목록조회 - Page](#3-1-6-bmi-목록조회---page)
    - **[3. 2 Diet API](#3-2-diet-api)**
        - [3. 2. 1 Diet 조회](#3-2-1-diet-조회)
        - [3. 2. 2 Diet 생성](#3-2-2-diet-생성)
        - [3. 2. 3 Diet 수정](#3-2-3-diet-수정)
        - [3. 2. 4 Diet 삭제](#3-2-4-diet-삭제)
        - [3. 2. 5 Diet 추천목록 - List](#3-2-5-diet-추천목록---list)
        - [3. 2. 6 Diet 목록조회 - Page](#3-2-6-diet-목록조회---page)





&nbsp;
***





# 1. Introduce





&nbsp;
***





# 2. Support
- [2. Support](#2-support)
    - [2. 1 Post API](#2-1-post-api)
    - [2. 2 Comment API](#2-2-comment-api)
    - [2. 3 Attachment API](#2-3-attachment-api)
    - [2. 4 ChatRoom API](#2-4-chatroom-api)
    - [2. 5 ChatMessage API](#2-5-chatmessage-api)

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#3-2-rest-api) ]



&nbsp;
***



## 2. 1 Post API
- [2. 1 Post API](#2-1-post-api)
    - [2. 1. 1 게시글 상세조회](#2-1-1-게시글-상세조회)
    - [2. 1. 2 게시판 목록조회](#2-1-2-게시판-목록조회)
    - [2. 1. 3 게시판 검색조회](#2-1-3-게시판-검색조회)
    - [2. 1. 4 게시글 데이터 삽입](#2-1-4-게시글-데이터-삽입---v1)
    - [2. 1. 5 게시글 데이터 수정](#2-1-5-게시글-데이터-수정---v1)
    - [2. 1. 6 게시글 데이터 삭제](#2-1-6-게시글-데이터-삭제---v1)

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-support) ]

&nbsp;
***

### 2. 1. 1 게시글 상세조회

### Request

- **URL**: `/api/v1/post/{id}`
- **Method**: `GET`
- **Path Parameters**:
    - `id`: 게시글 아이디

### Response

```json
{
  "id": 1,
  "title": "Sample Post",
  "content": "This is a sample post."
}
```
[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-1-post-api) ]

&nbsp;
***

### 2. 1. 2 게시판 목록조회

### Request

- **URL**: `/api/v1/post/{board-type}`
- **Method**: `GET`
- **Path Parameters**:
    - `board-type`: 게시판 성격, (ex: `faq-board`, `qna-baord`, `free-board`)
- **Query Parameters**:
    - `page`: 게시글 목록 페이지 번호, (ex: `page=0`)
    - `size`: 게시글 목록 페이지 크기, (ex: `size=20`)
    - `sort`: 게시글 목록 정렬 옵션, (ex: `sort=id,desc&sort=title,desc`)

### Response

```json
{
  "content": [
    {
      "id": 1,
      "title": "Search Result 1",
      "content": "This is a search result."
    },
    {
      "id": 2,
      "title": "Search Result 2",
      "content": "This is another search result."
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 20,
    "offset": 0
  },
  "totalPages": 1,
  "totalElements": 2,
  "last": true
}
```
[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-1-post-api) ]

&nbsp;
***

### 2. 1. 3 게시판 검색조회

### Request

- **URL**: `/api/v1/post/{board-type}/search`
- **Method**: `GET`
- **Path Parameters**:
    - `board-type`: 게시판 성격, (ex: `faq-board`, `qna-baord`, `free-board`)
- **Query Parameters**:
    - `page`: 게시글 목록 페이지 번호, (ex: `page=0`)
    - `size`: 게시글 목록 페이지 크기, (ex: `size=20`)
    - `sort`: 게시글 목록 정렬 옵션, (ex: `sort=id,desc&sort=title,desc`)
    - `searchValue`: 검색단어, (ex: String)
    - `searchFilter`: 검색필터, (ex: `Title`, `Content`, `Author`, `TitleContent`, `TitleAuthor`, `ContentAuthor`)

### Response

```json
{
  "content": [
    {
      "id": 1,
      "title": "Search Result 1",
      "content": "This is a search result."
    },
    {
      "id": 2,
      "title": "Search Result 2",
      "content": "This is another search result."
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 20,
    "offset": 0
  },
  "totalPages": 1,
  "totalElements": 2,
  "last": true
}
```
[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-1-post-api) ]

&nbsp;
***

### 2. 1. 4 게시글 데이터 삽입 - v1

### Request

- **URL**: `/api/v1/post`
- **Method**: `POST`
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`
- **Request Body**:
    - **boardType**: `"FAQ_BOARD"`, `"QNA_BOARD"`, `"FREE_BOARD"`
    ```json
    {
        "title": "글 제목",
        "content": "글 내용",
        "boardType": "FREE_BOARD",
    }
    ```

### Response

- **Type**: `Long`
- **Description**: 생성된 게시글의 `ID`

&nbsp;
***

### 2. 1. 4 게시글 데이터 삽입 - v2

### Request
- **URL**: `/api/v2/post`
- **Method**: `POST`
- **Headers**:
    - **Content-Type**: `multipart/form-data`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`
- **Request Body**:
    - Form Fields:
        - **data**: 게시글 정보를 포함하고 있는 JSON 객체
        ```json
        {
            "title": "글 제목",
            "content": "글 내용",
            "boardType": "FREE_BOARD",
        }
        ```
        - **files** (optional): 첨부할 File 객체 리스트

### Response

- **Type**: `Long`
- **Description**: 생성된 게시글의 `ID`

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-1-post-api) ]

&nbsp;
***

### 2. 1. 5 게시글 데이터 수정 - v1

### Request

- **URL**: `/api/v1/post/{id}`
- **Method**: `PUT`
- **Path Parameters**:
    - `id`: 게시글 ID
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`
- **Request Body**:
    - **answerYn**: 답변 여부 (ex: `true`, `false`)
    - **secretYn**: 비밀글 여부 (ex: `true`, `false`)
    ```json
    {
        "title": "글 제목",
        "content": "글 내용",
        "answerYn": false,
        "secretYn": false,
    }
    ```

### Response

- **Type**: `Long`
- **Description**: 갱신된 게시글의 `ID`

&nbsp;
***

### 2. 1. 5 게시글 데이터 수정 - v2

### Request

- **URL**: `/api/v2/post/{id}`
- **Method**: `PUT`
- **Path Parameters**:
    - `id`: 게시글 ID
- **Headers**:
    - **Content-Type**: `multipart/form-data`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`
- **Request Body**:
    - Form Fields:
        - **data**: 게시글 정보를 포함하고 있는 JSON 객체
            - **answerYn**: 답변 여부 (ex: `true`, `false`)
            - **secretYn**: 비밀글 여부 (ex: `true`, `false`)
        ```json
        "data": {
            "title": "글 제목",
            "content": "글 내용",
            "answerYn": false,
            "secretYn": false,
        }
        ```
        - **files** (optional): 첨부할 File 객체 리스트

### Response

- **Type**: `Long`
- **Description**: 갱신된 게시글의 `ID`

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-1-post-api) ]

&nbsp;
***

### 2. 1. 6 게시글 데이터 삭제 - v1

### Request

- **URL**: `/api/v1/post/{id}`
- **Method**: `DELETE`
- **Path Parameters**:
    - `id`: 게시글 ID
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`

### Response

- **Type**: `None`
- **Description**: 아무것도 반환하지 않음

&nbsp;
***

### 2. 1. 6 게시글 데이터 삭제 - v2

### Request

- **URL**: `/api/v2/post/{id}`
- **Method**: `DELETE`
- **Path Parameters**:
    - `id`: 게시글 ID
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`

### Response

- **Type**: `None`
- **Description**: 아무것도 반환하지 않음

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-1-post-api) ]



&nbsp;
***



## 2. 2 Comment API

- [2. 2 Comment API](#2-2-comment-api)
    - [2. 2. 1 댓글 조회](#2-2-1-댓글-조회)
    - [2. 2. 2 댓글 생성](#2-2-2-댓글-생성)
    - [2. 2. 3 댓글 수정](#2-2-3-댓글-수정)
    - [2. 2. 4 댓글 삭제](#2-2-4-댓글-삭제)

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-support) ]

&nbsp;
***

### 2. 2. 1 댓글 조회

### Request

- **URL**: `/api/v1/comment`
- **Method**: `GET`
- **Query Parameters**:
    - `post`: 게시글 아이디 (ex: `post=1`)

### Response

```json
[
    {
        "id": 1,
        "author": "Username",
        "content": "Comment content",
        "secretYn": false,
        "createdDate": "2023-05-25T15:30:45.123",
        "updatedDate": "2023-05-25T15:30:45.123"
    },
    {
        "id": 2,
        "author": "Username",
        "content": "Comment content",
        "secretYn": false,
        "createdDate": "2023-05-25T15:30:45.123",
        "updatedDate": "2023-05-25T15:30:45.123"
    }
]
```

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-2-comment-api) ]

&nbsp;
***

### 2. 2. 2 댓글 생성

### Request

- **URL**: `/api/v1/comment`
- **Method**: `POST`
- **Query Parameters**:
    - `post`: 게시글 아이디 (ex: `post=1`)
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`
- **Request Body**:
    - **content**: String (ex: "댓글 내용")
    - **secretYn**: Boolean (ex: `true`, `false`)
    ```json
    {
        "content": "댓글 내용",
        "secretYn": true,
    }
    ```

### Response

- **Type**: `Long`
- **Description**: 생성된 댓글의 `ID`

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-2-comment-api) ]

&nbsp;
***

### 2. 2. 3 댓글 수정

### Request

- **URL**: `/api/v1/comment/{id}`
- **Method**: `PUT`
- **Path Parameters**:
    - `id`: 댓글 아이디
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`
- **Request Body**:
    - **content**: String (ex: `"댓글 내용"`)
    - **secretYn**: Boolean (ex: `true`, `false`)
    ```json
    {
        "content": "댓글 내용",
        "secretYn": false,
    }
    ```

### Response

- **Type**: `Long`
- **Description**: 수정된 댓글의 `ID`

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-2-comment-api) ]

&nbsp;
***

### 2. 2. 4 댓글 삭제

### Request

- **URL**: `/api/v1/comment/{id}`
- **Method**: `DELETE`
- **Path Parameters**:
    - `id`: 댓글 아이디
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`

### Response

- **Type**: `None`
- **Description**: 아무것도 반환하지 않음

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-2-comment-api) ]



&nbsp;
***



## 2. 3 Attachment API

- [2. 3 Attachment API](#2-3-attachment-api)
    - [2. 3. 1 첨부파일 조회](#2-3-1-첨부파일-조회)
    - [2. 3. 2 첨부파일 생성](#2-3-2-첨부파일-생성)
    - [2. 3. 3 첨부파일 수정](#2-3-3-첨부파일-수정)
    - [2. 3. 4 첨부파일 삭제](#2-3-4-첨부파일-삭제)
    - [2. 3. 5 첨부파일 다운로드](#2-3-5-첨부파일-다운로드)
    - [2. 3. 6 첨부파일 바이너리](#2-3-6-첨부파일-바이너리)

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-support) ]

&nbsp;
***

### 2. 3. 1 첨부파일 조회

### Request

- **URL**: `/api/v1/attachment`
- **Method**: `GET`
- **Query Parameters**:
    - `post`: 게시글 아이디 (ex: `post=1`)

### Response

```json
[
    {
        "id": 1,
        "fileSize": 10000,
        "fileName": "FileName",
        "fileType": "FileType",
        "createdDate": "2023-05-25T15:30:45.123",
        "updatedDate": "2023-05-25T15:30:45.123"
    },
    {
        "id": 2,
        "fileSize": 10000,
        "fileName": "FileName",
        "fileType": "FileType",
        "createdDate": "2023-05-25T15:30:45.123",
        "updatedDate": "2023-05-25T15:30:45.123"
    }
]
```

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-3-attachment-api) ]

&nbsp;
***

### 2. 3. 2 첨부파일 생성

### Request
- **URL**: `/api/v1/attachment`
- **Method**: `POST`
- **Query Parameters**:
    - `post`: 게시글 아이디 (ex: `post=1`)
- **Headers**:
    - **Content-Type**: `multipart/form-data`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`
- **Request Body**:
    - Form Fields:
        - **files** (optional): 첨부할 File 객체 리스트

### Response

- **Type**: `Long`
- **Description**: 첨부파일이 생성된 게시글의 `ID`

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-3-attachment-api) ]

&nbsp;
***

### 2. 3. 3 첨부파일 수정

### Request
- **URL**: `/api/v1/attachment`
- **Method**: `PUT`
- **Query Parameters**:
    - `post`: 게시글 아이디 (ex: `post=1`)
- **Headers**:
    - **Content-Type**: `multipart/form-data`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`
- **Request Body**:
    - Form Fields:
        - **files** (optional): 첨부할 File 객체 리스트

### Response

- **Type**: `Long`
- **Description**: 첨부파일이 수정된 게시글의 `ID`

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-3-attachment-api) ]

&nbsp;
***

### 2. 3. 4 첨부파일 삭제

### Request
- **URL**: `/api/v1/attachment`
- **Method**: `DELETE`
- **Query Parameters**:
    - `post`: 게시글 아이디 (ex: `post=1`)
- **Headers**:
    - **Content-Type**: `multipart/form-data`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`

### Response

- **Type**: `None`
- **Description**: 아무것도 반환하지 않음

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-3-attachment-api) ]

&nbsp;
***

### 2. 3. 5 첨부파일 다운로드

### Request
- **URL**: `/api/v1/attachment/download/{id}`
- **Method**: `GET`
- **Path Parameters**:
    - `id`: 첨부파일 아이디
- **Headers**:
    - **Content-Type**: `multipart/form-data`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`

### Response

- **Type**: `Binary Data`
- **Description**: 해당 첨부파일의 `바이너리 데이터`

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-3-attchment-api) ]

&nbsp;
***

### 2. 3. 6 첨부파일 바이너리

### Request
- **URL**: `/api/v1/attachment/binary/{id}`
- **Method**: `GET`
- **Path Parameters**:
    - `id`: 첨부파일 아이디
- **Headers**:
    - **Content-Type**: `multipart/form-data`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`

### Response

- **Type**: `Binary Data`
- **Description**: 해당 첨부파일의 `바이너리 데이터`

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-3-attchment-api) ]



&nbsp;
***



## 2. 4 ChatRoom API

- [2. 4 ChatRoom API](#2-4-chatroom-api)
    - [2. 4. 1 채팅방 조회](#2-4-1-채팅방-조회)
    - [2. 4. 2 채팅방 생성](#2-4-2-채팅방-생성)
    - [2. 4. 3 채팅방 수정](#2-4-3-채팅방-수정)
    - [2. 4. 4 채팅방 삭제](#2-4-4-채팅방-삭제)
    - [2. 4. 5 채팅방 검색조회 - UUID](#2-4-5-채팅방-검색조회---UUID)
    - [2. 4. 6 채팅방 사용자 목록조회 - List](#2-4-6-채팅방-사용자-목록조회---List)
    - [2. 4. 7 채팅방 사용자 목록조회 - Page](#2-4-7-채팅방-사용자-목록조회---Page)
    - [2. 4. 8 채팅방 관리자 목록조회 - List](#2-4-8-채팅방-관리자-목록조회---List)
    - [2. 4. 9 채팅방 관리자 목록조회 - Page](#2-4-9-채팅방-관리자-목록조회---Page)
    

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-support) ]

&nbsp;
***

### 2. 4. 1 채팅방 조회

### Request

- **URL**: `/api/v1/livechat/room/{id}`
- **Method**: `GET`
- **Path Parameters**:
    - `id`: 채팅방 ID

### Response

```json
{
    "id": 1,
    "uuid": "e4d3d500-1967-4b43-9d57-66c2b1f63f5a",
    "answerYn": false,
    "users": [
        {
            "id": 1,
            "name": "KorName",
            "email": "example@example.com",
            "contact": "010-1234-5678",
            "username": "Username",
            "birthday": "2000-01-01T00:00:00.000",
            "createdDate": "2023-05-25T15:30:45.123",
            "updatedDate": "2023-05-25T15:30:45.123"
        },
        {
            "id": 2,
            "name": "KorName",
            "email": "example@example.com",
            "contact": "010-1234-5678",
            "username": "Username",
            "birthday": "2000-01-01T00:00:00.000",
            "createdDate": "2023-05-25T15:30:45.123",
            "updatedDate": "2023-05-25T15:30:45.123"
        }
    ],
    "createdDate": "2023-05-25T15:30:45.123",
    "updatedDate": "2023-05-25T15:30:45.123"
}
```

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-4-chatroom-api) ]

&nbsp;
***

### 2. 4. 2 채팅방 생성

### Request

- **URL**: `/api/v1/livechat/room`
- **Method**: `POST`
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`

### Response

- **Type**: `Long`
- **Description**: 생성된 채팅방의 `ID`

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-4-chatroom-api) ]

&nbsp;
***

### 2. 4. 3 채팅방 수정

### Request

- **URL**: `/api/v1/livechat/room/{id}`
- **Method**: `PUT`
- **Path Parameters**:
    - `id`: 채팅방 ID
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`
- **Request Body**:
    ```json
    {
        "uuid": "고유 UUID",
        "answerYn": "답변 여부",
    }
    ```

### Response

- **Type**: `Long`
- **Description**: 수정된 채팅방의 `ID`

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-4-chatroom-api) ]

&nbsp;
***

### 2. 4. 4 채팅방 삭제

### Request

- **URL**: `/api/v1/livechat/room/{id}`
- **Method**: `DELETE`
- **Path Parameters**:
    - `id`: 채팅방 ID
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`

### Response

- **Type**: `None`
- **Description**: 아무것도 반환하지 않음

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-4-chatroom-api) ]

&nbsp;
***

### 2. 4. 5 채팅방 검색조회 - UUID

### Request

- **URL**: `/api/v1/livechat/room`
- **Method**: `GET`
- **Query Parameters**:
    - `uuid`: 검색할 채팅방 `UUID` (ex: `uuid=e4d3d500-1967-4b43-9d57-66c2b1f63f5a`)

### Response

```json
{
    "id": 1,
    "uuid": "e4d3d500-1967-4b43-9d57-66c2b1f63f5a",
    "answerYn": false,
    "users": [
        {
            "id": 1,
            "name": "KorName",
            "email": "example@example.com",
            "contact": "010-1234-5678",
            "username": "Username",
            "birthday": "2000-01-01T00:00:00.000",
            "createdDate": "2023-05-25T15:30:45.123",
            "updatedDate": "2023-05-25T15:30:45.123"
        },
        {
            "id": 2,
            "name": "KorName",
            "email": "example@example.com",
            "contact": "010-1234-5678",
            "username": "Username",
            "birthday": "2000-01-01T00:00:00.000",
            "createdDate": "2023-05-25T15:30:45.123",
            "updatedDate": "2023-05-25T15:30:45.123"
        }
    ],
    "createdDate": "2023-05-25T15:30:45.123",
    "updatedDate": "2023-05-25T15:30:45.123"
}
```

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-4-chatroom-api) ]

&nbsp;
***

### 2. 4. 6 채팅방 사용자 목록조회 - List

### Request

- **URL**: `/api/v1/livechat/list`
- **Method**: `GET`
- **Query Parameters**:
    - `sort(optional, default: desc)`: 채팅방 목록 정렬 옵션, (ex: `sort=asc`, `sort=desc`)
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`

### Response

```json
[
    {
        "id": 1,
        "uuid": "e4d3d500-1967-4b43-9d57-66c2b1f63f5a",
        "answerYn": false,
        "users": [
            {
                "id": 1,
                "name": "KorName",
                "email": "example@example.com",
                "contact": "010-1234-5678",
                "username": "Username",
                "birthday": "2000-01-01T00:00:00.000",
                "createdDate": "2023-05-25T15:30:45.123",
                "updatedDate": "2023-05-25T15:30:45.123"
            },
            {
                "id": 2,
                "name": "KorName",
                "email": "example@example.com",
                "contact": "010-1234-5678",
                "username": "Username",
                "birthday": "2000-01-01T00:00:00.000",
                "createdDate": "2023-05-25T15:30:45.123",
                "updatedDate": "2023-05-25T15:30:45.123"
            }
        ],
        "createdDate": "2023-05-25T15:30:45.123",
        "updatedDate": "2023-05-25T15:30:45.123"
    },
    {
        "id": 2,
        "uuid": "abcd1234-5678-efgh-9012-ijklmnopqrst",
        "answerYn": true,
        "users": [
            {
                "id": 3,
                "name": "AnotherName",
                "email": "another@example.com",
                "contact": "010-9876-5432",
                "username": "AnotherUser",
                "birthday": "1990-05-15T00:00:00.000",
                "createdDate": "2023-05-26T10:45:30.456",
                "updatedDate": "2023-05-26T10:45:30.456"
            },
            {
                "id": 4,
                "name": "AnotherName",
                "email": "another@example.com",
                "contact": "010-9876-5432",
                "username": "AnotherUser",
                "birthday": "1990-05-15T00:00:00.000",
                "createdDate": "2023-05-26T10:45:30.456",
                "updatedDate": "2023-05-26T10:45:30.456"
            }
        ],
        "createdDate": "2023-05-26T10:45:30.456",
        "updatedDate": "2023-05-26T10:45:30.456"
    }
]
```

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-4-chatroom-api) ]

&nbsp;
***

### 2. 4. 7 채팅방 사용자 목록조회 - Page

### Request

- **URL**: `/api/v1/livechat/page`
- **Method**: `GET`
- **Query Parameters**:
    - `page (optional, default: 1)`: 채팅방 목록 페이지 번호, (ex: `page=1`)
    - `size (optional, default: 10)`: 채팅방 목록 페이지 크기, (ex: `size=10`)
    - `sort (optional, default: desc)`: 채팅방 목록 정렬 옵션, (ex: `sort=asc`, `sort=desc`)
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`

### Response

```json
{
    "content": [
        {
            "id": 1,
            "uuid": "e4d3d500-1967-4b43-9d57-66c2b1f63f5a",
            "answerYn": false,
            "users": [
                {
                    "id": 1,
                    "name": "KorName",
                    "email": "example@example.com",
                    "contact": "010-1234-5678",
                    "username": "Username",
                    "birthday": "2000-01-01T00:00:00.000",
                    "createdDate": "2023-05-25T15:30:45.123",
                    "updatedDate": "2023-05-25T15:30:45.123"
                },
                {
                    "id": 2,
                    "name": "KorName",
                    "email": "example@example.com",
                    "contact": "010-1234-5678",
                    "username": "Username",
                    "birthday": "2000-01-01T00:00:00.000",
                    "createdDate": "2023-05-25T15:30:45.123",
                    "updatedDate": "2023-05-25T15:30:45.123"
                }
            ],
            "createdDate": "2023-05-25T15:30:45.123",
            "updatedDate": "2023-05-25T15:30:45.123"
        },
        {
            "id": 2,
            "uuid": "abcd1234-5678-efgh-9012-ijklmnopqrst",
            "answerYn": true,
            "users": [
                {
                    "id": 3,
                    "name": "AnotherName",
                    "email": "another@example.com",
                    "contact": "010-9876-5432",
                    "username": "AnotherUser",
                    "birthday": "1990-05-15T00:00:00.000",
                    "createdDate": "2023-05-26T10:45:30.456",
                    "updatedDate": "2023-05-26T10:45:30.456"
                },
                {
                    "id": 4,
                    "name": "AnotherName",
                    "email": "another@example.com",
                    "contact": "010-9876-5432",
                    "username": "AnotherUser",
                    "birthday": "1990-05-15T00:00:00.000",
                    "createdDate": "2023-05-26T10:45:30.456",
                    "updatedDate": "2023-05-26T10:45:30.456"
                }
            ],
            "createdDate": "2023-05-26T10:45:30.456",
            "updatedDate": "2023-05-26T10:45:30.456"
        }
    ],
    "pageable": {
        "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
        },
        "offset": 0,
        "pageNumber": 0,
        "pageSize": 20,
        "unpaged": false,
        "paged": true
    },
    "totalElements": 2,
    "totalPages": 1,
    "last": true,
    "number": 0,
    "size": 10,
    "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
    },
    "numberOfElements": 2,
    "first": true,
    "empty": false
}
```

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-4-chatroom-api) ]

&nbsp;
***

### 2. 4. 8 채팅방 관리자 목록조회 - List

### Request

- **URL**: `/api/v1/admin/livechat/list`
- **Method**: `GET`
- **Query Parameters**:
    - `sort(optional, default: desc)`: 채팅방 목록 정렬 옵션, (ex: `sort=asc`, `sort=desc`)
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`

### Response

```json
[
    {
        "id": 1,
        "uuid": "e4d3d500-1967-4b43-9d57-66c2b1f63f5a",
        "answerYn": false,
        "users": [
            {
                "id": 1,
                "name": "KorName",
                "email": "example@example.com",
                "contact": "010-1234-5678",
                "username": "Username",
                "birthday": "2000-01-01T00:00:00.000",
                "createdDate": "2023-05-25T15:30:45.123",
                "updatedDate": "2023-05-25T15:30:45.123"
            },
            {
                "id": 2,
                "name": "KorName",
                "email": "example@example.com",
                "contact": "010-1234-5678",
                "username": "Username",
                "birthday": "2000-01-01T00:00:00.000",
                "createdDate": "2023-05-25T15:30:45.123",
                "updatedDate": "2023-05-25T15:30:45.123"
            }
        ],
        "createdDate": "2023-05-25T15:30:45.123",
        "updatedDate": "2023-05-25T15:30:45.123"
    },
    {
        "id": 2,
        "uuid": "abcd1234-5678-efgh-9012-ijklmnopqrst",
        "answerYn": true,
        "users": [
            {
                "id": 3,
                "name": "AnotherName",
                "email": "another@example.com",
                "contact": "010-9876-5432",
                "username": "AnotherUser",
                "birthday": "1990-05-15T00:00:00.000",
                "createdDate": "2023-05-26T10:45:30.456",
                "updatedDate": "2023-05-26T10:45:30.456"
            },
            {
                "id": 4,
                "name": "AnotherName",
                "email": "another@example.com",
                "contact": "010-9876-5432",
                "username": "AnotherUser",
                "birthday": "1990-05-15T00:00:00.000",
                "createdDate": "2023-05-26T10:45:30.456",
                "updatedDate": "2023-05-26T10:45:30.456"
            }
        ],
        "createdDate": "2023-05-26T10:45:30.456",
        "updatedDate": "2023-05-26T10:45:30.456"
    }
]
```

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-4-chatroom-api) ]

&nbsp;
***

### 2. 4. 9 채팅방 관리자 목록조회 - Page

### Request

- **URL**: `/api/v1/admin/livechat/page`
- **Method**: `GET`
- **Query Parameters**:
    - `page (optional, default: 1)`: 채팅방 목록 페이지 번호, (ex: `page=1`)
    - `size (optional, default: 10)`: 채팅방 목록 페이지 크기, (ex: `size=10`)
    - `sort (optional, default: desc)`: 채팅방 목록 정렬 옵션, (ex: `sort=asc`, `sort=desc`)
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`

### Response

```json
{
    "content": [
        {
            "id": 1,
            "uuid": "e4d3d500-1967-4b43-9d57-66c2b1f63f5a",
            "answerYn": false,
            "users": [
                {
                    "id": 1,
                    "name": "KorName",
                    "email": "example@example.com",
                    "contact": "010-1234-5678",
                    "username": "Username",
                    "birthday": "2000-01-01T00:00:00.000",
                    "createdDate": "2023-05-25T15:30:45.123",
                    "updatedDate": "2023-05-25T15:30:45.123"
                },
                {
                    "id": 2,
                    "name": "KorName",
                    "email": "example@example.com",
                    "contact": "010-1234-5678",
                    "username": "Username",
                    "birthday": "2000-01-01T00:00:00.000",
                    "createdDate": "2023-05-25T15:30:45.123",
                    "updatedDate": "2023-05-25T15:30:45.123"
                }
            ],
            "createdDate": "2023-05-25T15:30:45.123",
            "updatedDate": "2023-05-25T15:30:45.123"
        },
        {
            "id": 2,
            "uuid": "abcd1234-5678-efgh-9012-ijklmnopqrst",
            "answerYn": true,
            "users": [
                {
                    "id": 3,
                    "name": "AnotherName",
                    "email": "another@example.com",
                    "contact": "010-9876-5432",
                    "username": "AnotherUser",
                    "birthday": "1990-05-15T00:00:00.000",
                    "createdDate": "2023-05-26T10:45:30.456",
                    "updatedDate": "2023-05-26T10:45:30.456"
                },
                {
                    "id": 4,
                    "name": "AnotherName",
                    "email": "another@example.com",
                    "contact": "010-9876-5432",
                    "username": "AnotherUser",
                    "birthday": "1990-05-15T00:00:00.000",
                    "createdDate": "2023-05-26T10:45:30.456",
                    "updatedDate": "2023-05-26T10:45:30.456"
                }
            ],
            "createdDate": "2023-05-26T10:45:30.456",
            "updatedDate": "2023-05-26T10:45:30.456"
        }
    ],
    "pageable": {
        "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
        },
        "offset": 0,
        "pageNumber": 0,
        "pageSize": 20,
        "unpaged": false,
        "paged": true
    },
    "totalElements": 2,
    "totalPages": 1,
    "last": true,
    "number": 0,
    "size": 10,
    "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
    },
    "numberOfElements": 2,
    "first": true,
    "empty": false
}
```

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-4-chatroom-api) ]



&nbsp;
***



## 2. 5 ChatMessage API
- [2. 5 ChatMessage API](#2-5-chatmessage-api)
    - [2. 5. 1 채팅 메세지 조회](#2-5-1-채팅-메세지-조회)
    - [2. 5. 2 채팅 메세지 송신](#2-5-2-채팅-메세지-송신)
    - [2. 5. 3 채팅 메세지 수신](#2-5-3-채팅-메세지-수신)

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-support) ]

&nbsp;
***

### 2. 5. 1 채팅 메세지 조회

### Request
- **URL**: `/api/v1/livechat/message`
- **Method**: `GET`
- **Query Parameters**:
  - `chatRoom (optional)`: 채팅방 ID (ex: `chatRoom=1`)
  - `uuid (optional)`: 채팅방 UUID (ex: `uuid=e4d3d500-1967-4b43-9d57-66c2b1f63f5a`)
  - `sort (optional, default: `asc`)`: 채팅 메세지 정렬 옵션 (ex: `sort=asc`, `sort=desc`)

### Response

```json
[
    {
        "id": 1,
        "message": "Chat message 1",
        "sender": {
            "id": 1,
            "name": "KorName 1",
            "email": "example1@example.com",
            "contact": "010-1234-5678",
            "username": "Username1",
            "birthday": "2000-01-01T00:00:00.000",
            "createdDate": "2023-05-25T15:30:45.123",
            "updatedDate": "2023-05-25T15:30:45.123"
        },
        "chatRoom": {
            "id": 1,
            "uuid": "e4d3d500-1967-4b43-9d57-66c2b1f63f5a",
            "answerYn": false,
            "users": [
                {
                    "id": 1,
                    "name": "KorName 1",
                    "email": "example1@example.com",
                    "contact": "010-1234-5678",
                    "username": "Username1",
                    "birthday": "2000-01-01T00:00:00.000",
                    "createdDate": "2023-05-25T15:30:45.123",
                    "updatedDate": "2023-05-25T15:30:45.123"
                },
                {
                    "id": 2,
                    "name": "KorName 2",
                    "email": "example2@example.com",
                    "contact": "010-1234-5678",
                    "username": "Username2",
                    "birthday": "2000-01-01T00:00:00.000",
                    "createdDate": "2023-05-25T15:30:45.123",
                    "updatedDate": "2023-05-25T15:30:45.123"
                }
            ],
            "createdDate": "2023-05-25T15:30:45.123",
            "updatedDate": "2023-05-25T15:30:45.123"
        },
        "createdDate": "2023-05-25T15:30:45.123",
        "updatedDate": "2023-05-25T15:30:45.123"
    },
    {
        "id": 2,
        "message": "Chat message 2",
        "sender": {
            "id": 2,
            "name": "KorName 2",
            "email": "example2@example.com",
            "contact": "010-1234-5678",
            "username": "Username2",
            "birthday": "2000-01-02T00:00:00.000",
            "createdDate": "2023-05-26T15:30:45.123",
            "updatedDate": "2023-05-26T15:30:45.123"
        },
        "chatRoom": {
            "id": 2,
            "uuid": "abcd1234-5678-efgh-9012-ijklmnopqrst",
            "answerYn": true,
            "users": [
                {
                    "id": 3,
                    "name": "KorName 3",
                    "email": "example3@example.com",
                    "contact": "010-9876-5432",
                    "username": "Username3",
                    "birthday": "2000-01-03T00:00:00.000",
                    "createdDate": "2023-05-27T10:45:30.456",
                    "updatedDate": "2023-05-27T10:45:30.456"
                },
                {
                    "id": 4,
                    "name": "KorName 4",
                    "email": "example4@example.com",
                    "contact": "010-9876-5432",
                    "username": "Username4",
                    "birthday": "2000-01-04T00:00:00.000",
                    "createdDate": "2023-05-28T10:45:30.456",
                    "updatedDate": "2023-05-28T10:45:30.456"
                }
            ],
            "createdDate": "2023-05-26T10:45:30.456",
            "updatedDate": "2023-05-26T10:45:30.456"
        },
        "createdDate": "2023-05-26T15:30:45.123",
        "updatedDate": "2023-05-26T15:30:45.123"
    }
]
```

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-5-chatmessage-api) ]

&nbsp;
***

### 2. 5. 2 채팅 메세지 송신

### Request

- **URL**: `/chat/{channel}`
- **Method**: `MESSAGE`
- **Path Parameters**:
    - `channel`: 채팅방 UUID
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`
- **Request Body**:
    ```json
    {
        "message": "채팅 메세지",
    }
    ```

### Response

- **Type**: `None`
- **Description**: 아무것도 반환하지 않음

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-5-chatmessage-api) ]

&nbsp;
***

### 2. 5. 3 채팅 메세지 수신

### Request

- **URL**: `/sub/chat/{channel}`
- **Method**: `SUBSCRIBE`
- **Path Parameters**:
    - `channel`: 채팅방 UUID
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`

### Response

```json
{
    "id": 1,
    "message": "Chat message",
    "sender": {
        "id": 1,
        "name": "KorName",
        "email": "example@example.com",
        "contact": "010-1234-5678",
        "username": "Username",
        "birthday": "2000-01-01T00:00:00.000",
        "createdDate": "2023-05-25T15:30:45.123",
        "updatedDate": "2023-05-25T15:30:45.123"
    },
    "chatRoom": {
        "id": 1,
        "uuid": "e4d3d500-1967-4b43-9d57-66c2b1f63f5a",
        "answerYn": false,
        "users": [
            {
                "id": 1,
                "name": "KorName",
                "email": "example@example.com",
                "contact": "010-1234-5678",
                "username": "Username",
                "birthday": "2000-01-01T00:00:00.000",
                "createdDate": "2023-05-25T15:30:45.123",
                "updatedDate": "2023-05-25T15:30:45.123"
            },
            {
                "id": 2,
                "name": "KorName",
                "email": "example@example.com",
                "contact": "010-1234-5678",
                "username": "Username",
                "birthday": "2000-01-01T00:00:00.000",
                "createdDate": "2023-05-25T15:30:45.123",
                "updatedDate": "2023-05-25T15:30:45.123"
            }
        ],
        "createdDate": "2023-05-25T15:30:45.123",
        "updatedDate": "2023-05-25T15:30:45.123"
    },
    "createdDate": "2023-05-25T15:30:45.123",
    "updatedDate": "2023-05-25T15:30:45.123"
}
```

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#2-5-chatmessage-api) ]





&nbsp;
***





## 3. Management
- [3. Management](#3-management)
    - [3. 1 BMI API](#3-1-bmi-api)
    - [3. 2 Diet API](#3-2-diet-api)

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#3-2-rest-api) ]



&nbsp;
***



## 3. 1 BMI API
- [3. 1 BMI API](#3-1-bmi-api)
    - [3. 1. 1 BMI 조회](#3-1-1-bmi-조회)
    - [3. 1. 2 BMI 생성](#3-1-2-bmi-생성)
    - [3. 1. 3 BMI 수정](#3-1-3-bmi-수정)
    - [3. 1. 4 BMI 삭제](#3-1-4-bmi-삭제)
    - [3. 1. 5 BMI 목록조회 - List](#3-1-5-bmi-목록조회---list)
    - [3. 1. 6 BMI 목록조회 - Page](#3-1-6-bmi-목록조회---page)


[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#3-management) ]

&nbsp;
***

### 3. 1. 1 BMI 조회

### Request

- **URL**: `/api/v1/bmi/{id}`
- **Method**: `GET`
- **Path Parameters**:
    - `id`: BMI ID

### Response

```json
{
    "id": 1,
    "weight": 70.5,
    "height": 175.2,
    "fatMass": 15.3,
    "fatRate": 18.6,
    "bodyMassIndex": 22.9,
    "bodyWaterFraction": 55.2,
    "basalMetabolicRate": 1500,
    "musculoskeletalMass": 60.8,
    "musculoskeletalRate": 30.5,
    "username": "Username",
    "createdDate": "2023-05-26T10:45:30.123",
    "updatedDate": "2023-05-26T10:45:30.123"
}
```

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#3-1-bmi-api) ]

&nbsp;
***

### 3. 1. 2 BMI 생성

### Request

- **URL**: `/api/v1/bmi`
- **Method**: `POST`
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`
- **Request Body**:
    ```json
    {
        "weight": 70.5,
        "height": 175.2,
        "fatMass": 15.3,
        "fatRate": 18.6,
        "bodyMassIndex": 22.9,
        "bodyWaterFraction": 55.2,
        "basalMetabolicRate": 1500,
        "musculoskeletalMass": 60.8,
        "musculoskeletalRate": 30.5
    }
    ```

### Response

- **Type**: `Long`
- **Description**: 생성된 BMI 데이터의 `ID`

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#3-1-bmi-api) ]

&nbsp;
***

### 3. 1. 3 BMI 수정

### Request

- **URL**: `/api/v1/bmi/{id}`
- **Method**: `PUT`
- **Path Parameters**:
    - `id`: BMI 데이터 ID
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`
- **Request Body**:
    ```json
    {
        "weight": 70.5,
        "height": 175.2,
        "fatMass": 15.3,
        "fatRate": 18.6,
        "bodyMassIndex": 22.9,
        "bodyWaterFraction": 55.2,
        "basalMetabolicRate": 1500,
        "musculoskeletalMass": 60.8,
        "musculoskeletalRate": 30.5
    }
    ```

### Response

- **Type**: `Long`
- **Description**: 생성된 BMI 데이터의 `ID`

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#3-1-bmi-api) ]

&nbsp;
***

### 3. 1. 4 BMI 삭제

### Request

- **URL**: `/api/v1/bmi/{id}`
- **Method**: `PUT`
- **Path Parameters**:
    - `id`: BMI 데이터 ID
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`

### Response

- **Type**: `None`
- **Description**: 아무것도 반환하지 않음

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#3-1-bmi-api) ]

&nbsp;
***

### 3. 1. 5 BMI 목록조회 - List

### Request

- **URL**: `/api/v1/bmi/list`
- **Method**: `GET`
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`

### Response

```json
[
    {
        "id": 1,
        "weight": 70.5,
        "height": 175.2,
        "fatMass": 15.3,
        "fatRate": 18.6,
        "bodyMassIndex": 22.9,
        "bodyWaterFraction": 55.2,
        "basalMetabolicRate": 1500,
        "musculoskeletalMass": 60.8,
        "musculoskeletalRate": 30.5,
        "username": "Username1",
        "createdDate": "2023-05-26T10:45:30.123",
        "updatedDate": "2023-05-26T10:45:30.123"
    },
    {
        "id": 2,
        "weight": 65.2,
        "height": 160.7,
        "fatMass": 12.6,
        "fatRate": 15.2,
        "bodyMassIndex": 24.3,
        "bodyWaterFraction": 58.9,
        "basalMetabolicRate": 1400,
        "musculoskeletalMass": 55.5,
        "musculoskeletalRate": 28.9,
        "username": "Username2",
        "createdDate": "2023-05-27T09:30:45.456",
        "updatedDate": "2023-05-27T09:30:45.456"
    }
]
```

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#3-1-bmi-api) ]

&nbsp;
***

### 3. 1. 6 BMI 목록조회 - Page

### Request

- **URL**: `/api/v1/bmi/page`
- **Method**: `GET`
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`
- **Query Parameters**:
    - `page`: 게시글 목록 페이지 번호, (ex: `page=0`)
    - `size`: 게시글 목록 페이지 크기, (ex: `size=20`)
    - `sort`: 게시글 목록 정렬 옵션, (ex: `sort=id,desc&sort=title,desc`)

### Response

```json
{
    "content": [
        {
            "id": 1,
            "weight": 70.5,
            "height": 175.2,
            "fatMass": 15.3,
            "fatRate": 18.6,
            "bodyMassIndex": 22.9,
            "bodyWaterFraction": 55.2,
            "basalMetabolicRate": 1500,
            "musculoskeletalMass": 60.8,
            "musculoskeletalRate": 30.5,
            "username": "Username1",
            "createdDate": "2023-05-26T10:45:30.123",
            "updatedDate": "2023-05-26T10:45:30.123"
        },
        {
            "id": 2,
            "weight": 65.2,
            "height": 160.7,
            "fatMass": 12.6,
            "fatRate": 15.2,
            "bodyMassIndex": 24.3,
            "bodyWaterFraction": 58.9,
            "basalMetabolicRate": 1400,
            "musculoskeletalMass": 55.5,
            "musculoskeletalRate": 28.9,
            "username": "Username2",
            "createdDate": "2023-05-27T09:30:45.456",
            "updatedDate": "2023-05-27T09:30:45.456"
        }
    ],
    "pageable": {
        "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
        },
        "offset": 0,
        "pageNumber": 0,
        "pageSize": 2,
        "paged": true,
        "unpaged": false
    },
    "totalElements": 2,
    "totalPages": 1,
    "last": true,
    "size": 2,
    "number": 0,
    "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
    },
    "first": true,
    "numberOfElements": 2,
    "empty": false
}
```



&nbsp;
***



## 3. 2 Diet API
- [3. 2 Diet API](#3-2-diet-api)
    - [3. 2. 1 Diet 조회](#3-2-1-diet-조회)
    - [3. 2. 2 Diet 생성](#3-2-2-diet-생성)
    - [3. 2. 3 Diet 수정](#3-2-3-diet-수정)
    - [3. 2. 4 Diet 삭제](#3-2-4-diet-삭제)
    - [3. 2. 5 Diet 추천목록 - List](#3-2-5-diet-추천목록---list)
    - [3. 2. 6 Diet 목록조회 - Page](#3-2-6-diet-목록조회---page)


[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#3-management) ]

&nbsp;
***

### 3. 2. 1 Diet 조회

### Request

- **URL**: `/api/v1/diet/{id}`
- **Method**: `GET`
- **Path Parameters**:
    - `id`: 식단 ID

### Response

```json
{
    "id": 1,
    "title": "Sample Diet",
    "totalCalories": 1500.0,
    "basalMetabolicRate": 1200.0,
    "recommendedCaloriesIntake": 1800.0,
    "createdDate": "2023-05-28T12:00:00.000",
    "updatedDate": "2023-05-28T12:00:00.000",
    "foods": [
        {
            "id": 1,
            "name": "Apple",
            "weight": 100.0,
            "calories": 52.0,
            "carbohydrates": 14.0,
            "proteins": 0.3,
            "fats": 0.2,
            "sugars": 10.3,
            "sodium": 0.0,
            "cholesterol": 0.0,
            "saturatedFattyAcids": 0.0,
            "transFattyAcids": 0.0,
            "buildYear": 2022
        },
        {
            "id": 2,
            "name": "Chicken Breast",
            "weight": 150.0,
            "calories": 165.0,
            "carbohydrates": 0.0,
            "proteins": 31.0,
            "fats": 3.6,
            "sugars": 0.0,
            "sodium": 68.0,
            "cholesterol": 88.0,
            "saturatedFattyAcids": 1.0,
            "transFattyAcids": 0.0,
            "buildYear": 2021
        }
    ]
}
```

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#3-2-diet-api) ]

&nbsp;
***

### Response

### 3. 2. 2 Diet 생성

### Request

- **URL**: `/api/v1/diet`
- **Method**: `POST`
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`
- **Request Body**:
    ```json
    {
        "title": "Sample Diet",
        "totalCalories": 1500.0,
        "basalMetabolicRate": 1200.0,
        "recommendedCaloriesIntake": 1800.0,
        "foodIds": [1, 2, 3]
    }
    ```

### Response

- **Type**: `Long`
- **Description**: 생성된 식단 데이터의 `ID`

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#3-2-diet-api) ]

&nbsp;
***

### 3. 2. 3 Diet 수정

### Request

- **URL**: `/api/v1/diet/{id}`
- **Method**: `PUT`
- **Path Parameters**:
    - `id`: 식단 ID
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`
- **Request Body**:
    ```json
    {
        "title": "Sample Diet",
        "totalCalories": 1500.0,
        "basalMetabolicRate": 1200.0,
        "recommendedCaloriesIntake": 1800.0,
        "foodIds": [1, 2, 3]
    }
    ```

### Response

- **Type**: `Long`
- **Description**: 수정된 식단 데이터의 `ID`

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#3-2-diet-api) ]

&nbsp;
***

### 3. 2. 4 Diet 삭제

### Request

- **URL**: `/api/v1/diet/{id}`
- **Method**: `DELETE`
- **Path Parameters**:
    - `id`: 식단 ID
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`

### Response

- **Type**: `None`
- **Description**: 아무것도 반환하지 않음

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#3-2-diet-api) ]

&nbsp;
***

### 3. 2. 5 Diet 추천목록 - List

### Request

- **URL**: `/api/v1/diet/recommend`
- **Method**: `GET`
- **Query Parameters**:
    - `bmiId (Required)`: 추천식단의 기준이 될 BMI ID (ex: `bmiId=1`)
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`

### Response

```json
[
    {
        "id": 1,
        "name": "Sample Food 1",
        "weight": 100.5,
        "calories": 250.0,
        "carbohydrates": 35.2,
        "proteins": 15.7,
        "fats": 8.9,
        "sugars": 10.3,
        "sodium": 200.0,
        "cholesterol": 25.5,
        "saturatedFattyAcids": 4.2,
        "transFattyAcids": 0.8,
        "buildYear": 2022
    },
    {
        "id": 2,
        "name": "Sample Food 2",
        "weight": 150.0,
        "calories": 300.0,
        "carbohydrates": 40.0,
        "proteins": 18.5,
        "fats": 9.8,
        "sugars": 12.1,
        "sodium": 180.0,
        "cholesterol": 30.2,
        "saturatedFattyAcids": 3.5,
        "transFattyAcids": 0.6,
        "buildYear": 2021
    },
    ...
    ...
    ...
    {
        "id": 9,
        "name": "Sample Food 9",
        "weight": 120.3,
        "calories": 275.8,
        "carbohydrates": 38.7,
        "proteins": 17.2,
        "fats": 9.5,
        "sugars": 11.9,
        "sodium": 185.5,
        "cholesterol": 27.8,
        "saturatedFattyAcids": 3.9,
        "transFattyAcids": 0.7,
        "buildYear": 2023
    }
]
```

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#3-2-diet-api) ]

&nbsp;
***

### 3. 2. 6 Diet 목록조회 - Page

### Request

- **URL**: `/api/v1/diet/list`
- **Method**: `GET`
- **Headers**:
    - **Content-Type**: `application/json`
    - **Authorization**: `Bearer {Your access token}`
    - **X-Refresh-Token**: `{Your refresh token}`
- **Query Parameters**:
    - `page`: 게시글 목록 페이지 번호, (ex: `page=0`)
    - `size`: 게시글 목록 페이지 크기, (ex: `size=20`)
    - `sort`: 게시글 목록 정렬 옵션, (ex: `sort=id,desc&sort=title,desc`)

### Response

```json
{
    "content": [
        {
            "id": 1,
            "title": "Sample Diet 1",
            "totalCalories": 1500.0,
            "basalMetabolicRate": 1200.0,
            "recommendedCaloriesIntake": 1800.0,
            "createdDate": "2023-05-28T12:00:00.000",
            "updatedDate": "2023-05-28T12:00:00.000",
            "foods": [
                {
                    "id": 1,
                    "name": "Apple",
                    "weight": 100.0,
                    "calories": 52.0,
                    "carbohydrates": 14.0,
                    "proteins": 0.3,
                    "fats": 0.2,
                    "sugars": 10.3,
                    "sodium": 0.0,
                    "cholesterol": 0.0,
                    "saturatedFattyAcids": 0.0,
                    "transFattyAcids": 0.0,
                    "buildYear": 2022
                },
                {
                    "id": 2,
                    "name": "Chicken Breast",
                    "weight": 150.0,
                    "calories": 165.0,
                    "carbohydrates": 0.0,
                    "proteins": 31.0,
                    "fats": 3.6,
                    "sugars": 0.0,
                    "sodium": 68.0,
                    "cholesterol": 88.0,
                    "saturatedFattyAcids": 1.0,
                    "transFattyAcids": 0.0,
                    "buildYear": 2021
                }
            ]
        },
        {
            "id": 2,
            "title": "Sample Diet 2",
            "totalCalories": 1700.0,
            "basalMetabolicRate": 1250.0,
            "recommendedCaloriesIntake": 1900.0,
            "createdDate": "2023-05-28T12:00:00.000",
            "updatedDate": "2023-05-28T12:00:00.000",
            "foods": [
                {
                    "id": 3,
                    "name": "Banana",
                    "weight": 120.0,
                    "calories": 96.0,
                    "carbohydrates": 23.0,
                    "proteins": 1.2,
                    "fats": 0.2,
                    "sugars": 17.2,
                    "sodium": 1.0,
                    "cholesterol": 0.0,
                    "saturatedFattyAcids": 0.1,
                    "transFattyAcids": 0.0,
                    "buildYear": 2022
                },
                {
                    "id": 4,
                    "name": "Salmon",
                    "weight": 120.0,
                    "calories": 280.0,
                    "carbohydrates": 0.0,
                    "proteins": 23.0,
                    "fats": 20.0,
                    "sugars": 0.0,
                    "sodium": 50.0,
                    "cholesterol": 70.0,
                    "saturatedFattyAcids": 4.0,
                    "transFattyAcids": 0.0,
                    "buildYear": 2021
                }
            ]
        },
        ...
    ],
    "pageable": {
        "pageNumber": 0,
        "pageSize": 10,
        "offset": 0,
        "paged": true,
        "unpaged": false
    },
    "last": true,
    "totalPages": 1,
    "totalElements": 2,
    "size": 10,
    "number": 0,
    "numberOfElements": 2,
    "first": true,
    "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
    },
    "empty": false
}
```

[ [처음으로](#3-2-rest-api) ]
[ [뒤로가기](#3-2-diet-api) ]
