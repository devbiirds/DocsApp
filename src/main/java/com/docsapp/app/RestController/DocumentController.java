package com.main.docsapp.controller;

import com.main.docsapp.model.documentEntity;
import com.main.docsapp.service.documentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
public class documentController {

    @Autowired
    private documentService documentService;
    Logger logger = LoggerFactory.getLogger(documentController.class);

    @Operation(summary = "Get all documents", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "documents founded",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Wrong format")
    })

    @GetMapping("/documents")
    public ResponseEntity getdocuments() {
        logger.info("do filter...");
        return ResponseEntity.ok(documentService.getAll());
    }

    @GetMapping("/documents/{id}")

    public ResponseEntity getdocumentsById(@PathVariable Integer id) {
        logger.info("get document by id");
        return ResponseEntity.ok(documentService.getById(id));
    }

    @GetMapping("/documents/name/{name}")

    public ResponseEntity getdocumentsByName(@PathVariable String name) {
        logger.info("get document by name");
        return ResponseEntity.ok(documentService.getBytitle(name));////////////////////////////
    }
    @Operation(summary = "Get documents by title", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "documents founded",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "400", description = "Wrong format")
    })

    @GetMapping("/documents/title/{title}")

    public ResponseEntity getdocumentsBytitle(@PathVariable String title) {
        logger.info("get document by title");
        return ResponseEntity.ok(documentService.getBytitle(title));
    }

    @GetMapping("/documents/description/{description}")

    public ResponseEntity getdocumentsBydescription(@PathVariable String description) {
        logger.info("get document by description");
        return ResponseEntity.ok(documentService.getBydescription(description));
    }

    @Operation(summary = "Get documents with pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "documents founded",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "404", description = "documents not founded"),
            @ApiResponse(responseCode = "400", description = "Wrong format")
    })
    @GetMapping(value = "/documents/page")
    public ResponseEntity<Collection<documentEntity>> getNumberOfEvents(@RequestParam("page") Integer page, @RequestParam("size") Integer size){
        return new ResponseEntity<>(documentService.getByPage(page, size), HttpStatus.OK);
    }


    @PostMapping("/api/documents")

    public void savedocument(@RequestBody documentEntity documentModel) {
        logger.info("do save...");
        documentService.save(documentModel);
    }

}
