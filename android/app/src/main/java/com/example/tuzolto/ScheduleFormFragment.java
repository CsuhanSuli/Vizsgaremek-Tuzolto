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
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import com.google.android.material.textfield.TextInputEditText;
import java.util.ArrayList;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ScheduleFormFragment extends Fragment {

    private TextInputEditText etDate;
    private Spinner spinnerUser;
    private RadioGroup rgTypes;
    private Button btnSubmit, btnDelete;
    private TextView tvTitle;
    private ApiService apiService;
    private Schedule existingSchedule;
    private List<User> users = new ArrayList<>();
    private List<ScheduleType> types = new ArrayList<>();

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_schedule_form, container, false);

        etDate = view.findViewById(R.id.etScheduleDate);
        spinnerUser = view.findViewById(R.id.spinnerScheduleUser);
        rgTypes = view.findViewById(R.id.rgScheduleTypes);
        btnSubmit = view.findViewById(R.id.btnSubmitSchedule);
        btnDelete = view.findViewById(R.id.btnDeleteSchedule);
        tvTitle = view.findViewById(R.id.tvScheduleFormTitle);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        if (getArguments() != null) {
            existingSchedule = (Schedule) getArguments().getSerializable("schedule");
        }

        if (existingSchedule != null) {
            tvTitle.setText("Beosztás módosítása");
            etDate.setText(existingSchedule.date);
            btnSubmit.setText("Módosítás");
            btnDelete.setVisibility(View.VISIBLE);
        }

        loadUsers();
        loadTypes();

        btnSubmit.setOnClickListener(v -> submitForm());
        btnDelete.setOnClickListener(v -> deleteSchedule());

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

                    if (existingSchedule != null) {
                        for (int i = 0; i < users.size(); i++) {
                            if (users.get(i).id == existingSchedule.userId) {
                                spinnerUser.setSelection(i);
                                break;
                            }
                        }
                    }
                }
            }

            @Override
            public void onFailure(Call<List<User>> call, Throwable t) {}
        });
    }

    private void loadTypes() {
        apiService.getScheduleTypes().enqueue(new Callback<List<ScheduleType>>() {
            @Override
            public void onResponse(Call<List<ScheduleType>> call, Response<List<ScheduleType>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    types = response.body();
                    rgTypes.removeAllViews();
                    for (ScheduleType type : types) {
                        RadioButton rb = new RadioButton(getContext());
                        rb.setText(type.name);
                        rb.setId(View.generateViewId());
                        rb.setTag(type.id);
                        rgTypes.addView(rb);

                        if (existingSchedule != null && type.id == existingSchedule.scheduleTypeid) {
                            rb.setChecked(true);
                        }
                    }
                }
            }

            @Override
            public void onFailure(Call<List<ScheduleType>> call, Throwable t) {}
        });
    }

    private void submitForm() {
        String date = etDate.getText().toString();
        User selectedUser = (User) spinnerUser.getSelectedItem();
        int selectedRbId = rgTypes.getCheckedRadioButtonId();

        if (date.isEmpty() || selectedUser == null || selectedRbId == -1) {
            Toast.makeText(getContext(), "Kérjük töltsön ki minden mezőt!", Toast.LENGTH_SHORT).show();
            return;
        }

        RadioButton selectedRb = rgTypes.findViewById(selectedRbId);
        int typeId = (int) selectedRb.getTag();

        Schedule schedule = (existingSchedule != null) ? existingSchedule : new Schedule();
        schedule.userId = selectedUser.id;
        schedule.scheduleTypeid = typeId;
        schedule.date = date;

        Call<Void> call;
        if (existingSchedule != null) {
            call = apiService.updateSchedule(existingSchedule.id, schedule);
        } else {
            call = apiService.storeSchedule(schedule);
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

    private void deleteSchedule() {
        new AlertDialog.Builder(requireContext())
                .setTitle("Törlés")
                .setMessage("Biztosan törölni szeretnéd ezt a beosztást?")
                .setPositiveButton("Igen", (dialog, which) -> {
                    apiService.deleteSchedule(existingSchedule.id).enqueue(new Callback<Void>() {
                        @Override
                        public void onResponse(Call<Void> call, Response<Void> response) {
                            if (response.isSuccessful()) {
                                Toast.makeText(getContext(), "Sikeres törlés!", Toast.LENGTH_SHORT).show();
                                getParentFragmentManager().popBackStack();
                            }
                        }

                        @Override
                        public void onFailure(Call<Void> call, Throwable t) {
                            Toast.makeText(getContext(), "Hiba a törlés során!", Toast.LENGTH_SHORT).show();
                        }
                    });
                })
                .setNegativeButton("Mégse", null)
                .show();
    }
}