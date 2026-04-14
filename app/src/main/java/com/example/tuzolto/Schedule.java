package com.example.tuzolto;

import java.io.Serializable;

public class Schedule implements Serializable {
    public int id;
    public int userId;
    public int scheduleTypeid;
    public String date;
    
    public User users;
    public ScheduleType schedule_types;
}