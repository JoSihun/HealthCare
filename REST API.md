# REST API

현재까지 하기의 기능들에 대해서 `RESTful` 하게 `API`를 구현

- [1. Introduce](#1-introduce)
    -
    -
    -
- [2. Support](#2-support)
    - [2. 1 Post API](#2-1-post-api)
        - [2. 1. 1 게시글 상세조회](#2-1-1-게시글-상세조회)
        - [2. 1. 2 게시판 목록조회](#2-1-2-게시판-목록조회)
        - [2. 1. 3 게시판 검색조회](#2-1-3-게시판-검색조회)
        - [2. 1. 4 게시글 데이터 삽입](#2-1-4-게시글-데이터-삽입---v1)
        - [2. 1. 5 게시글 데이터 수정](#2-1-5-게시글-데이터-수정---v1)
        - [2. 1. 6 게시글 데이터 삭제](#2-1-6-게시글-데이터-삭제---v1)
    - [2. 2 Comment API](#2-2-comment-api)
    - [2. 3 Attachment API](#2-3-attachment-api)
    - [2. 4 ChatRoom API](#2-4-attachment-api)
    - [2. 5 ChatMessage API](#2-5-attachment-api)
- [3. User Management](#3-user-management)
    -
    -
    -





<br>





# 1. Introduce





<br>





# 2. Support
- [2. Support](#2-support)
    - [2. 1 Post API](#2-1-post-api)
        - [2. 1. 1 게시글 상세조회](#2-1-1-게시글-상세조회)
        - [2. 1. 2 게시판 목록조회](#2-1-2-게시판-목록조회)
        - [2. 1. 3 게시판 검색조회](#2-1-3-게시판-검색조회)
        - [2. 1. 4 게시글 데이터 삽입](#2-1-4-게시글-데이터-삽입---v1)
        - [2. 1. 5 게시글 데이터 수정](#2-1-5-게시글-데이터-수정---v1)
        - [2. 1. 6 게시글 데이터 삭제](#2-1-6-게시글-데이터-삭제---v1)
    - [2. 2 Comment API](#2-2-comment-api)
    - [2. 3 Attachment API](#2-3-attachment-api)
    - [2. 4 ChatRoom API](#2-4-attachment-api)
    - [2. 5 ChatMessage API](#2-5-attachment-api)

[ [처음으로](#rest-api) ]
[ [뒤로가기](#rest-api) ]

## 2. 1 Post API
- [2. 1 Post API](#2-1-post-api)
    - [2. 1. 1 게시글 상세조회](#2-1-1-게시글-상세조회)
    - [2. 1. 2 게시판 목록조회](#2-1-2-게시판-목록조회)
    - [2. 1. 3 게시판 검색조회](#2-1-3-게시판-검색조회)
    - [2. 1. 4 게시글 데이터 삽입](#2-1-4-게시글-데이터-삽입---v1)
    - [2. 1. 5 게시글 데이터 수정](#2-1-5-게시글-데이터-수정---v1)
    - [2. 1. 6 게시글 데이터 삭제](#2-1-6-게시글-데이터-삭제---v1)

[ [처음으로](#rest-api) ]
[ [뒤로가기](#2-support) ]



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
[ [처음으로](#rest-api) ]
[ [뒤로가기](#2-1-post-api) ]



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
[ [처음으로](#rest-api) ]
[ [뒤로가기](#2-1-post-api) ]



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
[ [처음으로](#rest-api) ]
[ [뒤로가기](#2-1-post-api) ]



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

[ [처음으로](#rest-api) ]
[ [뒤로가기](#2-1-post-api) ]



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
        data: {
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

[ [처음으로](#rest-api) ]
[ [뒤로가기](#2-1-post-api) ]



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

[ [처음으로](#rest-api) ]
[ [뒤로가기](#2-1-post-api) ]



***


























## 2. 2 Comment API
## 2. 3 Attachment API
## 2. 4 ChatRoom API
## 2. 5 ChatMessage API





<br>





## 3. User Management