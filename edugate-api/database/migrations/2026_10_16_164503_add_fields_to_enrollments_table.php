<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('enrollments', function (Blueprint $table) {
            $table->foreignId('school_id')->constrained('schools');
            $table->string('parent_name', 150);
            $table->string('parent_email');
            $table->string('parent_phone', 30);
            $table->string('child_first_name', 100);
            $table->string('child_last_name', 100);
            $table->date('child_birth_date');
            $table->string('requested_level');
            $table->text('message')->nullable();
            $table->string('status')->default('pending');
        });
    }

    public function down(): void
    {
        Schema::table('enrollments', function (Blueprint $table) {
            $table->dropForeign(['school_id']);
            $table->dropColumn([
                'school_id',
                'parent_name',
                'parent_email',
                'parent_phone',
                'child_first_name',
                'child_last_name',
                'child_birth_date',
                'requested_level',
                'message',
                'status',
            ]);
        });
    }
};