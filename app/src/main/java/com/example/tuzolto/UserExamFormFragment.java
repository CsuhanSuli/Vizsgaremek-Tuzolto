package com.example.tuzolto;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Spinner;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import com.google.android.material.textfield.TextInputEditText;
import java.util.ArrayList;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserExamFormFragment extends Fragment {

    private TextInputEditText etDate;
    private Spinner spinnerUser;
    private RadioGroup rgExams;
    private Button btnSubmit;
    private ApiService apiService;
    private List<User> users = new ArrayList<>();
    private List<Exam> exams = new ArrayList<>();

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_user_exam_form, container, false);

        etDate = view.findViewById(R.id.etExamDate);
        spinnerUser = view.findViewById(R.id.spinnerUser);
        rgExams = view.findViewById(R.id.rgExams);
        btnSubmit = view.findViewById(R.id.btnSubmitUserExam);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        loadUsers();
        loadExams();

        btnSubmit.setOnClickListener(v -> submitForm());

        return view;
    }

    private void loadUsers() {
        apiService.getUsers().enqueue(new Callback<List<User>>() {
            @Override
            public void onResponse(Call<List<User>> call, Response<List<User>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    users = response.body();
                    ArrayAdapter<User> adapter = new ArrayAdapter<>(requireContext(),
                            android.R.layout.simple_spinner_item, users);
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    spinnerUser.setAdapter(adapter);
                }
            }

            @Override
            public void onFailure(Call<List<User>> call, Throwable t) {}
        });
    }

    private void loadExams() {
        apiService.getExams().enqueue(new Callback<List<Exam>>() {
            @Override
            public void onResponse(Call<List<Exam>> call, Response<List<Exam>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    exams = response.body();
                    rgExams.removeAllViews();
                    for (Exam exam : exams) {
                        RadioButton rb = new RadioButton(getContext());
                        rb.setText(exam.name);
                        rb.setId(View.generateViewId());
                        rb.setTag(exam.id);
                        rgExams.addView(rb);
                    }
                }
            }

            @Override
            public void onFailure(Call<List<Exam>> call, Throwable t) {}
        });
    }

    private void submitForm() {
        String date = etDate.getText().toString();
        User selectedUser = (User) spinnerUser.getSelectedItem();
        int selectedRbId = rgExams.getCheckedRadioButtonId();

        if (date.isEmpty() || selectedUser == null || selectedRbId == -1) {
            Toast.makeText(getContext(), "Kérjük töltsön ki minden mezőt!", Toast.LENGTH_SHORT).show();
            return;
        }

        RadioButton selectedRb = rgExams.findViewById(selectedRbId);
        int examId = (int) selectedRb.getTag();

        UserExamMapping mapping = new UserExamMapping();
        mapping.userId = selectedUser.id;
        mapping.examId = examId;
        mapping.examDate = date;

        apiService.storeUserExam(mapping).enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(getContext(), "Sikeres mentés!", Toast.LENGTH_SHORT).show();
                    getParentFragmentManager().popBackStack();
                } else {
                    Toast.makeText(getContext(), "Hiba a mentés során!", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Toast.makeText(getContext(), "Hálózati hiba!", Toast.LENGTH_SHORT).show();
            }
        });
    }
}