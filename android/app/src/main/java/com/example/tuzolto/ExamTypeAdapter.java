package com.example.tuzolto;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;

public class ExamTypeAdapter extends RecyclerView.Adapter<ExamTypeAdapter.TypeViewHolder> {

    private List<ExamType> types;
    private OnTypeActionListener listener;
    private boolean isAdmin;

    public interface OnTypeActionListener {
        void onDelete(ExamType type);
    }

    public ExamTypeAdapter(List<ExamType> types, boolean isAdmin, OnTypeActionListener listener) {
        this.types = types;
        this.isAdmin = isAdmin;
        this.listener = listener;
    }

    @NonNull
    @Override
    public TypeViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_exam_type, parent, false);
        return new TypeViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull TypeViewHolder holder, int position) {
        ExamType type = types.get(position);
        holder.tvName.setText(type.typeName != null ? type.typeName : type.typName);
        
        holder.btnDelete.setVisibility(isAdmin ? View.VISIBLE : View.GONE);
        holder.btnDelete.setOnClickListener(v -> listener.onDelete(type));
    }

    @Override
    public int getItemCount() {
        return types.size();
    }

    public void updateData(List<ExamType> newTypes) {
        this.types = newTypes;
        notifyDataSetChanged();
    }

    static class TypeViewHolder extends RecyclerView.ViewHolder {
        TextView tvName;
        Button btnDelete;
        public TypeViewHolder(@NonNull View itemView) {
            super(itemView);
            tvName = itemView.findViewById(R.id.tvExamTypeName);
            btnDelete = itemView.findViewById(R.id.btnDeleteExamType);
        }
    }
}