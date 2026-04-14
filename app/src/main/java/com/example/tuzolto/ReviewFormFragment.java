package com.example.tuzolto;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import com.google.android.material.textfield.TextInputEditText;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ReviewFormFragment extends Fragment {

    private TextInputEditText etDate;
    private CheckBox cbHappened, cbSuccessful;
    private Button btnSubmit;
    private TextView tvTitle;
    private ApiService apiService;
    private Tool tool;
    private ReviewDate existingReview;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_review_form, container, false);

        etDate = view.findViewById(R.id.etReviewDate);
        cbHappened = view.findViewById(R.id.cbIsHappened);
        cbSuccessful = view.findViewById(R.id.cbIsSuccessful);
        btnSubmit = view.findViewById(R.id.btnSubmitReview);
        tvTitle = view.findViewById(R.id.tvReviewFormTitle);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        if (getArguments() != null) {
            tool = (Tool) getArguments().getSerializable("tool");
            existingReview = (ReviewDate) getArguments().getSerializable("review");
        }

        if (existingReview != null) {
            tvTitle.setText("Legutóbbi dátum módosítása");
            etDate.setText(existingReview.reviewDate);
            cbHappened.setChecked(existingReview.isHappend == 1);
            cbSuccessful.setEnabled(existingReview.isHappend == 1);
            cbSuccessful.setChecked(existingReview.isSuccesfull == 1);
            btnSubmit.setText("Frissítés");
        }

        cbHappened.setOnCheckedChangeListener((buttonView, isChecked) -> {
            cbSuccessful.setEnabled(isChecked);
            if (!isChecked) {
                cbSuccessful.setChecked(false);
            }
        });

        btnSubmit.setOnClickListener(v -> submitForm());

        return view;
    }

    private void submitForm() {
        String date = etDate.getText().toString();
        if (date.isEmpty()) {
            Toast.makeText(getContext(), "Kérjük adjon meg egy dátumot!", Toast.LENGTH_SHORT).show();
            return;
        }

        ReviewDate review = (existingReview != null) ? existingReview : new ReviewDate();
        review.reviewDate = date;
        review.isHappend = cbHappened.isChecked() ? 1 : 0;
        review.isSuccesfull = cbSuccessful.isChecked() ? 1 : 0;
        review.toolId = tool.id;

        Call<Void> call;
        if (existingReview != null) {
            call = apiService.updateReviewDate(existingReview.id, review);
        } else {
            call = apiService.storeReviewDate(tool.id, review);
        }

        call.enqueue(new Callback<Void>() {
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