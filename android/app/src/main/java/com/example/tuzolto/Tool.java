package com.example.tuzolto;

import java.io.Serializable;

public class Tool implements Serializable {
    public int id;
    public String name;
    public int placeId;
    public int carId;
    public CarPlace car_place;
    public String reviewDate;
}