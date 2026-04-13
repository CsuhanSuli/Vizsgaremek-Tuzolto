<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // felhasználói regisztráció
    public function register(Request $request)
    {
        // Validálás
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            // e-mail egyedi legyen a user táblában
            // e-mail formailag helyes
            'email' => 'required|email|unique:users',
            // confirmed: a jelszót meg kell erősíteni
            'password' => 'required|min:4|confirmed',
            'fortyHours' => 'required',
            'isAdmin' => 'required'
        ]);
        if($validator->fails())
            {
                return response()->json(["errors"=>$validator->errors()],400);
            }
        $user = new User();
        $user->name=$request->name;
        $user->email=$request->email;
        $user->password=hash::make($request->password);
        $user->fortyHours=$request->fortyHours;
        $user->isAdmin=$request->isAdmin;
        $user->save();
        // user létrehozása


        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ],
            [
                'email.required' => 'nincs email megadva',
                'password.required' => 'nincs jelszó megadva',
            ]
        );

        if (! Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Hibás email vagy jelszó',
            ], 401);
        }

        $user = User::where('email', $request->email)->first();
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sikeres kijelentkezés',
        ]);
    }

public function fortyHourUpdate(Request $request, int $id)
{
    $request->validate([
        'fortyHours' => 'required|in:0,1'
    ]);

    $data = User::find($id);
    if (empty($data)) {
        return response()->json(['message' => '404'], 404);
    }

    $data->fortyHours = $request->input('fortyHours');
    $data->save();

    return response()->json(['message' => 'Sikeres módosítás']);
}

public function isAdminUpdate(Request $request, int $id)
{
    $request->validate([
        'isAdmin' => 'required|in:0,1'
    ]);

    $data = User::find($id);
    if (empty($data)) {
        return response()->json(['message' => '404'], 404);
    }

    $data->isAdmin = $request->input('isAdmin');
    $data->save();

    return response()->json(['message' => 'Sikeres módosítás']);
}

    public function destroy(int $id)
    {
        $data = User::find($id);
        if (empty($id)) {
            return response()->json(['message' => '404 nincs ijen felhasználó'], 404);
        }
        $data->delete();

        return response()->json(['message' => 'sikeres törlés'], 204);
    }

    public function index()
    {
        return response(User::all());
    }

    public function nameChange(Request $request, int $id)
    {
        $data = User::find($id);
        if (empty($data)) {
            return response()->json(['message' => '404 nincs ijen auto'], 404);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'hiba', 'hibák' => $validator->errors()], 402);
        }
        $data->name = $request->name;
        $data->save();

        return response()->json(['message' => 'sikeresen meg lett váltosztatva a név']);
    }

    public function passChange(Request $request, int $id)
    {
        $data = User::find($id);
        if (empty($data)) {
            return response()->json(['message' => '404 nincs ijen auto'], 404);
        }
        $validator = Validator::make($request->all(), [
            'password' => 'required|min:4|confirmed',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'hiba', 'hibák' => $validator->errors()], 402);
        }
        $data->password = Hash::make($request->password);
        $data->save();

        return response()->json(['message' => 'sikeresen meg lett váltosztatva a név']);
    }
}
