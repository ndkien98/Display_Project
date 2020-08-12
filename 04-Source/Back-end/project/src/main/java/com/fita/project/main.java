package com.fita.project;

import com.fita.project.controller.RetrofitAPI.IRetrofitAPI;
import com.fita.project.controller.RetrofitAPI.RetrofitAPI;
import com.fita.project.dto.reponse.BaseResponse;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;

import java.io.IOException;

public class main {
    public static void main(String[] args) {

        String url = "http://localhost:8080";


        Retrofit retrofit = RetrofitAPI.getClient(url,"admin","admin");
        IRetrofitAPI iRetrofitAPI = retrofit.create(IRetrofitAPI.class);
        Call<BaseResponse> call = iRetrofitAPI.getUserById("admin");

        Response<BaseResponse> response = null;
        try {
            response = call.execute();
            BaseResponse baseResponse = response.body();
            System.out.println(baseResponse.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
