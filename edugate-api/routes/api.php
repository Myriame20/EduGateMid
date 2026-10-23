<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rule;
use App\Models\School;
use App\Models\Enrollment;
use App\Http\Controllers\Api\AuthController;

// Connexion
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


// Vérifier le compte connecté et se déconnecter
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Liste publique des écoles actives
Route::get('/schools', function () {
    return School::where('is_active', true)->get();
});

// Déposer une demande d'inscription
Route::post('/enrollments', function (Request $request) {
    $validated = $request->validate([
        'school_id' => [
            'required',
            'integer',
            Rule::exists('schools', 'id')->where('is_active', true),
        ],
        'parent_name' => ['required', 'string', 'max:150'],
        'parent_email' => ['required', 'email', 'max:255'],
        'parent_phone' => ['required', 'string', 'max:30'],
        'child_first_name' => ['required', 'string', 'max:100'],
        'child_last_name' => ['required', 'string', 'max:100'],
        'child_birth_date' => ['required', 'date', 'before_or_equal:today'],
        'requested_level' => [
            'required',
            Rule::in(['Maternelle', 'Primaire', 'Collège', 'Lycée']),
        ],
        'message' => ['nullable', 'string', 'max:1000'],
    ]);

    $enrollment = Enrollment::create($validated);

    return response()->json([
        'message' => 'Demande d’inscription enregistrée avec succès.',
        'enrollment' => $enrollment,
    ], 201);
});

// Consulter les dossiers de sa propre école
Route::middleware('auth:sanctum')->get(
    '/schools/{school}/enrollments',
    function (Request $request, School $school) {
        $user = $request->user();

        abort_unless(
            $user->role === 'school'
            && (int) $user->school_id === (int) $school->id,
            403,
            'Accès interdit à cette école.'
        );

        return Enrollment::where('school_id', $school->id)
            ->latest()
            ->get();
    }
);

// Accepter ou refuser un dossier
Route::middleware('auth:sanctum')->patch(
    '/enrollments/{enrollment}/status',
    function (Request $request, Enrollment $enrollment) {
        $user = $request->user();

        abort_unless(
            $user->role === 'school'
            && $user->school_id !== null
            && (int) $user->school_id === (int) $enrollment->school_id,
            403,
            'Vous ne pouvez pas modifier ce dossier.'
        );

        $validated = $request->validate([
            'status' => ['required', Rule::in(['accepted', 'rejected'])],
        ]);

        $enrollment->update([
            'status' => $validated['status'],
        ]);

        return response()->json([
            'message' => 'Statut du dossier mis à jour.',
            'enrollment' => $enrollment,
        ]);
    }
);
