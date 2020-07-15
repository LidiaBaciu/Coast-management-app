package com.example.coastmanagement.service;

import com.example.coastmanagement.model.User;
import com.example.coastmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public int getNumberOfNewUsers(){
        int newUsers = 0;
        for(User user : userRepository.findAll()){
            LocalDateTime datetime = LocalDateTime.ofInstant(user.getCreatedAt(), ZoneOffset.UTC);
            String formatted = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss").format(datetime);
            System.out.println(formatted);
            final String before = formatted.split(" ")[0]; // "Before"
            String dateNow = LocalDate.now().toString().split(" ")[0];
            if(dateNow.contains(before)){
                newUsers++;
            }
        }
        return newUsers;
    }
}
