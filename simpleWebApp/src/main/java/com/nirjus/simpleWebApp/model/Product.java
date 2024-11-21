package com.nirjus.simpleWebApp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.springframework.stereotype.Component;

@Component
@Entity
public class Product {
    @Id
    private int prodId;
    private String prodName;
    private int price;

    public Product(){

    }
    public Product(int prodId, String prodName, int price){
        this.price = price;
        this.prodId = prodId;
        this.prodName = prodName;
    }

    public int getPrice() {
        return price;
    }

    public void setProdId(int prodId) {
        this.prodId = prodId;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getProdName() {
        return prodName;
    }

    public int getProdId() {
        return prodId;
    }
}
