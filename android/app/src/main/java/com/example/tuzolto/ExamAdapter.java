package com.example.tuzolto;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;

public class ExamAdapter extends RecyclerView.Adapter<ExamAdapter.ExamViewHolder> {

    private List<Exam> exams;
    private OnExamActionListener listener;
    private boolean isAdmin;

    public interface OnExamActionListener {
        void onDelete(Exam exam);
    }

    public ExamAdapter(List<Exam> exams, boolean isAdmin, OnExamActionListener listener) {
        this.exams = exams;
        this.isAdmin = isAdmin;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ExamViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_exam, parent, false);
        return new ExamViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ExamViewHolder holder, int position) {
        Exam exam = exams.get(position);
        holder.tvType.setText(exam.name != null ? exam.name : "Névtelen vizsga");
        holder.tvDate.setText(exam.examDate != null ? exam.examDate : "Nincs dátum");

        holder.adminActions.setVisibility(isAdmin ? View.VISIBLE : View.GONE);
        holder.btnDelete.setOnClickListener(v -> listener.onDelete(exam));
    }

    @Override
    public int getItemCount() {
        return exams.size();
    }

    public void updateData(List<Exam> newExams) {
        this.exams = newExams;
        notifyDataSetChanged();
    }

    static class ExamViewHolder extends RecyclerView.ViewHolder {
        TextView tvType, tvDate;
        Button btnDelete;
        View adminActions;

        public ExamViewHolder(@NonNull View itemView) {
            super(itemView);
            tvType = itemView.findViewById(R.id.tvExamTypeName);
            tvDate = itemView.findViewById(R.id.tvExamDate);
            btnDelete = itemView.findViewById(R.id.btnDeleteExam);
            adminActions = itemView.findViewById(R.id.adminExamActions);
        }
    }
}