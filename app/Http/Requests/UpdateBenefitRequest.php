<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBenefitRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('benefit'));
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
            'expiration_date' => 'nullable|date',
            'is_featured' => 'required|boolean',
            'category_id' => 'required|string|exists:categories,id',
            'images' => 'sometimes|nullable|array',
            'images.*' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'partner_name' => 'required|string|max:255',
            'website' => 'sometimes|nullable|url',
            'email' => 'sometimes|nullable|email',
            'phone' => 'sometimes|nullable|string|max:255',
            'address' => 'sometimes|nullable|string|max:255',
        ];
    }
}
