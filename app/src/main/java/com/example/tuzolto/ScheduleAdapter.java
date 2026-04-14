package com.example.tuzolto;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;

public class ScheduleAdapter extends RecyclerView.Adapter<ScheduleAdapter.ScheduleViewHolder> {

    private List<Schedule> schedules;
    private OnScheduleClickListener listener;

    public interface OnScheduleClickListener {
        void onScheduleClick(Schedule schedule);
    }

    public ScheduleAdapter(List<Schedule> schedules, OnScheduleClickListener listener) {
        this.schedules = schedules;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ScheduleViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_schedule, parent, false);
        return new ScheduleViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ScheduleViewHolder holder, int position) {
        Schedule schedule = schedules.get(position);
        holder.tvDate.setText(schedule.date);
        holder.tvUser.setText(schedule.users != null ? schedule.users.name : "Ismeretlen dolgozó");
        holder.tvType.setText(schedule.schedule_types != null ? schedule.schedule_types.name : "Ismeretlen típus");

        holder.itemView.setOnClickListener(v -> listener.onScheduleClick(schedule));
    }

    @Override
    public int getItemCount() {
        return schedules.size();
    }

    public void updateData(List<Schedule> newSchedules) {
        this.schedules = newSchedules;
        notifyDataSetChanged();
    }

    static class ScheduleViewHolder extends RecyclerView.ViewHolder {
        TextView tvDate, tvUser, tvType;

        public ScheduleViewHolder(@NonNull View itemView) {
            super(itemView);
            tvDate = itemView.findViewById(R.id.tvScheduleDate);
            tvUser = itemView.findViewById(R.id.tvScheduleUserName);
            tvType = itemView.findViewById(R.id.tvScheduleTypeName);
        }
    }
}