package com.example.tuzolto;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;

public class UserAdapter extends RecyclerView.Adapter<UserAdapter.UserViewHolder> {

    private List<User> users;
    private OnUserActionListener listener;

    public interface OnUserActionListener {
        void onExams(User user);
        void onEdit(User user);
        void onDelete(User user);
    }

    public UserAdapter(List<User> users, OnUserActionListener listener) {
        this.users = users;
        this.listener = listener;
    }

    @NonNull
    @Override
    public UserViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_user, parent, false);
        return new UserViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull UserViewHolder holder, int position) {
        User user = users.get(position);
        holder.tvName.setText(user.name);
        holder.tvEmail.setText(user.email);
        holder.tvFortyHours.setText("40 óra: " + (user.fortyHours == 1 ? "Megvan" : "Nincs meg"));
        holder.tvAdminStatus.setText("Státusz: " + (user.isAdmin == 1 ? "Admin" : "Dolgozó"));

        holder.btnExams.setOnClickListener(v -> listener.onExams(user));
        holder.btnEdit.setOnClickListener(v -> listener.onEdit(user));
        holder.btnDelete.setOnClickListener(v -> listener.onDelete(user));
    }

    @Override
    public int getItemCount() {
        return users.size();
    }

    public void updateData(List<User> newUsers) {
        this.users = newUsers;
        notifyDataSetChanged();
    }

    static class UserViewHolder extends RecyclerView.ViewHolder {
        TextView tvName, tvEmail, tvFortyHours, tvAdminStatus;
        Button btnExams, btnEdit, btnDelete;

        public UserViewHolder(@NonNull View itemView) {
            super(itemView);
            tvName = itemView.findViewById(R.id.tvUserName);
            tvEmail = itemView.findViewById(R.id.tvUserEmail);
            tvFortyHours = itemView.findViewById(R.id.tvFortyHours);
            tvAdminStatus = itemView.findViewById(R.id.tvAdminStatus);
            btnExams = itemView.findViewById(R.id.btnUserExams);
            btnEdit = itemView.findViewById(R.id.btnEditUser);
            btnDelete = itemView.findViewById(R.id.btnDeleteUser);
        }
    }
}