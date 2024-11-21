package com.nirjus.simpleWebApp.service;

import com.nirjus.simpleWebApp.model.Product;
import com.nirjus.simpleWebApp.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepo repo;

//    List<Product> products = new ArrayList<>(Arrays.asList(
//            new Product(101,"Iphone",50000),
//            new Product(102, "Samsung", 45000),
//            new Product(103, "Oppo", 85000)
//    ));

    public List<Product> getProducts(){
        return repo.findAll();
    }

    public Product getProductById(int prodId) {
        return repo.findById(prodId).orElse(new Product());
    }

    public void addProduct(Product product){
      repo.save(product);
    }

    public void updateProduct(Product product) {
       repo.save(product);
    }

    public void deleteProduct(int prodId) {
        repo.deleteById(prodId);
    }
}
