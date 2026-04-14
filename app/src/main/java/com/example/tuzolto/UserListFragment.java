package com.example.tuzolto;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserListFragment extends Fragment implements UserAdapter.OnUserActionListener {

    private RecyclerView recyclerView;
    private UserAdapter adapter;
    private TextView tvEmpty;
    private Button btnNewExam;
    private ApiService apiService;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_user_list, container, false);

        recyclerView = view.findViewById(R.id.recyclerViewUsers);
        tvEmpty = view.findViewById(R.id.tvEmptyUsers);
        btnNewExam = view.findViewById(R.id.btnNewUserExam);

        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        adapter = new UserAdapter(new ArrayList<>(), this);
        recyclerView.setAdapter(adapter);

        apiService = RetrofitClient.getClient(getContext()).create(ApiService.class);

        btnNewExam.setOnClickListener(v -> {
            getParentFragmentManager().beginTransaction()
                    .replace(R.id.contentFrame, new UserExamFormFragment())
                    .addToBackStack(null)
                    .commit();
            requireActivity().setTitle("Új vizsga bejegyzése");
        });

        loadUsers();

        return view;
    }

    private void loadUsers() {
        tvEmpty.setVisibility(View.VISIBLE);
        tvEmpty.setText("Betöltés...");

        apiService.getUsers().enqueue(new Callback<List<User>>() {
            @Override
            public void onResponse(Call<List<User>> call, Response<List<User>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<User> users = response.body();
                    adapter.updateData(users);
                    tvEmpty.setVisibility(users.isEmpty() ? View.VISIBLE : View.GONE);
                } else {
                    tvEmpty.setText("Hiba a betöltés során.");
                }
            }

            @Override
            public void onFailure(Call<List<User>> call, Throwable t) {
                tvEmpty.setText("Hálózati hiba.");
            }
        });
    }

    @Override
    public void onExams(User user) {
        ExamListFragment fragment = new ExamListFragment();
        Bundle args = new Bundle();
        args.putInt("userId", user.id);
        args.putString("name", user.name);
        fragment.setArguments(args);

        getParentFragmentManager().beginTransaction()
                .replace(R.id.contentFrame, fragment)
                .addToBackStack(null)
                .commit();
        requireActivity().setTitle(user.name + " vizsgái");
    }

    @Override
    public void onEdit(User user) {
        EditUserFragment fragment = new EditUserFragment();
        Bundle args = new Bundle();
        args.putSerializable("user", user);
        fragment.setArguments(args);

        getParentFragmentManager().beginTransaction()
                .replace(R.id.contentFrame, fragment)
                .addToBackStack(null)
                .commit();
        requireActivity().setTitle("Dolgozó módosítása");
    }

    @Override
    public void onDelete(User user) {
        new AlertDialog.Builder(requireContext())
                .setTitle("Törlés")
                .setMessage("Biztosan törli ezt a felhasználót?")
                .setPositiveButton("Igen", (dialog, which) -> {
                    apiService.deleteUser(user.id).enqueue(new Callback<Void>() {
                        @Override
                        public void onResponse(Call<Void> call, Response<Void> response) {
                            if (response.isSuccessful()) {
                                Toast.makeText(getContext(), "Sikeres törlés!", Toast.LENGTH_SHORT).show();
                                loadUsers();
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