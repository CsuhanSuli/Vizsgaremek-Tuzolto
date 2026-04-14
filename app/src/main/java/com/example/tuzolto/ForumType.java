package com.example.tuzolto;

import java.io.Serializable;

public class ForumType implements Serializable {
    public int id;
    public String typeName;

    @Override
    public String toString() {
        return typeName;
    }
}