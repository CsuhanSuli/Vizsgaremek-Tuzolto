package com.example.tuzolto;

import java.io.Serializable;

public class ScheduleType implements Serializable {
    public int id;
    public String name;

    @Override
    public String toString() {
        return name;
    }
}