package com.pathfinder.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    // User 관련 예외
    USER_NOT_FOUND(404, "User not found"),
    EMAIL_EXISTS(409, "Email already exists"),
    NAME_EXISTS(409, "Name already exists"),
    USER_CREDENTIALS_INVALID(401, "Invalid user credentials"),

    // Diary 관련 예외
    DIARY_NOT_FOUND(404, "Diary not found"),
    QUESTION_EDIT_UNAUTHORIZED(403, "Unauthorized Quesiton edit"),

    ANSWER_NOT_FOUND(404, "Answer not found"),
    ANSWER_EDIT_UNAUTHORIZED(403, "Unauthorized Answer edit"),

    // Comment 관련 예외
    COMMENT_NOT_FOUND(404, "Comment not found"),
    COMMENT_EDIT_UNAUTHORIZED(403, "Unauthorized qna edit"),

    // Tag 관련 예외
    TAG_NOT_FOUND(404, "Tag not found"),

    // Vote 관련 예외
    VOTE_NOT_FOUND(404, "Vote not found"),
    VOTE_OPERATION_INVALID(400, "Invalid vote operation"),
    VOTE_DUPLICATED(409, "Duplicate vote attempt"),
    VOTE_TYPE_INVALID(400, "Invalid vote type"),

    // General 예외
    INTERNAL_SERVER_ERROR(500, "Internal server error"),
    INVALID_REQUEST(400, "Invalid request");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}