package com.example.tuzolto;

import java.io.Serializable;

public class Car implements Serializable {
    public int id;
    public String name;
    public String imageName;
    public int typeId;
    public CarType cartypes;
}