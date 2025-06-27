<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAnnounementRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('announcement'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'expiration_date' => ['nullable', 'date'],
            'is_featured' => ['boolean'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'images' => ['nullable', 'array'],
            'images.*' => ['nullable', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ];
    }
}
