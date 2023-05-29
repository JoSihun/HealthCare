# 2. 2 SpringBoot Architecture  

- [2. 2. 1 Config](#2-2-1-config)
- [2. 2. 2 Domain](#2-2-2-domain)
- [2. 2. 3 DTO](#2-2-3-dto)
- [2. 2. 4 Repository](#2-2-4-repository)
- [2. 2. 5 Service](#2-2-5-service)
- [2. 2. 6 Controller](#2-2-6-controller)

&nbsp;
***

`MVC Model 2`에 따른 `SpringBoot` `package` 구조
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

&nbsp;
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

&nbsp;
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

&nbsp;
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

&nbsp;
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

&nbsp;
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

&nbsp;
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
