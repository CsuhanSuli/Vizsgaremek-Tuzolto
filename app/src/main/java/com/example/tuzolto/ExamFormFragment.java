package com.example.tuzolto;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
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

public class ExamFormFragment extends Fragment {

    private TextInputEditText etName;
    private AutoCompleteTextView spinnerType;
    private Button btnSubmit;
    private ApiService apiService;
    private List<ExamType> examTypes = new ArrayList<>();
    private ExamType selectedType;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_exam_form, container, false);

        etName = view.findViewById(R.id.etExamName);
        spinnerType = view.findViewById(R.id.spinnerExamType);
        btnSubmit = view.findViewById(R.id.btnSubmitExam);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        loadExamTypes();

        btnSubmit.setOnClickListener(v -> submitForm());

        return view;
    }

    private void loadExamTypes() {
        apiService.getExamTypes().enqueue(new Callback<List<ExamType>>() {
            @Override
            public void onResponse(Call<List<ExamType>> call, Response<List<ExamType>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    examTypes = response.body();
                    ArrayAdapter<ExamType> adapter = new ArrayAdapter<>(requireContext(),
                            android.R.layout.simple_dropdown_item_1line, examTypes);
                    spinnerType.setAdapter(adapter);
                    spinnerType.setOnItemClickListener((parent, view, position, id) -> {
                        selectedType = examTypes.get(position);
                    });
                }
            }

            @Override
            public void onFailure(Call<List<ExamType>> call, Throwable t) {
                Toast.makeText(getContext(), "Hiba a típusok betöltésekor", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void submitForm() {
        String name = etName.getText().toString();

        if (name.isEmpty() || selectedType == null) {
            Toast.makeText(getContext(), "Kérjük töltsön ki minden mezőt!", Toast.LENGTH_SHORT).show();
            return;
        }

        Exam exam = new Exam();
        exam.name = name;
        exam.examType = selectedType.id;

        apiService.storeExam(exam).enqueue(new Callback<Void>() {
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