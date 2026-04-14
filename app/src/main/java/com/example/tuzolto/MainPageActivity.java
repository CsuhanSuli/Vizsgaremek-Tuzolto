package com.example.tuzolto;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import com.google.android.material.navigation.NavigationView;

public class MainPageActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {

    private DrawerLayout drawerLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_page);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        drawerLayout = findViewById(R.id.drawerLayout);
        NavigationView navigationView = findViewById(R.id.navigationView);
        navigationView.setNavigationItemSelectedListener(this);

        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this, drawerLayout, toolbar,
                R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();

        boolean isAdmin = getSharedPreferences("app", MODE_PRIVATE).getBoolean("isAdmin", false);
        if (!isAdmin) {
            navigationView.getMenu().findItem(R.id.nav_register).setVisible(false);
            navigationView.getMenu().findItem(R.id.nav_car_types).setVisible(false);
            navigationView.getMenu().findItem(R.id.nav_exam_types).setVisible(false);
            navigationView.getMenu().findItem(R.id.nav_forum_types).setVisible(false);
            navigationView.getMenu().findItem(R.id.nav_employees).setVisible(false);
            navigationView.getMenu().findItem(R.id.nav_exams).setVisible(false);
        }

        if (savedInstanceState == null) {
            getSupportFragmentManager().beginTransaction()
                    .replace(R.id.contentFrame, new HomeFragment())
                    .commit();
            navigationView.setCheckedItem(R.id.nav_home);
            setTitle("Beosztás");
        }
    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        int id = item.getItemId();
        Fragment selectedFragment = null;
        String title = "";

        if (id == R.id.nav_home) {
            selectedFragment = new HomeFragment();
            title = "Beosztás";
        } else if (id == R.id.nav_my_exams) {
            selectedFragment = new ExamListFragment();
            Bundle args = new Bundle();
            args.putInt("userId", 1);
            args.putString("name", "Saját");
            selectedFragment.setArguments(args);
            title = "Vizsgáim";
        } else if (id == R.id.nav_cars) {
            selectedFragment = new CarListFragment();
            title = "Autók";
        } else if (id == R.id.nav_exams) {
            selectedFragment = new ExamListFragment();
            title = "Vizsgák";
        } else if (id == R.id.nav_exam_types) {
            selectedFragment = new ExamTypeListFragment();
            title = "Vizsga típusok";
        } else if (id == R.id.nav_car_types) {
            selectedFragment = new CarTypeListFragment();
            title = "Autó típusok";
        } else if (id == R.id.nav_employees) {
            selectedFragment = new UserListFragment();
            title = "Dolgozók";
        } else if (id == R.id.nav_register) {
            selectedFragment = new RegistrationFragment();
            title = "Regisztráció";
        } else if (id == R.id.nav_logout) {
            getSharedPreferences("app", MODE_PRIVATE).edit().remove("token").apply();
            Intent intent = new Intent(this, MainActivity.class);
            startActivity(intent);
            finish();
            return true;
        } else {
            title = item.getTitle().toString();
        }

        if (selectedFragment != null) {
            getSupportFragmentManager().beginTransaction()
                    .replace(R.id.contentFrame, selectedFragment)
                    .commit();
        } else if (!title.isEmpty()) {
            Toast.makeText(this, title + " fejlesztés alatt...", Toast.LENGTH_SHORT).show();
        }

        if (!title.isEmpty()) {
            setTitle(title);
        }

        drawerLayout.closeDrawer(GravityCompat.START);
        return true;
    }

    @Override
    public void onBackPressed() {
        if (drawerLayout.isDrawerOpen(GravityCompat.START)) {
            drawerLayout.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }
}