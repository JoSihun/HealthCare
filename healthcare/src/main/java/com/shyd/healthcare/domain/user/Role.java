package com.shyd.healthcare.domain.user;

public enum Role {
    ROLE_USER,
    ROLE_ADMIN;
}

//@Getter
//public enum Role {
//    USER("user"),
//    ADMIN("admin");
//
//    private String role;
//
//    Role(String role) {
//        this.role = role;
//    }
//
//    @JsonCreator
//    public static Role valueOfRole(String role) {
//        return Arrays.stream(values())
//                .filter(value -> value.role.equals(role))
//                .findAny()
//                .orElse(null);
//    }
//}
