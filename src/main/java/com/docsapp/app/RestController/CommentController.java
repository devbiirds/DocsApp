package com.main.docsapp.controller;


import com.main.docsapp.model.CommentEntity;
import com.main.docsapp.service.CommentService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;
    Logger logger = LoggerFactory.getLogger(TheatreController.class);

//    @Operation(summary = "Get all theatres", security = @SecurityRequirement(name = "bearerAuth"))
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "Comments added",
//                    content = {@Content(mediaType = "application/json")}),
//            @ApiResponse(responseCode = "400", description = "Wrong format")
//    })
    @GetMapping("/comment/{id}")

    public ResponseEntity getCommentById(@PathVariable Integer id) {
    logger.info("get comment by id");
    return ResponseEntity.ok(commentService.getById(id));
}

    @GetMapping("/commentsByTheatreId/{id}")
    public ResponseEntity getCommentsByTheatreId(@PathVariable Integer id) {
        logger.info("do filter...");
        return ResponseEntity.ok(commentService.getAllCommentByTheatreId(id));
    }

    @GetMapping("/comments")
    public ResponseEntity getTheatres() {
        logger.info("do filter...");
        return ResponseEntity.ok(commentService.getAll());
    }

    @PostMapping("/comments")

    public void saveTheatre(@RequestBody CommentEntity commentModel) {
        logger.info("do save...");
        commentService.save(commentModel);
    }

}
