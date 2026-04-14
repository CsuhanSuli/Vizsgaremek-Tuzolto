package com.example.tuzolto;

import java.util.List;
import java.util.Map;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface ApiService {
    @POST("user/login")
    Call<LoginResponse> login(@Body LoginRequest request);

    @POST("user/register")
    Call<Void> register(@Body RegisterRequest request);

    @GET("user/index")
    Call<List<User>> getUsers();

    @DELETE("user/delete/{id}")
    Call<Void> deleteUser(@Path("id") int id);

    @PUT("user/nameChange/{id}")
    Call<Void> updateUserName(@Path("id") int id, @Body Map<String, String> body);

    @PUT("user/passChange/{id}")
    Call<Void> updateUserPassword(@Path("id") int id, @Body Map<String, String> body);

    @PUT("user/fortyHourUpdate/{id}")
    Call<Void> updateUserFortyHours(@Path("id") int id, @Body Map<String, Integer> body);

    @PUT("user/isAdminUpdate/{id}")
    Call<Void> updateUserAdminStatus(@Path("id") int id, @Body Map<String, Integer> body);

    @GET("car/get")
    Call<List<Car>> getCars();

    @POST("car/store")
    Call<Void> storeCar(@Body Car car);

    @PUT("car/put/{id}")
    Call<Void> updateCar(@Path("id") int id, @Body Car car);

    @DELETE("car/delete/{id}")
    Call<Void> deleteCar(@Path("id") int id);

    @GET("cartype/index")
    Call<List<CarType>> getCarTypes();

    @POST("cartype/store")
    Call<Void> storeCarType(@Body CarType carType);

    @DELETE("cartype/delete/{id}")
    Call<Void> deleteCarType(@Path("id") int id);

    @GET("tools/show/{carId}")
    Call<List<Tool>> getToolsByCar(@Path("carId") int carId);

    @POST("tools/store")
    Call<Void> storeTool(@Body Tool tool);

    @PUT("tools/put/{id}")
    Call<Void> updateTool(@Path("id") int id, @Body Tool tool);

    @DELETE("tools/delete/{id}")
    Call<Void> deleteTool(@Path("id") int id);

    @GET("carplace/index")
    Call<List<CarPlace>> getCarPlaces();

    @GET("review/latestDate/{toolId}")
    Call<ReviewDate> getLatestReviewDate(@Path("toolId") int toolId);

    @GET("review/allDates/{toolId}")
    Call<List<ReviewDate>> getAllReviewDates(@Path("toolId") int toolId);

    @POST("review/store/{toolId}")
    Call<Void> storeReviewDate(@Path("toolId") int toolId, @Body ReviewDate reviewDate);

    @PUT("review/isHappend/{reviewId}")
    Call<Void> updateReviewIsHappend(@Path("reviewId") int reviewId, @Body Map<String, Integer> body);

    @PUT("review/isSuccesfull/{reviewId}")
    Call<Void> updateReviewIsSuccesfull(@Path("reviewId") int reviewId, @Body Map<String, Integer> body);

    @PUT("review/put/{id}")
    Call<Void> updateReviewDate(@Path("id") int id, @Body ReviewDate reviewDate);

    @DELETE("review/delete/{id}")
    Call<Void> deleteReviewDate(@Path("id") int id);

    @GET("exam/index")
    Call<List<Exam>> getExams();

    @POST("exams/store")
    Call<Void> storeExam(@Body Exam exam);

    @GET("examType/index")
    Call<List<ExamType>> getExamTypes();

    @POST("examType/store")
    Call<Void> storeExamType(@Body ExamType examType);

    @DELETE("examType/delete/{id}")
    Call<Void> deleteExamType(@Path("id") int id);

    @GET("examUser/show/{userId}")
    Call<List<Exam>> getUserExams(@Path("userId") int userId);

    @POST("examUser/store")
    Call<Void> storeUserExam(@Body UserExamMapping mapping);

    @DELETE("examUser/delete/{id}")
    Call<Void> deleteUserExam(@Path("id") int id);

    @GET("schedule/index")
    Call<List<Schedule>> getSchedules();

    @GET("schedule_types")
    Call<List<ScheduleType>> getScheduleTypes();

    @POST("schedule/store")
    Call<Void> storeSchedule(@Body Schedule schedule);

    @PUT("schedule/put/{id}")
    Call<Void> updateSchedule(@Path("id") int id, @Body Schedule schedule);

    @DELETE("schedule/delete/{id}")
    Call<Void> deleteSchedule(@Path("id") int id);

    @GET("forum/get")
    Call<List<Forum>> getForums();

    @POST("forum/store")
    Call<Void> storeForum(@Body Forum forum);

    @PUT("forum/put/{id}")
    Call<Void> updateForum(@Path("id") int id, @Body Forum forum);

    @DELETE("forum/delete/{id}")
    Call<Void> deleteForum(@Path("id") int id);

    @GET("forumType/index")
    Call<List<ForumType>> getForumTypes();

    @POST("forumType/store")
    Call<Void> storeForumType(@Body ForumType forumType);

    @DELETE("forumType/delete/{id}")
    Call<Void> deleteForumType(@Path("id") int id);
}
