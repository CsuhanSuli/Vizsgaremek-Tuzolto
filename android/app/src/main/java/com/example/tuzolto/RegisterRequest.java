package com.example.tuzolto;

public class RegisterRequest {
    public String name;
    public String email;
    public String password;
    public String password_confirmation;
    public int isAdmin;
    public int fortyHours;

    public RegisterRequest(String name, String email, String password, String password_confirmation, int isAdmin, int fortyHours) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.password_confirmation = password_confirmation;
        this.isAdmin = isAdmin;
        this.fortyHours = fortyHours;
    }
}