<?php

namespace App\Enums;

enum PostType: string
{
    case ANNOUNCEMENT = 'announcement';
    case BENEFIT = 'benefit';
    case EVENT = 'event';
}
