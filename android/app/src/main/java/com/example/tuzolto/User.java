package com.example.tuzolto;

import java.io.Serializable;

public class User implements Serializable {
    public int id;
    public String name;
    public String email;
    public int fortyHours;
    public int isAdmin;

    @Override
    public String toString() {
        return name;
    }
}