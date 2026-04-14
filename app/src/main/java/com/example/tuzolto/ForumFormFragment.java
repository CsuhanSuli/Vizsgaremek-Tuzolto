package com.example.tuzolto;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TextView;
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

public class ForumFormFragment extends Fragment {

    private TextInputEditText etHeader, etDate, etPlace, etDescription, etImageName;
    private Spinner spinnerType;
    private Button btnSubmit, btnCancel;
    private TextView tvTitle;
    private ApiService apiService;
    private Forum existingForum;
    private List<ForumType> forumTypes = new ArrayList<>();

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_forum_form, container, false);

        etHeader = view.findViewById(R.id.etForumHeader);
        etDate = view.findViewById(R.id.etForumDate);
        spinnerType = view.findViewById(R.id.spinnerForumType);
        etPlace = view.findViewById(R.id.etForumPlace);
        etDescription = view.findViewById(R.id.etForumDescription);
        etImageName = view.findViewById(R.id.etForumImageName);
        btnSubmit = view.findViewById(R.id.btnSubmitForum);
        btnCancel = view.findViewById(R.id.btnCancelForum);
        tvTitle = view.findViewById(R.id.tvForumFormTitle);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        if (getArguments() != null) {
            existingForum = (Forum) getArguments().getSerializable("forum");
        }

        if (existingForum != null) {
            tvTitle.setText("Bejegyzés módosítása");
            etHeader.setText(existingForum.header);
            etDate.setText(existingForum.date);
            etPlace.setText(existingForum.place);
            etDescription.setText(existingForum.description);
            etImageName.setText(existingForum.imageName);
            btnSubmit.setText("Módosítás mentése");
        }

        loadForumTypes();

        btnSubmit.setOnClickListener(v -> submitForm());
        btnCancel.setOnClickListener(v -> getParentFragmentManager().popBackStack());

        return view;
    }

    private void loadForumTypes() {
        apiService.getForumTypes().enqueue(new Callback<List<ForumType>>() {
            @Override
            public void onResponse(Call<List<ForumType>> call, Response<List<ForumType>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    forumTypes = response.body();
                    ArrayAdapter<ForumType> adapter = new ArrayAdapter<>(requireContext(),
                            android.R.layout.simple_spinner_item, forumTypes);
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    spinnerType.setAdapter(adapter);

                    if (existingForum != null) {
                        for (int i = 0; i < forumTypes.size(); i++) {
                            if (forumTypes.get(i).id == existingForum.typeId) {
                                spinnerType.setSelection(i);
                                break;
                            }
                        }
                    }
                }
            }

            @Override
            public void onFailure(Call<List<ForumType>> call, Throwable t) {
                Toast.makeText(getContext(), "Hiba a típusok betöltésekor", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void submitForm() {
        String header = etHeader.getText().toString();
        String date = etDate.getText().toString();
        String place = etPlace.getText().toString();
        String description = etDescription.getText().toString();
        String imageName = etImageName.getText().toString();
        ForumType selectedType = (ForumType) spinnerType.getSelectedItem();

        if (header.isEmpty() || date.isEmpty() || place.isEmpty() || description.isEmpty() || selectedType == null) {
            Toast.makeText(getContext(), "Kérjük töltsön ki minden mezőt!", Toast.LENGTH_SHORT).show();
            return;
        }

        Forum forum = (existingForum != null) ? existingForum : new Forum();
        forum.header = header;
        forum.date = date;
        forum.place = place;
        forum.description = description;
        forum.imageName = imageName;
        forum.typeId = selectedType.id;

        Call<Void> call;
        if (existingForum != null) {
            call = apiService.updateForum(existingForum.id, forum);
        } else {
            call = apiService.storeForum(forum);
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