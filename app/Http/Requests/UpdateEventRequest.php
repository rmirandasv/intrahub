<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->event);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'event_date' => 'required|date',
            'location' => 'required|string|max:255',
            'capacity' => 'nullable|integer',
            'images' => 'nullable|array',
            'expiration_date' => 'nullable|date',
            'is_featured' => 'nullable|boolean',
            'category_id' => 'nullable|string|exists:categories,id',
        ];
    }
}
