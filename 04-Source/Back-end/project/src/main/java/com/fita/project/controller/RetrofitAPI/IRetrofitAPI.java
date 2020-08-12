package com.fita.project.controller.RetrofitAPI;


import com.fita.project.dto.reponse.BaseResponse;
import retrofit2.Call;
import retrofit2.http.HTTP;
import retrofit2.http.Path;

public interface IRetrofitAPI {
    @HTTP(method = "GET", path = "/user/find-by-user-code/{param}")
    Call<BaseResponse> getUserById(@Path("param") String param);
}
