package com.inks.hb.common;

import java.util.ArrayList;

/**
 * 抽象出一个统一的toJson类
 * 最主要用途是包装ArrayList的各个pojo对象
 *
 */
public class PojotoJson {

    private String code; //数据状态字段

    private String msg; //状态字段名

    private String count; //数据总数

    private ArrayList data; //数据

    public PojotoJson(String code, String msg, String count, ArrayList data) {
        this.code = code;
        this.msg = msg;
        this.count = count;
        this.data = data;
    }
}