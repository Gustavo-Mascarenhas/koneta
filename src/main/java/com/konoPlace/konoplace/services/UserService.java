package com.konoPlace.konoplace.services;


import com.konoPlace.konoplace.models.UserModel;
import com.konoPlace.konoplace.repositories.UserRepository;
import com.konoPlace.konoplace.security.BeforeAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CookieService cookieService;

    public String encryptPass(String pass){
        BCryptPasswordEncoder encrypt = new BCryptPasswordEncoder();
        String encoder = encrypt.encode(pass);
        return encoder;
    }

    private boolean comparePass(String newpass,String pass){
        BCryptPasswordEncoder encrypt = new BCryptPasswordEncoder();
        return encrypt.matches(newpass,pass);
    }

    public void registerUser(UserModel newUser, HttpServletResponse res) throws IOException {
                newUser.setSenha(encryptPass(newUser.getSenha()));
                BeforeAuthenticationFilter beforeAuthenticationFilter = new BeforeAuthenticationFilter();
                newUser.setRole("USER");
                userRepo.save(newUser);
                UserModel user = userRepo.findByEmail(newUser.getEmail());

                String userId = String.valueOf(user.getId());
                cookieService.setCookie(res,userId);
//                beforeAuthenticationFilter.attemptAuthentication(req,res);

                res.setHeader("Location", "/login?registerUser");
                res.setStatus(302);

    }

    public void loginUser(){

    }

}