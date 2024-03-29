# HealthCare Service  
```
헬스장 운영측과 고객 모두를 위한 종합 Healthcare 웹 서비스
```
- 헬스장 운영측 고객관리 기능 제공  
- 헬스장 사용자 건강관리(인바디, 운동 루틴 추천, 식단 추천 등) 서비스 제공  
- WebSocket 기반 고객지원 LiveChat 서비스 제공  
- 인바디 체성분(BMI) 기반 운동 루틴 추천 및 식단 관리 서비스 제공  
- 공공데이터포털 '농촌진흥청_추천식단정보' 데이터 활용
- 공공데이터포털 '한국건강증진개발원_보건소 모바일 헬스케어_체성분(BMI)' 데이터 활용  





<br>




***  
# 1. Envrionment  
  
## 1. 1 Environments  
- Windows 10  
- Ubuntu 20.04 LTS  
- Java 11, SpringBoot  
- React.js, JavaScript, Css  
- MySQL, JPA  





<br>





***  
# 2. Architecture  
- 본 프로젝트에서는 `MVC Model 2`를 채택하여 사용

<p align="center"><img width="100%" src="https://user-images.githubusercontent.com/59362257/228431610-6a76ff6b-ae60-4757-936d-9e361db076bb.png"></p>
  
## 2. 1 MVC Design Pattern  
**MDN(Mozila Developer Network) Web Docs의 MVC 정의**  
> **MVC(Model-View-Controller) 는 사용자 인터페이스, 데이터 및 논리 제어를**  
> **구현하는데 널리 사용되는 소프트웨어 디자인 패턴입니다.**  
>  
> **소프트웨어의 비즈니스 로직과 화면을 구분하는데 중점을 두고 있습니다.**  
> **이러한 "관심사 분리" 는 더나은 업무의 분리와 향상된 관리를 제공합니다.**  

- MVC(Model-View-Controller): 애플리케이션을 3가지 역할로 구분한 개발 방법론
  - `Model`: 애플리케이션의 데이터 가공을 책임지는 컴포넌트
  - `View`: 사용자 인터페이스(UI, User Interface) 요소
  - `Controller`: `Model`과 `View` 사이를 이어주는 다리(Bridge) 역할 수행
- 비즈니스 로직과 UI 로직을 분리하여, 독립적으로 유지보수 가능
- `Model`과 `View`가 다른 컴포넌트들에 종속되지 않아, 애플리케이션의 확장성과 유연성에 유리함
- 중복 코딩의 문제점 제거 

### 2. 1. 1 MVC Model 1
<p align="center"><img width="100%" src="https://user-images.githubusercontent.com/59362257/227861870-406ca57d-c305-49b9-a6fb-136155b85b59.png"></p>

<div style="border: 1px solid white; padding-top: 1.5vh; margin-bottom: 1vh">

- `Controller` 영역에 `View` 영역을 같이 구현하는 방식
- `Controller` 영역과 `View` 영역 모두 `JSP`가 담당하는 형태로, 구현이 쉽다는 장점 존재
- `JSP`에서 `MVC`가 모두 이루어지므로 재사용성과 가독성 하락
  - 유지보수 불리함

</div>

### 2. 1. 2 MVC Model 2
<p aling="center"><img width="100%" src="https://user-images.githubusercontent.com/59362257/227862180-9ba06407-e59d-4e93-bdcf-fc14a7afed8b.png"></p>

<div style="border: 1px solid white; padding-top: 1.5vh; margin-bottom: 1vh">

- 본 프로젝트에서 채택중인 `MVC Pattern`
- `Spring Framework` 에서 권장하는 패턴 / 널리 표준으로 사용되는 `Design Pattern` 
- `MVC Model 1` 과 달리 `Controller` 와 `View` 가 분리되어 `MVC Model 1` 의 단점 보완
- `Model`, `View`, `Controller` 가 분리되어 있으므로, 문제가 있는 부분만 별도로 수정 가능
  - 유지보수 용이함

</div>

## 2. 2 SpringBoot Architecture  
`MVC Model 2`에 따른 `SpringBoot` `package` 구조

