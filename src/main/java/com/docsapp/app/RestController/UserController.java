package com.docsapp.app.controller;

import com.docsapp.app.config.WebConfiguration;
import com.docsapp.app.model.UsersEntity;
import com.docsapp.app.security.AuthenticationException;
import com.docsapp.app.security.JwtInMemoryUserDetailsService;
import com.docsapp.app.security.JwtTokenUtil;
import com.docsapp.app.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;


@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private JwtInMemoryUserDetailsService jwtInMemoryUserDetailsService;
    Logger logger = LoggerFactory.getLogger(UserController.class);
//    @GetMapping("/users")
//    public ResponseEntity getUsers() {
//        logger.info("do filter...");
//        System.out.println(WebConfiguration.superPort);
//        return ResponseEntity.ok(userService.getAll());
//    }
//
@GetMapping("/user/id/{id}")

public ResponseEntity getUserById(@PathVariable Integer id) {
    logger.info("get user by id");
    return ResponseEntity.ok(userService.getById(id));
}
    @GetMapping(value = "/user/{login}")
    public ResponseEntity getUserByLogin(@PathVariable(name = "login") String login) {
        Optional<UsersEntity> user;
        try {
            user = userService.findByLogin(login);
            return ResponseEntity.ok(user.get());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("invalid User login");
        }

    }

    @PostMapping("/api/reg")
    public ResponseEntity saveUser(@RequestBody UsersEntity userModel) {
        try{
           userService.save(userModel);
          return ResponseEntity.ok("good");
        } catch (Exception e){
            return ResponseEntity.badRequest().body("user already registered");
        }
    }

    @PostMapping(value = "/api/auth")
    public ResponseEntity<Map<Object, Object>> login(@RequestBody UsersEntity userDto){
        authenticate(userDto.getLogin(), userDto.getPassword());

        final UserDetails userDetails = jwtInMemoryUserDetailsService
                .loadUserByUsername(userDto.getLogin());

        final String token = jwtTokenUtil.generateToken(userDetails);
        Map<Object, Object> outToken = new HashMap<>();
        outToken.put("token", token);
        outToken.put( "role", userDetails.getAuthorities());
        outToken.put( "login", userDto.getLogin());
        return ResponseEntity.ok(outToken);
    }

    private void authenticate(String username, String password) {
        Objects.requireNonNull(username);
        Objects.requireNonNull(password);

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new AuthenticationException("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new AuthenticationException("INVALID_CREDENTIALS", e);
        }
    }
}

