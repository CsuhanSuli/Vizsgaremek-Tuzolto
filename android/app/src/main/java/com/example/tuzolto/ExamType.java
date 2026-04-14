package com.example.tuzolto;

import java.io.Serializable;

public class ExamType implements Serializable {
    public int id;
    public String typeName;
    public String typName;

    @Override
    public String toString() {
        return typeName != null ? typeName : typName;
    }
}