package com.example.tuzolto;

import java.io.Serializable;

public class Forum implements Serializable {
    public int id;
    public String header;
    public String date;
    public int typeId;
    public String place;
    public String description;
    public String imageName;
    public ForumType forum_type;
}