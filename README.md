# HealthCare Service  
```
헬스장 운영측과 고객 모두를 위한 종합 Healthcare 웹 서비스
```
- 헬스장 운영측 고객관리 기능 제공  
- 헬스장 사용자 건강관리(인바디, 운동 루틴 추천, 식단 추천 등) 서비스 제공  
- WebSocket 기반 고객지원 LiveChat 서비스 제공  
- 인바디 체성분(BMI) 기반 운동 루틴 추천 및 식단 관리 서비스 제공  
- 공공데이터포털 한국건강증진개발원_보건소 모바일 헬스케어_체성분(BMI) 데이터 활용  
  
***  
# 1. Envrionment  
  
## 1. 1 Environments  
- Windows 10  
- Ubuntu 20.04 LTS  
- Java 11, SpringBoot  
- React.js, JavaScript, Css  
- MySQL, JPA  
  
***  
# 2. Architecture  
- 본 프로젝트에서는 `MVC Model 2`를 채택하여 사용

<center><img width="100%" src="https://user-images.githubusercontent.com/59362257/227884259-52bd6389-6534-49fd-bda6-a52b317ddde5.png"></center>
  
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
<center><img width="100%" src="https://user-images.githubusercontent.com/59362257/227861870-406ca57d-c305-49b9-a6fb-136155b85b59.png"></center>

<div style="border: 1px solid white; padding-top: 1.5vh; margin-bottom: 1vh">

- `Controller` 영역에 `View` 영역을 같이 구현하는 방식
- `Controller` 영역과 `View` 영역 모두 `JSP`가 담당하는 형태로, 구현이 쉽다는 장점 존재
- `JSP`에서 `MVC`가 모두 이루어지므로 재사용성과 가독성 하락
  - 유지보수 불리함

</div>

### 2. 1. 2 MVC Model 2
<center><img width="100%" src="https://user-images.githubusercontent.com/59362257/227862180-9ba06407-e59d-4e93-bdcf-fc14a7afed8b.png"></center>

<div style="border: 1px solid white; padding-top: 1.5vh; margin-bottom: 1vh">

- `Spring Framework` 에서 권장하는 패턴 / 널리 표준으로 사용되는 `Design Pattern` 
- `MVC Model 1` 과 달리 `Controller` 와 `View` 가 분리되어 `MVC Model 1` 의 단점 보완
- `Model`, `View`, `Controller` 가 분리되어 있으므로, 문제가 있는 부분만 별도로 수정 가능
  - 유지보수 용이함

</div>












## 2. 2 SpringBoot Architecture  
```

### 2. 2. 1 Config
├── config
│   └── WebSocketConfig.java
```

### 2. 2. 2 Domain
```
├── domain
│   ├── Attachment.java
│   ├── BaseTime.java
│   ├── ChatMessage.java
│   ├── ChatRoom.java
│   ├── Comment.java
│   ├── Facility.java
│   └── Post.java
```

### 2. 2. 3 DTO
```
├── dto
│   ├── attachment
│   │   ├── AttachmentResponseDto.java
│   │   ├── AttachmentSaveRequestDto.java
│   │   └── AttachmentUpdateRequestDto.java
│   ├── comment
│   │   ├── CommentResponseDto.java
│   │   ├── CommentSaveRequestDto.java
│   │   └── CommentUpdateRequestDto.java
│   ├── facility
│   │   ├── FacilityResponseDto.java
│   │   ├── FacilitySaveRequestDto.java
│   │   └── FacilityUpdateRequestDto.java
│   ├── livechat
│   │   ├── ChatMessageRequestDto.java
│   │   ├── ChatMessageResponseDto.java
│   │   ├── ChatRoomRequestDto.java
│   │   └── ChatRoomResponseDto.java
│   └── post
│       ├── PostResponseDto.java
│       ├── PostSaveRequestDto.java
│       └── PostUpdateRequestDto.java
```

