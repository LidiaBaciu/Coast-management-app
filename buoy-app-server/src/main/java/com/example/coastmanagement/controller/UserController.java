package com.example.coastmanagement.controller;

import com.example.coastmanagement.exception.ResourceNotFoundException;
import com.example.coastmanagement.model.RoleName;
import com.example.coastmanagement.model.User;
import com.example.coastmanagement.payload.*;
import com.example.coastmanagement.payload.responses.PagedResponse;
import com.example.coastmanagement.repository.UserRepository;
import com.example.coastmanagement.security.UserPrincipal;
import com.example.coastmanagement.security.CurrentUser;
import com.example.coastmanagement.service.UserService;
import com.example.coastmanagement.util.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/user/me")
    //@PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        Optional<User> user = userRepository.findByUsername(currentUser.getUsername());
        RoleName roleName = user.get().getRoles().stream().findFirst().get().getName();
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName(), roleName);
        return userSummary;
    }

    @GetMapping("/users/admins")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserSummary> getAdmins() {
        List<User> users = userService.getAllUsers();
        List<UserSummary> usersRoleAdmin = new ArrayList<>();
        for (User user : users) {
            RoleName roleName = user.getRoles().stream().findFirst().get().getName();
            if(roleName.toString().contains("ADMIN")){
                UserSummary userSummary = new UserSummary(user.getId(), user.getUsername(), user.getName(), roleName);
                usersRoleAdmin.add(userSummary);
            }
        }
        return usersRoleAdmin;
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        RoleName role = user.getRoles().stream().findFirst().get().getName();
        UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getName(), user.getCreatedAt(), role, user.getBuoys());

        return userProfile;
    }

}
