package tn.esprit.authentificationmicroservice.Controller;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.authentificationmicroservice.Entity.User;
import tn.esprit.authentificationmicroservice.Service.Authentication.AuthenticationServiceImpl;
import tn.esprit.authentificationmicroservice.dto.SignUpRequest;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthentificationRestAPI {

    private final AuthenticationServiceImpl authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<User> signUp(@RequestBody SignUpRequest signUpRequest){
        return ResponseEntity.ok(authenticationService.singUp(signUpRequest));
    }



}