### 2. 2. 4 Repository
```
├── repository
│   ├── AttachmentRepository.java
│   ├── ChatMessageRepository.java
│   ├── ChatRoomRepository.java
│   ├── CommentRepository.java
│   ├── FacilityRepository.java
│   └── PostRepository.java
```

### 2. 2. 5 Service
```
├── service
│   ├── AttachmentService.java
│   ├── ChatMessageService.java
│   ├── ChatRoomService.java
│   ├── CommentService.java
│   ├── FacilityService.java
│   └── PostService.java
```

### 2. 2. 6 Controller
```
├── controller
│   ├── introduce
│   │   └── FacilityController.java
│   ├── support
│   │   ├── AttachmentRestController.java
│   │   ├── ChatMessageRestController.java
│   │   ├── ChatRoomRestController.java
│   │   ├── CommentRestController.java
│   │   ├── FAQBoardController.java
│   │   ├── FreeBoardController.java
│   │   ├── PostRestController.java
│   │   └── QNABoardController.java
│   └── HomeController.java
└── HealthCareApplication.java
```
## 2. 3 RESTful API  
```
├── controller
│   ├── support
│   │   ├── AttachmentRestController.java
│   │   ├── ChatMessageRestController.java
│   │   ├── ChatRoomRestController.java
│   │   ├── CommentRestController.java
│   │   └── PostRestController.java
```
현재까지 상기의 기능들에 대해서 RESTful 하게 API를 구현하였다.  

</br>

**`PostRestController.java`**
```java
// PostRestController.java
@RequiredArgsConstructor
@RestController
public class PostRestController {
    private final PostService postService;
    private final AttachmentService attachmentService;

    @PostMapping("/api/post")
    public Long postSave(@RequestBody PostSaveRequestDto requestDto,
                         @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
        Long postId = this.postService.save(requestDto);
        return this.attachmentService.save(postId, files);
    }

    @PutMapping("/api/post/{id}")
    public Long postUpdate(@PathVariable(value = "id") Long postId,
                           @RequestBody PostUpdateRequestDto requestDto,
                           @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
        this.attachmentService.update(postId, files);
        return this.postService.update(postId, requestDto);
    }

    @DeleteMapping("/api/post/{id}")
    public Long postDelete(@PathVariable Long id) {
        this.attachmentService.deleteAllFilesByPostId(id);
        return this.postService.delete(id);
    }
}
```
- `RESTful API` 중 하나인 `PostRestController.java`
  
***  
# 3. Database  
- MySQL, JPA 활용  
  
## 3. 1 Table  
## 3. 2 ERD  
  
***  
# 4. DNS(Domain Name System)  
- 서버부재로 현재 미완  
  
## 4. 1 DNS Architecture  
<center class="half">  
    <img width="50%" src="https://user-images.githubusercontent.com/59362257/227839526-ed892d25-aced-4980-88e5-548bd89600a7.png">
    <img width="48%" src="https://user-images.githubusercontent.com/59362257/227864462-7719d618-1f75-438d-b8a5-65a8a1f0c3af.png">
</center>  

- 클라이언트는 DNS로부터 전달받은 IP주소로 `REQUEST` 요청을 보내고 `RESPONSE` 응답을 받는다.  
- DNS(Domain Name System)는 사람이 읽을 수 있는 도메인을, 기계가 읽을 수 있는 IP주소로 변환한다.  
  - 사람이 읽을 수 있는 도메인: `https://www.example.com`, `https://example.com`, `example.com` 등
  - 기계가 읽을 수 있는 IP주소: `그림1예시(192.0.2.11)`, `AMAZON(192.0.2.44)` 등

  
[Reference]: [Amazon AWS: What is DNS (https://aws.amazon.com/ko/route53/what-is-dns/)](https://aws.amazon.com/ko/route53/what-is-dns/)  
  
***  
# 5. 결론  
  
## 5. 1 결과  
- 개발 진행중
## 5. 2 개발후기  
- 개발 진행중
## 5. 3 향후계획(개선사항)  
- `React Native`, `Flutter` 등을 활용한 크로스플랫폼 모바일 서비스 업데이트