- [2. 2. 1 Config](#2-2-1-config)
- [2. 2. 2 Domain](#2-2-2-domain)
- [2. 2. 3 DTO](#2-2-3-dto)
- [2. 2. 4 Repository](#2-2-4-repository)
- [2. 2. 5 Service](#2-2-5-service)
- [2. 2. 6 Controller](#2-2-6-controller)

```
├── config
│   ├── CustomUserDetails.java
│   ├── CustomUserDetailsService.java
│   ├── JwtTokenFilter.java
│   ├── JwtTokenProvider.java
│   ├── WebSecurityConfig.java
│   └── WebSocketConfig.java
├── domain
│   ├── introduce
│   │   ├── Staff.java
│   │   ├── Facility.java
│   │   └── Image.java
│   ├── support
│   │   ├── board
│   │   │   ├── Post.java
│   │   │   ├── Comment.java
│   │   │   ├── Attachment.java
│   │   │   └── BoardType.java
│   │   └── livechat
│   │       ├── ChatRoom.java
│   │       ├── ChatMessage.java
│   │       └── UserChatRoom.java
│   ├── management
│   │   ├── BMI.java
│   │   ├── Diet.java
│   │   ├── Food.java
│   │   └── DietFood.java
│   ├── user
│   │   ├── Auth.java
│   │   ├── User.java
│   │   └── Role.java
│   └── BaseTime.java
├── dto
│   ├── introduce
│   │   ├── staff
│   │   │   ├── StaffResponseDTO.java
│   │   │   ├── StaffSaveRequestDTO.java
│   │   │   └── StaffUpdateRequestDTO.java
│   │   ├── facility
│   │   │   ├── FacilityResponseDTO.java
│   │   │   ├── FacilitySaveRequestDTO.java
│   │   │   └── FacilityUpdateRequestDTO.java
│   │   └── image
│   │       ├── ImageRequestDTO.java
│   │       └── ImageResponseDTO.java
│   ├── support
│   │   ├── post
│   │   │   ├── PostResponseDTO.java
│   │   │   ├── PostListResponseDTO.java
│   │   │   ├── PostSaveRequestDTO.java
│   │   │   └── PostUpdateRequestDTO.java
│   │   ├── comment
│   │   │   ├── CommentResponseDTO.java
│   │   │   ├── CommentSaveRequestDTO.java
│   │   │   └── CommentUpdateRequestDTO.java
│   │   ├── attachment
│   │   │   ├── AttachmentRequestDTO.java
│   │   │   └── AttachmentResponseDTO.java
│   │   └── livechat
│   │       ├── ChatRoomRequestDTO.java
│   │       ├── ChatRoomResponseDTO.java
│   │       ├── ChatMessageRequestDTO.java
│   │       ├── ChatMessageResponseDTO.java
│   │       ├── UserChatRoomRequestDTO.java
│   │       └── UserChatRoomResponseDTO.java
│   ├── management
│   │   ├── bmi
│   │   │   ├── BMIResponseDTO.java
│   │   │   ├── BMISaveRequestDTO.java
│   │   │   └── BMIUpdateRequestDTO.java
│   │   ├── diet
│   │   │   ├── DietRequestDTO.java
│   │   │   └── DietResponseDTO.java
│   │   └── food
│   │       ├── FoodRequestDTO.java
│   │       └── FoodResponseDTO.java
│   └── user
│       ├── AuthRequestDTO.java
│       ├── AuthResponseDTO.java
│       ├── UserRequestDTO.java
│       └── UserResponsetDTO.java
├── repository
│   ├── introduce
│   │   ├── StaffRepository.java
│   │   ├── FacilityRepository.java
│   │   └── ImageRepository.java
│   ├── support
│   │   ├── PostRepository.java
│   │   ├── CommentRepository.java
│   │   ├── AttachmentRepository.java
│   │   ├── ChatRoomRepository.java
│   │   ├── ChatMessageRepository.java
│   │   └── UserChatRoomRepository.java
│   ├── management
│   │   ├── BMIRepository.java
│   │   ├── DietRepository.java
│   │   ├── FoodRepository.java
│   │   └── DietFoodRepository.java
│   └── user
│       ├── AuthRepository.java
│       └── UserRepository.java
├── service
│   ├── introduce
│   │   ├── StaffService.java
│   │   ├── FacilityService.java
│   │   └── ImageService.java
│   ├── support
│   │   ├── PostService.java
│   │   ├── CommentService.java
│   │   ├── AttachmentService.java
│   │   ├── ChatRoomService.java
│   │   └── ChatMessageService.java
│   ├── management
│   │   ├── BMIService.java
│   │   ├── DietService.java
│   │   └── FoodService.java
│   └── user
│       ├── AuthService.java
│       └── UserService.java
├── controller
│   ├── introduce
│   │   ├── StaffController.java
│   │   ├── FacilityController.java
│   │   └── ImageController.java
│   ├── support
│   │   ├── PostController.java
│   │   ├── PostRestController.java
│   │   ├── CommentRestController.java
│   │   ├── AttachmentRestController.java
│   │   ├── ChatRoomRestController.java
│   │   └── ChatMessageRestController.java
│   ├── management
│   │   ├── BMIController.java
│   │   ├── BMIRestController.java
│   │   ├── DietController.java
│   │   └── DietRestController.java
│   ├── user
│   │   ├── AuthRestController.java
│   │   └── UserRestController.java
│   └── HomeController.java
└── HealthCareApplication.java
```

***

### **2. 2. 1 Config**
```
├── config
│   ├── CustomUserDetails.java
│   ├── CustomUserDetailsService.java
│   ├── JwtTokenFilter.java
│   ├── JwtTokenProvider.java
│   ├── WebSecurityConfig.java
│   └── WebSocketConfig.java
```

[ [뒤로가기](#2-2-springboot-architecture) ]

***

### **2. 2. 2 Domain**
```
├── domain
│   ├── introduce
│   │   ├── Staff.java
│   │   ├── Facility.java
│   │   └── Image.java
│   ├── support
│   │   ├── board
│   │   │   ├── Post.java
│   │   │   ├── Comment.java
│   │   │   ├── Attachment.java
│   │   │   └── BoardType.java
│   │   └── livechat
│   │       ├── ChatRoom.java
│   │       ├── ChatMessage.java
│   │       └── UserChatRoom.java
│   ├── management
│   │   ├── BMI.java
│   │   ├── Diet.java
│   │   ├── Food.java
│   │   └── DietFood.java
│   ├── user
│   │   ├── Auth.java
│   │   ├── User.java
│   │   └── Role.java
│   └── BaseTime.java
```

[ [뒤로가기](#2-2-springboot-architecture) ]

***

### **2. 2. 3 DTO**
```
├── dto
│   ├── introduce
│   │   ├── staff
│   │   │   ├── StaffResponseDTO.java
│   │   │   ├── StaffSaveRequestDTO.java
│   │   │   └── StaffUpdateRequestDTO.java
│   │   ├── facility
│   │   │   ├── FacilityResponseDTO.java
│   │   │   ├── FacilitySaveRequestDTO.java
│   │   │   └── FacilityUpdateRequestDTO.java
│   │   └── image
│   │       ├── ImageRequestDTO.java
│   │       └── ImageResponseDTO.java
│   ├── support
│   │   ├── post
│   │   │   ├── PostResponseDTO.java
│   │   │   ├── PostListResponseDTO.java
│   │   │   ├── PostSaveRequestDTO.java
│   │   │   └── PostUpdateRequestDTO.java
│   │   ├── comment
│   │   │   ├── CommentResponseDTO.java
│   │   │   ├── CommentSaveRequestDTO.java
│   │   │   └── CommentUpdateRequestDTO.java
│   │   ├── attachment
│   │   │   ├── AttachmentRequestDTO.java
│   │   │   └── AttachmentResponseDTO.java
│   │   └── livechat
│   │       ├── ChatRoomRequestDTO.java
│   │       ├── ChatRoomResponseDTO.java
│   │       ├── ChatMessageRequestDTO.java
│   │       ├── ChatMessageResponseDTO.java
│   │       ├── UserChatRoomRequestDTO.java
│   │       └── UserChatRoomResponseDTO.java
│   ├── management
│   │   ├── bmi
│   │   │   ├── BMIResponseDTO.java
│   │   │   ├── BMISaveRequestDTO.java
│   │   │   └── BMIUpdateRequestDTO.java
│   │   ├── diet
│   │   │   ├── DietRequestDTO.java
│   │   │   └── DietResponseDTO.java
│   │   └── food
│   │       ├── FoodRequestDTO.java
│   │       └── FoodResponseDTO.java
│   └── user
│       ├── AuthRequestDTO.java
│       ├── AuthResponseDTO.java
│       ├── UserRequestDTO.java
│       └── UserResponsetDTO.java
```

[ [뒤로가기](#2-2-springboot-architecture) ]

***

### **2. 2. 4 Repository**
```
├── repository
│   ├── introduce
│   │   ├── StaffRepository.java
│   │   ├── FacilityRepository.java
│   │   └── ImageRepository.java
│   ├── support
│   │   ├── PostRepository.java
│   │   ├── CommentRepository.java
│   │   ├── AttachmentRepository.java
│   │   ├── ChatRoomRepository.java
│   │   ├── ChatMessageRepository.java
│   │   └── UserChatRoomRepository.java
│   ├── management
│   │   ├── BMIRepository.java
│   │   ├── DietRepository.java
│   │   ├── FoodRepository.java
│   │   └── DietFoodRepository.java
│   └── user
│       ├── AuthRepository.java
│       └── UserRepository.java
```

[ [뒤로가기](#2-2-springboot-architecture) ]

***

### **2. 2. 5 Service**
```
├── service
│   ├── introduce
│   │   ├── StaffService.java
│   │   ├── FacilityService.java
│   │   └── ImageService.java
│   ├── support
│   │   ├── PostService.java
│   │   ├── CommentService.java
│   │   ├── AttachmentService.java
│   │   ├── ChatRoomService.java
│   │   └── ChatMessageService.java
│   ├── management
│   │   ├── BMIService.java
│   │   ├── DietService.java
│   │   └── FoodService.java
│   └── user
│       ├── AuthService.java
│       └── UserService.java
```

[ [뒤로가기](#2-2-springboot-architecture) ]

***

### **2. 2. 6 Controller**
```
├── controller
│   ├── introduce
│   │   ├── StaffController.java
│   │   ├── FacilityController.java
│   │   └── ImageController.java
│   ├── support
│   │   ├── PostController.java
│   │   ├── PostRestController.java
│   │   ├── CommentRestController.java
│   │   ├── AttachmentRestController.java
│   │   ├── ChatRoomRestController.java
│   │   └── ChatMessageRestController.java
│   ├── management
│   │   ├── BMIController.java
│   │   ├── BMIRestController.java
│   │   ├── DietController.java
│   │   └── DietRestController.java
│   ├── user
│   │   ├── AuthRestController.java
│   │   └── UserRestController.java
│   └── HomeController.java
```

[ [뒤로가기](#2-2-springboot-architecture) ]

***




## 2. 3 REST API  

REST API에 대한 정보는 아래 링크를 참조

[ [REST API Document](./REST%20API.md) ]





<br>





***  
# 3. Database  
- `MySQL`
- `JPA Repository` 활용  
  
## 3. 1 Table  
- `Post`: 게시글 데이터
- `Comment`: 댓글 데이터
- `Attachment`: 첨부파일 데이터
- `Facility`: 헬스장 소개 데이터
- `ChatRoom`: 고객지원 LiveChat 채팅방 데이터
- `ChatMessage`: 고객지원 LiveChat 채팅방별 채팅내역 데이터

## 3. 2 ERD  

<p align="center">
  <img width="75%" src="https://user-images.githubusercontent.com/59362257/227994226-e63e69de-5711-4a31-aadd-a61b36866794.png">
</p>





<br>





***  
# 4. DNS(Domain Name System)  
- 서버부재로 현재 미완  
  
## 4. 1 DNS Architecture  
<p align="center">
  <img width="50%" src="https://user-images.githubusercontent.com/59362257/227839526-ed892d25-aced-4980-88e5-548bd89600a7.png"> <img width="48%" src="https://user-images.githubusercontent.com/59362257/227864462-7719d618-1f75-438d-b8a5-65a8a1f0c3af.png">
</p>  

- 클라이언트는 DNS로부터 전달받은 IP주소로 `REQUEST` 요청을 보내고 `RESPONSE` 응답을 받는다.  
- DNS(Domain Name System)는 사람이 읽을 수 있는 도메인을, 기계가 읽을 수 있는 IP주소로 변환한다.  
  - 사람이 읽을 수 있는 도메인: `https://www.example.com`, `https://example.com`, `example.com` 등
  - 기계가 읽을 수 있는 IP주소: `그림1예시(192.0.2.11)`, `AMAZON(192.0.2.44)` 등

  
[Reference]: [Amazon AWS: What is DNS (https://aws.amazon.com/ko/route53/what-is-dns/)](https://aws.amazon.com/ko/route53/what-is-dns/)  





<br>





***  
# 5. 결론  
  
## 5. 1 결과  
- 개발 진행중

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


## 5. 2 개발후기  
- 개발 진행중1
- 개발 진행중2

## 5. 3 향후계획(개선사항)  
- `React Native`, `Flutter` 등을 활용한 크로스플랫폼 모바일 서비스 업데이트
